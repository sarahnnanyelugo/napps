// src/utils/calculatePercentage.js
export const calculatePercentage = (number, max) => {
  if (max === 0) return 0; // Avoid division by zero
  return (number / max) * 100;
};
