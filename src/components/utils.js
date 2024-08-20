// src/utils/calculatePercentage.js
export const calculatePercentage = (number, max) => {
  if (max === 0) return 0; // Avoid division by zero
  return (number / max) * 100;
};

export const progressBarCalculation = ({ subscriptions }) => {
  // Filter the active subscription
  const activeSubscription = subscriptions.find(subscription => subscription.expired === 0);

  if (!activeSubscription) {
    return { number: 0, max: 0,remaining:0 }; // Return 0 if no active subscription found
  }

  const startDate = new Date(activeSubscription.start_date);
  const endDate = new Date(activeSubscription.end_date);
  const today = new Date();

  // Calculate the number of days between start_date and today
  const timeDifference = today.getTime() - startDate.getTime();
  const numberOfDays = Math.floor(timeDifference / (1000 * 3600 * 24));

  // Calculate the maximum number of days between start_date and end_date
  const maxTimeDifference = endDate.getTime() - startDate.getTime();
  const maxDays = Math.floor(maxTimeDifference / (1000 * 3600 * 24));

  const remainingDays=maxDays - numberOfDays;
  console.log('number:',numberOfDays,'max:',maxDays,'remaining:',remainingDays)
  return { number: numberOfDays, max: maxDays,remaining:remainingDays };
};

export const remColor=(days)=>{
  if(days<=30)
    return "#F00"
  if(days<=60)
    return "#FF0"
  return "#61cf37"
}
