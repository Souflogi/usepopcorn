import { useEffect, useRef, useState } from "react";
import { useKeyReact } from "./useKeyReact";

const SearchInput = ({ setQuery }) => {
  const [searchTerm, setSearchTerm] = useState("batman");
  const inputRef = useRef();

  // Custom hook to handle key press events
  useKeyReact(function Callback(e) {
    if (e.keyCode === 13 && document.activeElement !== inputRef.current) {
      // If Enter key is pressed and input is not focused
      setSearchTerm(""); // Clear search term
      inputRef.current.focus(); // Focus the input field
    }
  });

  /*********************** */
  function handleChange(event) {
    setSearchTerm(event.target.value); // Update search term with input value
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setQuery(searchTerm); // Update query with search term after 1 second delay
    }, 1000);
    return () => clearTimeout(timeoutId); // Clear timeout on cleanup or searchTerm change
  }, [searchTerm, setQuery]);

  useEffect(() => {
    inputRef.current.focus(); // Focus the input field when component mounts
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={searchTerm}
      onChange={handleChange}
      ref={inputRef} // Reference to input element
    />
  );
};

export default SearchInput;
