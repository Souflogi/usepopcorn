import { useEffect, useState } from "react";
const StoreWatchedMovies = (list, key) => {
  const stringifiedData = JSON.stringify(list);
  localStorage.setItem(key, stringifiedData);
};

const retriveWatchedMovies = (initial, key) => {
  const retrivedString = localStorage.getItem(key);
  // if not ound returns empty array
  return JSON.parse(retrivedString) || initial;
};

export function useLocalStorageState(initialValue, key) {
  const [value, setValue] = useState(() =>
    retriveWatchedMovies(initialValue, key)
  );
  /*********************** */
  useEffect(() => {
    StoreWatchedMovies(value, key); //updated list
  }, [value, key]);

  return { value, setValue };
}
