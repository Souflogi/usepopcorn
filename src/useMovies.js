import { useEffect, useState } from "react";
const API_KEY = "a337b59";

export function useMovies(query, callBack) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState({ state: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Invoke the callback function if provided
    callBack?.();

    const controller = new AbortController();

    const FetchMovies = async () => {
      try {
        setLoading(true); // Set loading state to true at the start of fetching
        setError({ state: false }); // Reset error state before fetching
        const response = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal } // Attach the abort signal to the fetch request
        );
        if (!response?.ok) throw new Error("Error message " + response.status);

        const data = await response.json();
        console.log(data);

        if (data?.Response === "False") throw new Error(data.Error);
        setMovies(data.Search); // Update the movies state with fetched data
        setError({ state: false }); // Reset error state after successful fetching
      } catch (err) {
        if (err.name !== "AbortError")
          // Ignore AbortError since it's expected on component unmount
          setError({ state: true, message: err.message }); // Set error state if fetching fails
      } finally {
        setLoading(false); // Set loading state to false at the end of fetching
      }
    };

    if (query === "") {
      setMovies([]); // Clear movies state if query is empty
      setError(null); // Clear error state if query is empty
      return;
    }

    FetchMovies(); // Fetch movies if query is not empty

    return () => {
      controller.abort(); // Abort the fetch request on component unmount or query change
    };
  }, [query, callBack]); // Effect dependencies: run effect when query or callBack changes

  return { movies, loading, error }; // Return the movies, loading, and error states
}
