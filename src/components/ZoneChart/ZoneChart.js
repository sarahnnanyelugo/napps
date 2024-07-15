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

export function ZoneChart({ labels, dataset }) {
  const data = {
    labels,
    datasets: [
      {
        label: "school",
        data: dataset,
        backgroundColor: "rgb(72,147,64)",
        borderRadius: 10,
        aspectRatio: 1,
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
