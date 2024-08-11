import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import api from "../../utility/api";

const ZoneChart = (props) => {
    const [chartData, setChartData] = useState({});
    const [currentLevel, setCurrentLevel] = useState('zones'); // zones, states, lgas, wards
    const [selectedZone, setSelectedZone] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedLGA, setSelectedLGA] = useState(null);
    const {start_level} = props

    useEffect(() => {
        api.get('/zone-chart-data')
            .then(response => {
                setChartData(formatChartData(response.data, start_level));
            })
            .catch(error => {
                console.error('Error fetching zone chart data:', error);
            });
    }, []);

    const formatChartData = (data, level) => {
        switch (level) {
            case 'zones':
                return formatZonesData(data);
            case 'states':
                return formatStatesData(data);
            case 'lgas':
                return formatLGAData(data);
            case 'wards':
                return formatWardsData(data);
            default:
                return {};
        }
    };

    const formatZonesData = (data) => {
        let labels = data?.map(zone => zone.name);
        let datasets = [{
            label: 'Schools per Zone',
            data: data?.map(zone => zone.schools_count),
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
        }];
        return {labels, datasets};
    };

    const formatStatesData = (zone) => {
        let labels = zone.states?.map(state => state.name);
        let datasets = [{
            label: `Schools in ${zone.name} by State`,
            data: zone.states?.map(state => state.schools_count),
            backgroundColor: 'rgba(153,102,255,0.4)',
            borderColor: 'rgba(153,102,255,1)',
            borderWidth: 1,
        }];
        return {labels, datasets};
    };

    const formatLGAData = (state) => {
        let labels = state.lgas?.map(lga => lga.name);
        let datasets = [{
            label: `Schools in ${state.name} by LGA`,
            data: state.lgas?.map(lga => lga.schools_count),
            backgroundColor: 'rgba(255,159,64,0.4)',
            borderColor: 'rgba(255,159,64,1)',
            borderWidth: 1,
        }];
        return {labels, datasets};
    };

    const formatWardsData = (lga) => {
        let labels = lga.wards?.map(ward => ward.name);
        let datasets = [{
            label: `Schools in ${lga.name} by Ward`,
            data: lga.wards?.map(ward => ward.schools_count),
            backgroundColor: 'rgba(54,162,235,0.4)',
            borderColor: 'rgba(54,162,235,1)',
            borderWidth: 1,
        }];
        return {labels, datasets};
    };

    const handleBarClick = (elements) => {
        if (elements.length === 0) return;
        const index = elements[0].index;
        if (currentLevel === 'zones') {
            setSelectedZone(chartData.zones[index]);
            setCurrentLevel('states');
        } else if (currentLevel === 'states') {
            setSelectedState(selectedZone.states[index]);
            setCurrentLevel('lgas');
        } else if (currentLevel === 'lgas') {
            setSelectedLGA(selectedState.lgas[index]);
            setCurrentLevel('wards');
        }
    };

    useEffect(() => {
        if (currentLevel === 'zones') {
            setChartData(formatChartData(chartData.zones, 'zones'));
        } else if (currentLevel === 'states') {
            setChartData(formatChartData(selectedZone, 'states'));
        } else if (currentLevel === 'lgas') {
            setChartData(formatChartData(selectedState, 'lgas'));
        } else if (currentLevel === 'wards') {
            setChartData(formatChartData(selectedLGA, 'wards'));
        }
    }, [currentLevel, selectedZone, selectedState, selectedLGA]);

    return (
        <div>
            <h2>{currentLevel === 'zones' ? 'Schools by Zone' : currentLevel === 'states' ? `Schools in ${selectedZone.name} by State` : currentLevel === 'lgas' ? `Schools in ${selectedState.name} by LGA` : `Schools in ${selectedLGA.name} by Ward`}</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    onClick: (event, elements) => handleBarClick(elements),
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                }}
            />
        </div>
    );
};

export default ZoneChart;
