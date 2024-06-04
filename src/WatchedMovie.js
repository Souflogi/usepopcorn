function WatchedMovie({ movie, onClick }) {
  return (
    <li onClick={onClick.bind(null, movie.id)}>
      <img src={movie.poster} alt={`a poster of ${movie.title}`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⌛</span>
          <span>{movie.runtime || "?"} min</span>
        </p>
      </div>
    </li>
  );
}

export default WatchedMovie;
