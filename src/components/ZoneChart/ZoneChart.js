import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import api from "../../utility/api";

const ZoneChart = (props) => {
    const {start_level} = props
    const [chartFullData, setChartFullData] = useState(null);
    const [chartData, setChartData] = useState({});
    const [currentLevel, setCurrentLevel] = useState('zones'); // zones, states, lgas, wards
    const [selectedZone, setSelectedZone] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedLGA, setSelectedLGA] = useState(null);
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        setLoading(true);
        setChartData({})
        api.get('/zone-chart-data')
            .then(response => {
                console.log('API Response:', response.data);
                setChartFullData(response.data);
                console.log('Updated chartFullData:', response.data);
                setTimeout(function () {
                    setLoading(false);
                },500)
            })
            .catch(error => {
                setLoading(false);
                console.error('Error fetching zone chart data:', error);
            });
    }, []);

    useEffect(() => {
        if (loading===true) {
            console.log('Still loading...');
        } else {
            // formatChartData(chartFullData.zones,currentLevel)
            console.log('loaded. chartFullData:', chartFullData);
            setCurrentLevel(start_level || 'zones');
        }
    }, [chartFullData, loading]);

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
            backgroundColor: "rgb(72,147,64)",
            borderRadius: 10,
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
            backgroundColor: 'rgba(153,102,255,0.9)',
            borderRadius: 10,
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
            backgroundColor: 'rgba(255,159,64,0.9)',
            borderRadius: 10,
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
            backgroundColor: 'rgba(54,162,235,0.9)',
            borderRadius: 10,
            borderColor: 'rgba(54,162,235,1)',
            borderWidth: 1,
        }];
        return {labels, datasets};
    };

    const handleBarClick = (elements) => {
        if (elements.length === 0) return;
        const index = elements[0].index;
        if (currentLevel === 'zones') {
            setSelectedZone(chartFullData.zones[index]);
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
        if(!chartFullData)return;
        console.log("checking current level to set chart data")
        if (currentLevel === 'zones') {
            setChartData(formatChartData(chartFullData.zones, 'zones'));
        } else if (currentLevel === 'states') {
            setChartData(formatChartData(selectedZone, 'states'));
        } else if (currentLevel === 'lgas') {
            setChartData(formatChartData(selectedState, 'lgas'));
        } else if (currentLevel === 'wards') {
            setChartData(formatChartData(selectedLGA, 'wards'));
        }
    }, [chartFullData,currentLevel, selectedZone, selectedState, selectedLGA]);

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h2>{currentLevel === 'zones' ? 'Schools by Zone' : currentLevel === 'states' ? `Schools in ${selectedZone.name} by State` : currentLevel === 'lgas' ? `Schools in ${selectedState.name} by LGA` : `Schools in ${selectedLGA.name} by Ward`}</h2>
                {currentLevel!='zones'&&<button className={"btn btn-outline-success btn-rounded btn-sm"} onClick={()=>setCurrentLevel('zones')}>&laquo; &nbsp; Back &nbsp;</button>}
            </div>
            {(loading)?<></> :
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
                // <div>Loading completed</div>
            }
        </div>
    );
};

export default ZoneChart;
