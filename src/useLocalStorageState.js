import { useEffect, useState } from "react";

// Function to store data to localStorage
const storeToLocalStorage = (list, key) => {
  const stringifiedData = JSON.stringify(list);
  localStorage.setItem(key, stringifiedData);
};

// Function to retrieve data from localStorage
const retrieveFromLocalStorage = (initial, key) => {
  const retrievedString = localStorage.getItem(key);
  // If not found, return the initial value (empty array)
  return JSON.parse(retrievedString) || initial;
};

// Custom hook to manage state with localStorage
export function useLocalStorageState(initialValue, key) {
  const [value, setValue] = useState(() =>
    retrieveFromLocalStorage(initialValue, key)
  );

  /*********************** */
  useEffect(() => {
    storeToLocalStorage(value, key); // Update localStorage whenever value changes
  }, [value, key]);

  return { value, setValue };
}
