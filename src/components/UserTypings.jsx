import { motion } from "framer-motion";

const Character = ({ actual, expected }) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

  return (
    <span
      className={`${actual !== "" && !isCorrect && !isWhiteSpace ? "text-error/60" : ""}
                  ${actual !== "" && isCorrect && !isWhiteSpace ? "text-secondary" : ""}
                  ${actual !== "" && !isCorrect && isWhiteSpace ? "bg-error/50" : ""}
                  ${actual === "" ? "text-tertiary" : ""}`}
    >
      {expected}
    </span>
  );
};

const UserTypings = ({ typedText, generatedText, className = "" }) => {
  const typedCharacters = typedText.split("");
  const typedTextLength = typedText.length;
  const remainingCharacters = generatedText.substring(typedTextLength).split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => (
        <Character key={index} actual={char} expected={generatedText[index]} />
      ))}

      <span className="relative">
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 bg-secondary/30"
        />

        <span className="relative z-10 text-tertiary">{generatedText[typedTextLength]}</span>
      </span>

      {remainingCharacters.slice(1).map((char, index) => (
        <Character key={typedTextLength + index} actual={""} expected={char} />
      ))}
    </div>
  );
};

export default UserTypings;
