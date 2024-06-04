function Movie({ movie, onClick = () => {} }) {
  const imgLink = movie.Poster === "N/A" ? "logo192.png" : movie.Poster;

  return (
    <li key={movie.imdbID} onClick={onClick.bind(null, movie.imdbID)}>
      <img src={imgLink} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
