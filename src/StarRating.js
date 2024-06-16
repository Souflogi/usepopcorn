import { useState } from "react";

// CSS-in-JS styles for the star rating components
const rateContainer = {
  display: "flex",
  alignItems: "center",
  gap: ".5rem",
};
const starContainerStyle = {
  display: "flex",
  alignItems: "center",
};
const StarStyle = {
  stroke: "currentColor",
  cursor: "pointer",
  aspectRatio: "1",
};
const numberStyle = {
  marginLeft: "1rem",
  lineHeight: "1",
};

/*********************STARRATING COMPONENT************************* */

function StarRating({
  starsCount = 10,
  size = 30,
  color = "orangered",
  className = "",
  messages = [],
  initialRating = 0,
  onSetExternalState,
}) {
  const [hoverRating, setHoverRating] = useState(initialRating); // State for managing hover effect
  const [selectedRating, setSelectedRating] = useState(initialRating); // State for managing selected rating

  // Function to handle setting the rating
  const handleSetRating = value => {
    setSelectedRating(value);
    // Call external state setter if provided
    onSetExternalState !== undefined && onSetExternalState(value);
  };

  return (
    <div style={{ ...rateContainer, color: color }} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: starsCount }, (_, i) => i + 1).map(number => (
          <Star
            number={number}
            key={number}
            hoverRating={hoverRating}
            setHoverRating={setHoverRating}
            selectedRating={selectedRating}
            handleSetRating={handleSetRating}
            size={size}
          />
        ))}
      </div>
      {/* Display message or rating number on hover */}
      {hoverRating !== 0 && (
        <p style={{ ...numberStyle, fontSize: size - 10 }}>
          {messages.length === starsCount
            ? messages[hoverRating - 1]
            : hoverRating}
        </p>
      )}
    </div>
  );
}

/**************************STAR COMPONENT*************************** */

// Individual star component
function Star({
  number,
  hoverRating,
  setHoverRating,
  selectedRating,
  handleSetRating,
  size,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{
        ...StarStyle,
        fill: number > (hoverRating || selectedRating) ? "" : "currentColor", // Fill star based on hover or selected rating
        height: `${size}px`,
      }}
      // Handle hover effects
      onMouseEnter={() => setHoverRating(number)}
      onMouseLeave={() => setHoverRating(selectedRating || 0)}
      // Set the rating on click
      onClick={() => handleSetRating(number)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

export default StarRating;
