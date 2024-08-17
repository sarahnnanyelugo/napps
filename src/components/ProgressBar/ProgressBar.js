// src/components/ProgressBar.js
import React, { useEffect, useState } from "react";
import { calculatePercentage } from "../utils";
import "./progress-bar.scss"; // Create this CSS file for styling

const ProgressBar = ({ number, max, color }) => {
  const [width, setWidth] = useState(0);
  const percentage = calculatePercentage(number, max);

  useEffect(() => {
    setWidth(percentage);
  }, [percentage]);

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${width}%`, backgroundColor: color }}
      >
        {/* {width.toFixed(2)}% */}
      </div>
    </div>
  );
};

export default ProgressBar;
