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

const labels = [".", ".", ".", "."];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "",
      data: [20, 3, 10, 0],
      borderColor: "rgb(236,70,55)",
      backgroundColor: "rgb(253,243,242)",
      tension: 0.4,
    },
  ],
};

export function SubChart() {
  return <Line options={options} data={data} />;
}
