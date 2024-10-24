import { motion } from "framer-motion";
import { formatPercentage, formatWPM } from "../utils/helpers";

const Result = ({
  appState,
  wronglyTypedCharacterCount,
  accuracyPercentage,
  totalTypedCharacterCount,
  correctlyTypedWordCount,
  className = "",
}) => {
  if (appState !== "finish") {
    return null;
  }

  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  return (
    <motion.ul initial={initial} animate={animate} className={`flex items-center justify-center gap-6 ${className}`}>
      <motion.li initial={initial} animate={animate} transition={{ duration: 0.3 }}>
        WPM: {formatWPM(correctlyTypedWordCount)}
      </motion.li>
      |
      <motion.li initial={initial} animate={animate} transition={{ duration: 0.3 }}>
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      |
      <motion.li initial={initial} animate={animate} transition={{ duration: 0.3 }}>
        Typed Characters: {totalTypedCharacterCount}
      </motion.li>
      |
      <motion.li initial={initial} animate={animate} transition={{ duration: 0.3 }}>
        Correct: {totalTypedCharacterCount - wronglyTypedCharacterCount}
      </motion.li>
      |
      <motion.li initial={initial} animate={animate} transition={{ duration: 0.3 }}>
        Errors: {wronglyTypedCharacterCount}
      </motion.li>
    </motion.ul>
  );
};

export default Result;
