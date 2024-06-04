import { useEffect, useRef, useState } from "react";
import { useKeyReact } from "./useKeyReact";

const SearchInput = ({ query, setQuery }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef();
  useKeyReact(function Callback(e) {
    if (e.keyCode === 13 && document.activeElement !== inputRef.current) {
      // inputRef.current.value = "";
      setSearchTerm("");
      inputRef.current.focus();
    }
  });

  /*********************** */
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setQuery(searchTerm);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, setQuery]); // Empty dependency array ensures cleanup on unmount

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={searchTerm}
      onChange={handleChange}
      ref={inputRef}
    />
  );
};
export default SearchInput;
