// Accept only letters and whitespaces
export const isKeyboardCodeAllowed = (code) => {
  return code.startsWith("Key") || code.startsWith("Digit") || code === "Backspace" || code === "Space";
};

export const countWronglyTypedCharacters = (typedText, expectedText) => {
  const expectedCharacters = expectedText.split("");

  return expectedCharacters.reduce((errorCount, expectedChar, index) => {
    const actualChar = typedText[index];
    if (actualChar !== expectedChar) {
      errorCount++;
    }
    return errorCount;
  }, 0);
};

export const countCorrectlyTypedWords = (typedText, generatedText) => {
  let correctlyTypedWordCount = 0;
  let isSame = true;

  for (let i = 0; i < typedText.length; i++) {
    if (generatedText[i] === " ") {
      if (isSame) {
        correctlyTypedWordCount++;
      } else {
        isSame = true;
      }
    } else if (generatedText[i] !== typedText[i]) {
      isSame = false;
    }
  }
  if (isSame && (typedText.length === generatedText.length || generatedText[typedText.length] === " ")) {
    correctlyTypedWordCount++;
  }

  return correctlyTypedWordCount;
};

export const calculateAccuracyPercentage = (wronglyTypedCharacterCount, totalTypedCharacterCount) => {
  if (totalTypedCharacterCount > 0) {
    const correctlyTypedCharacterCount = totalTypedCharacterCount - wronglyTypedCharacterCount;
    return (correctlyTypedCharacterCount / totalTypedCharacterCount) * 100;
  }

  return 0;
};

export const calculateWPM = (correctlyTypedWordCount, timeInSeconds) => {
  return correctlyTypedWordCount / (timeInSeconds / 60);
};

export const formatPercentage = (percentage) => {
  return percentage.toFixed(1) + "%";
};

export const formatWPM = (wpm) => {
  return wpm.toFixed(0);
};
