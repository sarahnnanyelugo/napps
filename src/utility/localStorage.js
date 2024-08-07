export const setLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error setting localStorage", error);
  }
};
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing localStorage item", error);
  }
};

export const getLocalStorage = (key, filterFn) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return undefined;
    }
    const data = JSON.parse(serializedValue);

    if (filterFn && typeof filterFn === "function") {
      return data.filter(filterFn);
    }

    return data;
  } catch (error) {
    console.error("Error getting localStorage", error);
    return undefined;
  }
};
