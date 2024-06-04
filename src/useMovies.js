import { useEffect, useState } from "react";
const API_KEY = "a337b59";

export function useMovies(query, callBack) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState({ state: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    callBack?.();

    const controller = new AbortController();

    const FetchMovies = async () => {
      try {
        setLoading(true);
        setError({ state: false });
        const response = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!response?.ok) throw new Error("Error message " + response.status);

        const data = await response.json();

        if (data?.Response === "False") throw new Error(data.Error);
        setMovies(data.Search);
        setError({ state: false });
      } catch (err) {
        if (err.name !== "AbortError")
          setError({ state: true, message: err.message });
      } finally {
        setLoading(false);
      }
    };
    if (query === "") {
      setMovies([]);
      setError(null);

      return;
    }
    FetchMovies();

    return () => {
      controller.abort();
    };
  }, [query, callBack]);

  return { movies, loading, error };
}
