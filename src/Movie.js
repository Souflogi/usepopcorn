import pngplaceHolder from "./pngplaceHolder.jpg";

function Movie({ movie, onClick = () => {}, selectedId }) {
  const imgLink = movie.Poster === "N/A" ? pngplaceHolder : movie.Poster;

  return (
    <li
      key={movie.imdbID}
      onClick={onClick.bind(null, movie.imdbID)}
      className={`${movie.imdbID === selectedId ? "selected" : ""}`}
    >
      <img src={imgLink} alt={`${movie.Title} poster`} />

      <div className="movie-details">
        <h3>{movie.Title}</h3>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
