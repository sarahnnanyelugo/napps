import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  //   Title,
  Tooltip
  //   Legend
);

export const options = {
  scales: {
    y: { ticks: { display: false } },
    x: { stepSize: 1, grid: { display: false } },
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

const labels = [
  "North Central (NC)",
  "North East (NE)",
  "North West (NW)",
  "South West (SW)",
  "South East (SE)",
  "South South (SS)",
  ,
];

export const data = {
  labels,
  datasets: [
    {
      label: "school",
      data: [50, 35, 60, 70, 20, 40],
      backgroundColor: "rgb(72,147,64)",
      borderRadius: 10,
      aspectRatio: 1,
    },
  ],
};

export function ZoneChart() {
  return <Bar options={options} data={data} />;
}
