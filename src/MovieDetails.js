import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import LoadingIndicator from "./LoadingIndicator";
import { useKeyReact } from "./useKeyReact";
const API_KEY = "a337b59";

function MovieDetails({
  selectedId,
  closeMovieDetails,
  onAdd,
  onDelete,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const watchedMovie = watched.find(movie => movie.id === selectedId);
  const ratingRef = useRef(0);
  useKeyReact(function (event) {
    if (event.code === "Escape") {
      closeMovieDetails();
    }
  });

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Country: country,
  } = movie;
  /********************************************** */
  const handleOnAdd = () => {
    const watchedMovie = {
      id: selectedId,
      runtime: parseInt(runtime) || 0,
      userRating,
      imdbRating,
      title,
      poster,
      countRatingDecisions: ratingRef.current,
    };

    onAdd(watchedMovie);
  };
  /********************************************** */
  useEffect(() => {
    if (userRating === 0) return;
    ratingRef.current++;
    console.log(ratingRef.current);
  }, [userRating]);
  /********************************************** */

  useEffect(() => {
    async function findTheMovie() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    findTheMovie();
  }, [selectedId]);
  /********************************************** */
  useEffect(() => {
    document.title = `Movie | ${title || ""}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title, selectedId]);

  /********************************************** */

  if (isLoading) return <LoadingIndicator />;
  else
    return (
      <div className="details">
        <header>
          <button className="btn-back" onClick={closeMovieDetails}>
            ←
          </button>
          <img
            src={poster === "N/A" ? "logo512.png" : poster}
            alt={`poster of ${title} movie `}
          />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>
              {released} &bull; {runtime}
            </p>
            <p>{genre}</p>
            <p>
              <span>🌟</span> {imdbRating === "N/A" ? "No" : imdbRating} IMDb
              rating
            </p>
            <p>Country : {country}</p>
          </div>
        </header>

        <section>
          <div className="rating">
            {!watchedMovie ? (
              <>
                <StarRating
                  key={selectedId}
                  color="gold"
                  starsNum={10}
                  size={25}
                  onSetExternalState={setUserRating}
                />
                {userRating > 0 && (
                  <button onClick={handleOnAdd} className="btn-add">
                    Add to watch list
                  </button>
                )}
              </>
            ) : (
              <>
                <p style={{ color: "gold", textAlign: "center" }}>
                  You Rated this move a {watchedMovie?.userRating} ⭐
                </p>
                <button
                  onClick={onDelete.bind(null, selectedId)}
                  className="btn-delete"
                >
                  remove from list
                </button>
              </>
            )}
          </div>
          <p>
            <em>{plot}</em>
          </p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>
      </div>
    );
}

export default MovieDetails;
