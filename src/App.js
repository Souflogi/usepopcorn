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
    [],
    "watchedMovies"
  );
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const stableOnCloseDetails = useCallback(onCloseDetails, []);
  const { movies, loading, error } = useMovies(query, stableOnCloseDetails);

  /************************************** */

  function onSelectMovie(id) {
    setSelectedId(selectedId => (id === selectedId ? null : id));
  }
  /************************************** */

  function onAddWatched(movie) {
    setWatched(watched =>
      watched.some(m => m.id === selectedId) ? watched : [movie, ...watched]
    );
    onCloseDetails();
  }
  /************************************** */

  function onCloseDetails() {
    setSelectedId(null);
  }
  /************************************** */
  function onDeleteWatched(id) {
    setWatched(w => w.filter(m => m.id !== id));

    onCloseDetails();
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
