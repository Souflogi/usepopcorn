import { useState } from "react";
import Button from "./Button";

const MovieBox = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <Button state={isOpen} action={() => setIsOpen(!isOpen)} />
      {isOpen && children}
    </div>
  );
};

export default MovieBox;
