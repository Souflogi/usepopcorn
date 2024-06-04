function Button({ action, state }) {
  return (
    <button className="btn-toggle" onClick={action}>
      {state ? "-" : "+"}
    </button>
  );
}

export default Button;
