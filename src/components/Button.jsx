import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

const Button = ({ onClick, label, isTimeButton = false, className = "" }) => {
  const buttonRef = useRef(null);

  const handleClick = () => {
    buttonRef.current?.blur(); // To remove focus from the button
    onClick();
  };

  return (
    <button
      tabIndex={-1} // To make the button not focusable via the Tab key
      ref={buttonRef}
      className={`rounded px-4 py-2 hover:bg-tertiary/10  ${className}`}
      onClick={handleClick}
    >
      {isTimeButton ? `${label}s` : <MdRefresh className="h-6 w-6" />}
    </button>
  );
};

export default Button;
