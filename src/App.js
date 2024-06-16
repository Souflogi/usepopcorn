import { useCallback, useEffect, useState } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import MovieBox from "./MovieBox";
import MovieList from "./MovieList";
import Movie from "./Movie";
import MovieSummary from "./MovieSummary";
import SearchInput from "./SearchInput";
import Logo from "./Logo";
import ResultCounter from "./ResultCounter";
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import WatchedMovie from "./WatchedMovie";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  const { value: watched, setValue: setWatched } = useLocalStorageState(
    [], // Initial state: an empty array
    "watchedMovies" // Key for localStorage
  );
  const [query, setQuery] = useState(""); // State for search query
  const [selectedId, setSelectedId] = useState(null); // State for selected movie ID

  // Memoize the onCloseDetails function to avoid unnecessary re-renders
  const stableOnCloseDetails = useCallback(onCloseDetails, []);

  // Custom hook to fetch movies based on the query and close details callback
  const { movies, loading, error } = useMovies(query, stableOnCloseDetails);

  /************************************** */

  // Toggles the selected movie ID
  function onSelectMovie(id) {
    setSelectedId(selectedId => (id === selectedId ? null : id));
  }

  /************************************** */

  // Adds a movie to the watched list if it's not already there
  function onAddWatched(movie) {
    setWatched(watched =>
      watched.some(m => m.id === selectedId) ? watched : [movie, ...watched]
    );
    onCloseDetails(); // Close the movie details view after adding
  }

  /************************************** */

  // Closes the movie details view
  function onCloseDetails() {
    setSelectedId(null);
  }

  /************************************** */

  // Deletes a movie from the watched list
  function onDeleteWatched(id) {
    setWatched(w => w.filter(m => m.id !== id));
    onCloseDetails(); // Close the movie details view after deleting
  }

  /************************************** */

  return (
    <>
      <NavBar>
        <Logo />
        <SearchInput query={query} setQuery={setQuery} />
        <ResultCounter count={movies?.length} />
      </NavBar>
      <Main>
        <MovieBox>
          {loading && <LoadingIndicator />}
          {error?.state && <ErrorMessage error={error} />}
          {!loading && !error?.state && (
            <MovieList>
              {movies.map(movie => (
                <Movie
                  key={movie.imdbID}
                  movie={movie}
                  onClick={onSelectMovie}
                />
              ))}
            </MovieList>
          )}
        </MovieBox>
        <MovieBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              closeMovieDetails={onCloseDetails}
              onAdd={onAddWatched}
              onDelete={onDeleteWatched}
              watched={watched}
            />
          ) : (
            <>
              <MovieSummary watched={watched} />
              <MovieList>
                {watched.map(movie => (
                  <WatchedMovie
                    key={movie.id}
                    movie={movie}
                    onClick={onSelectMovie}
                  />
                ))}
              </MovieList>
            </>
          )}
        </MovieBox>
      </Main>
    </>
  );
}
