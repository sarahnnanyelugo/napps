const formatNumber = (number, decimalPlaces = 2) => {
    if (isNaN(number)) return 'Invalid number';
  
    return number
      .toFixed(decimalPlaces) // Set the decimal places
      .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas as thousand separators
  };
  
  export default formatNumber;