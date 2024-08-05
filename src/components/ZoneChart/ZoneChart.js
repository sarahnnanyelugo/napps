import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

export const options = (drillPage) => ({
  scales: {
    y: { ticks: { display: false } },
    x: { stepSize: 1, grid: { display: false } },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "",
    },
  },
  onClick: (event, elements) => {
    if (elements.length > 0) {
      const elementIndex = elements[0].index;
      const datasetIndex = elements[0].datasetIndex;
      console.log(`ClickedIndex: ${elementIndex}`);
      // Call the drillPage function here
      drillPage&&drillPage(elementIndex);
    }
  }
});

export function ZoneChart({ labels, dataset, drillPage }) {
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

  return <Bar options={options(drillPage)} data={data} className="col-12" />;
}
