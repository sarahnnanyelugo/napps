import React from "react";
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
import { Line } from "react-chartjs-2";
import faker from "faker";

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
    x: { stepSize: 1, display: false },
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

export function DataChart() {
  return <Line options={options} data={data} />;
}
