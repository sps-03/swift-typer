import { useCallback, useEffect, useRef, useState } from "react";
import { isKeyboardCodeAllowed } from "../utils/helpers";

const useTypings = (enabled) => {
  const [cursorIndex, setCursorIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const totalTypedCharacterCount = useRef(0);

  const keydownHandler = useCallback(
    ({ key, code }) => {
      if (!enabled || !isKeyboardCodeAllowed(code)) {
        return;
      }

      switch (key) {
        case "Backspace":
          setTypedText((prev) => prev.slice(0, -1));
          setCursorIndex((cursorIndex) => Math.max(0, cursorIndex - 1));
          totalTypedCharacterCount.current = Math.max(0, totalTypedCharacterCount.current - 1);
          break;
        default:
          setTypedText((prev) => prev.concat(key));
          setCursorIndex((cursorIndex) => cursorIndex + 1);
          totalTypedCharacterCount.current += 1;
      }
    },
    [enabled]
  );

  const clearTypedText = useCallback(() => {
    setTypedText("");
    setCursorIndex(0);
  }, []);

  const resetTotalTypedCharacterCount = useCallback(() => {
    totalTypedCharacterCount.current = 0;
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return {
    cursorIndex,
    typedText,
    totalTypedCharacterCount: totalTypedCharacterCount.current,
    clearTypedText,
    resetTotalTypedCharacterCount,
  };
};

export default useTypings;
