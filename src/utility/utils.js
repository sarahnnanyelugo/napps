import {rndColor} from "../Data/recentActivities";
import moment from 'moment';
export const formatAudiTrail = (item) => {
    const modelTypeParts = item.model_type.split('\\');
    const modelType = modelTypeParts[modelTypeParts.length - 1];
    const alphabet = modelType.charAt(0);

    const time = moment(item.created_at).fromNow();

    const name = `${modelType} ${item.event}`;
    const schoolDetail = `${item.description}`;
    const bg = rndColor();

    return {
        alphabet: alphabet,
        time: time,
        schoolName: name,
        schoolDetail: schoolDetail,
        bg: bg,
        id: item.id,
    };
};

export const getPercentage=(num,den,perc)=>{
    return parseInt((num/((den>0?den:1)))*perc);
}

const formatNumber = (number, decimalPlaces = 2) => {
    if (isNaN(number)) return 'Invalid number';
  
    return number
      .toFixed(decimalPlaces) // Set the decimal places
      .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas as thousand separators
  };
  
  export default formatNumber;