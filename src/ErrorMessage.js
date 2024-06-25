function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message ? message : "--Error Message--"}
    </p>
  );
}

export default ErrorMessage;
