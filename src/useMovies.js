import { useEffect, useState } from "react";
const API_KEY = "a337b59";

export function useMovies(query, callBack) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState({ state: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Invoke the callback function if provided
    //in this case it's a function to close movie details UI
    callBack?.();

    const controller = new AbortController();

    const FetchMovies = async () => {
      try {
        setLoading(true); // Set loading state to true at the start of fetching
        setError({ state: false }); // Reset error state before fetching
        const response = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal } // Attach the abort signal to the fetch request
        );
        if (!response?.ok) throw new Error("end point response error");

        const data = await response.json();

        if (data?.Response === "False") throw new Error("Movie not Found");
        //⛔
        setMovies(data.Search); // Update the movies state with fetched data
        // setError({ state: false }); // Reset error state after successful fetching
      } catch (err) {
        console.log(err);
        if (err.name !== "AbortError") {
          // Ignore AbortError since it's expected on component unmount
          if (err instanceof TypeError) {
            // Check if the error is a network error
            console.log("Network error:", err);
            setError({
              state: true,
              message: "Network error. Please check your internet connection.",
            });
          } else setError({ state: true, message: err.message }); // Set error state if fetching fails
        }
      } finally {
        setLoading(false); // Set loading state to false at the end of fetching
      }
    };

    // Query empty ------------------
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
