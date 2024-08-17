import React, {useEffect, useState} from "react";
import "./chart.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    //   Title,
    //   Tooltip,
    Filler
    //   Legend
);

export const options = {
    scales: {
        y: {
            min: 0,
            max: 20,
            stepSize: 5,
            display: false,
        },
        x: {stepSize: 1, display: false},
    },
    responsive: true,
    plugins: {
        legend: {
            position: "",
        },
        title: {
            display: false,
            text: "",
        },
    },
};

const labels = [".", ".", ".", ""];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: "",
            data: [0, 10, 3, 20],
            borderColor: "#489340",
            backgroundColor: "#ECFCF3",
            tension: 0.4,
        },
    ],
};

export function DataChart(props) {
    const {dataSet, labelSet, borderColor, backGroundColor} = props;
    const [dt, setDt] = useState(data);

    useEffect(() => {
        let dat = { ...dt }; // Create a copy of the current state

        if (dataSet && labelSet) {
            dat.labels = labelSet;
            dat.datasets[0].data = dataSet;
        }

        if (backGroundColor) dat.datasets[0].backgroundColor = backGroundColor;
        if (borderColor) dat.datasets[0].borderColor = borderColor;

        setDt(dat); // Update the state with the new object
    }, []); // Add dependencies


    return <Line options={options} data={dt}/>;
}
