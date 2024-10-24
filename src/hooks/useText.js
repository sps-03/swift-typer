import { faker } from "@faker-js/faker";
import { useCallback, useState } from "react";

const generateText = (targetLength) => {
  let result = "";

  while (result.length < targetLength) {
    const word = faker.word.words();
    result += word + " ";
  }

  return result.trim().toLowerCase().replace(/-/g, "");
};

const useText = (count) => {
  const [generatedText, setGeneratedText] = useState(generateText(count));

  const updateGeneratedText = useCallback(() => {
    setGeneratedText(generateText(count));
  }, [count]);

  return { generatedText, updateGeneratedText };
};

export default useText;
