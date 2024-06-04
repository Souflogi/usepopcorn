import { useEffect } from "react";

export function useKeyReact(action) {
  useEffect(() => {
    document.addEventListener("keydown", action);

    return () => {
      document.removeEventListener("keydown", action);
    };
  }, [action]);
}
