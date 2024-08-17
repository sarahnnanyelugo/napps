import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Country", "Latitude"],

  ["Nigeria", 8],
];

export const options = {
  region: "002",
  colorAxis: {
    colors: ["#225A60", "#7F58D9", "67CB35", "#EF7A80", "#DC64D6", "#0470C7"],
  },
  backgroundColor: "#fff",
  datalessRegionColor: "",
  defaultColor: "#f5f5f5",
};

export function GeoChart() {
  return (
    <Chart
      chartType="GeoChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

// import React from "react";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { scaleQuantize } from "d3-scale";
// import { regions } from "../../Data/nigeriaGeo";
// import "./geo-chart.scss";
// const colorScale = scaleQuantize()
//   .domain([0, 100]) // Ensure the domain covers the possible range of values
//   .range([
//     "#ffedea",
//     "#ffcec5",
//     "#ffad9f",
//     "#ff8a75",
//     "#ff5533",
//     "#e2492d",
//     "#be3d26",
//     "#9a311f",
//     "#782618",
//   ]);

// const GeoChart = ({ data = [] }) => {
//   return (
//     <ComposableMap projection="geoMercator" width={800} height={600}>
//       <Geographies geography={regions}>
//         {({ geographies }) =>
//           geographies.map((geo) => {
//             const { properties } = geo;
//             const regionName = properties ? properties.name : "Unknown";
//             const regionData = data.find((s) => s.region === regionName) || {
//               value: 0,
//             };
//             return (
//               <Geography
//                 key={geo.rsmKey}
//                 geography={geo}
//                 fill={colorScale(regionData.value)}
//                 onMouseEnter={() => {
//                   console.log(`${regionName} - ${regionData.value}`);
//                 }}
//                 style={{
//                   default: { outline: "none" },
//                   hover: { fill: "#F53", outline: "none" },
//                   pressed: { outline: "none" },
//                 }}
//               />
//             );
//           })
//         }
//       </Geographies>
//     </ComposableMap>
//   );
// };
export default GeoChart;
