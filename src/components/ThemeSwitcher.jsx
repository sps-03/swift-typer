import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const themes = ["dark", "light", "terminal"];

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") || "dark");
  const [isOpen, setIsOpen] = useState(false);
  const themeSwitcherRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.remove(...themes);
    document.documentElement.classList.add(currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    document.body.classList.add("transition-colors", "duration-300", "ease-in");

    const handleClickOutside = (event) => {
      if (themeSwitcherRef.current && !themeSwitcherRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={themeSwitcherRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center rounded border border-tertiary p-2 text-tertiary shadow-sm focus:outline-none"
      >
        Theme
        <motion.div className="ml-2" animate={{ rotate: isOpen ? -90 : 0 }} transition={{ duration: 0.3 }}>
          <FaChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      {isOpen && (
        <ul className="absolute bottom-0 left-full ml-2 flex flex-col space-y-2 rounded border border-tertiary bg-primary p-2 text-tertiary shadow-sm">
          {themes.map((theme) => (
            <li
              key={theme}
              onClick={() => {
                setCurrentTheme(theme);
                setIsOpen(false);
              }}
              className={`cursor-pointer rounded p-2 hover:bg-tertiary/20 ${
                currentTheme === theme ? "text-secondary" : ""
              }`}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeSwitcher;
