// src/components/nigeria-regions.js
export const regions = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "South-East" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [7.5, 4.5],
            [8.5, 4.5],
            [8.5, 5.5],
            [7.5, 5.5],
            [7.5, 4.5],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "South-South" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [6.0, 4.0],
            [7.0, 4.0],
            [7.0, 5.0],
            [6.0, 5.0],
            [6.0, 4.0],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "South-West" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [3.0, 5.0],
            [4.0, 5.0],
            [4.0, 6.0],
            [3.0, 6.0],
            [3.0, 5.0],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "North-Central" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [7.0, 8.0],
            [8.0, 8.0],
            [8.0, 9.0],
            [7.0, 9.0],
            [7.0, 8.0],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "North-East" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [10.0, 10.0],
            [11.0, 10.0],
            [11.0, 11.0],
            [10.0, 11.0],
            [10.0, 10.0],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "North-West" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [5.0, 10.0],
            [6.0, 10.0],
            [6.0, 11.0],
            [5.0, 11.0],
            [5.0, 10.0],
          ],
        ],
      },
    },
  ],
};
