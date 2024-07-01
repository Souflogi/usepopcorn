import { useEffect, useRef, useState } from "react";
import placeholderImage from "./pngplaceHolder.jpg";
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
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  // Ref to keep track of the number of rating clicks on ratings before final decision.
  const ratingClickCountRef = useRef(0);

  // Close movie details when the Escape key is pressed
  useKeyReact(event => {
    if (event.code === "Escape") {
      closeMovieDetails();
    }
  });

  // Check if the selected movie is in the watched list
  const watchedMovie = watched.find(movie => movie.id === selectedId);
  // Destructure movie details for easier access
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Country: country,
  } = movieDetails;

  // Handler for adding a movie to the watched list
  const handleAddToWatched = () => {
    const newWatchedMovie = {
      id: selectedId,
      runtime: parseInt(runtime) || 0, // Convert runtime to integer, default to 0 if NaN
      userRating,
      imdbRating,
      title,
      poster,
      countRatingDecisions: ratingClickCountRef.current, // Track how many times the user changed ratings before final one
    };

    console.log(newWatchedMovie);
    onAdd(newWatchedMovie);
  };

  // Increment the ratingClickCountRef.current whenever the userRating changes
  // Ignore the initial one (0)
  useEffect(() => {
    if (userRating === 0) return;
    ratingClickCountRef.current++;
    console.log(ratingClickCountRef.current);
  }, [userRating]);

  // Fetch movie details when selectedId changes
  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );

        const data = await response.json();
        setMovieDetails(data); // Set movieDetails state with fetched data
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    }

    fetchMovieDetails();
  }, [selectedId]);

  // Update document title with movie title when title or selectedId changes
  useEffect(() => {
    document.title = `Movie | ${title || ""}`;
    return () => {
      document.title = "usePopcorn"; // Reset title on component unmount
    };
  }, [title, selectedId]);

  if (isLoading) return <LoadingIndicator />;
  else
    return (
      <div className="details">
        <header>
          <button className="btn-back" onClick={closeMovieDetails}>
            ←
          </button>
          <img
            src={poster === "N/A" ? placeholderImage : poster} // Fallback to default image if poster is unavailable
            alt={`Poster of ${title} movie `}
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
            <p>Country: {country}</p>
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
                  <button onClick={handleAddToWatched} className="btn-add">
                    Add to watch list
                  </button>
                )}
              </>
            ) : (
              <>
                <p style={{ color: "gold", textAlign: "center" }}>
                  You Rated this movie {watchedMovie?.userRating} ⭐
                </p>
                <button
                  onClick={onDelete.bind(null, selectedId)}
                  className="btn-delete"
                >
                  Remove from list
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
