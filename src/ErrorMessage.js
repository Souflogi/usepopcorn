function ErrorMessage({ error }) {
  return (
    <p className="error">
      <span>⛔</span>
      {error?.message}
    </p>
  );
}

export default ErrorMessage;
