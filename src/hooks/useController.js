import { useCallback, useEffect, useState } from "react";
import { countCorrectlyTypedWords, countWronglyTypedCharacters } from "../utils/helpers";
import useCountdown from "./useCountdown";
import useText from "./useText";
import useTypings from "./useTypings";

const TEXT_LENGTH = 120;

const useController = (countdownTime) => {
  const [appState, setAppState] = useState("start");
  const [wronglyTypedCharacterCount, setWronglyTypedCharacterCount] = useState(0);
  const [correctlyTypedWordCount, setCorrectlyTypedWordCount] = useState(0);
  const { timeLeft, startCountdown, resetCountdown } = useCountdown(countdownTime);
  const { generatedText, updateGeneratedText } = useText(TEXT_LENGTH);
  const { cursorIndex, typedText, totalTypedCharacterCount, clearTypedText, resetTotalTypedCharacterCount } =
    useTypings(appState !== "finish");

  const isStarting = appState === "start" && cursorIndex > 0;
  const areWordsFinished = cursorIndex === generatedText.length;

  const reset = useCallback(
    (newCountdownTime = countdownTime) => {
      resetCountdown(newCountdownTime);
      updateGeneratedText();
      clearTypedText();
      resetTotalTypedCharacterCount();
      setAppState("start");
      setWronglyTypedCharacterCount(0);
      setCorrectlyTypedWordCount(0);
    },
    [resetCountdown, clearTypedText, updateGeneratedText, resetTotalTypedCharacterCount, countdownTime]
  );

  const sumWronglyTypedCharacters = useCallback(() => {
    const wordsReached = generatedText.substring(0, Math.min(cursorIndex, generatedText.length));
    setWronglyTypedCharacterCount((prevValue) => prevValue + countWronglyTypedCharacters(typedText, wordsReached));
  }, [typedText, generatedText, cursorIndex]);

  const sumCorrectlyTypedWords = useCallback(() => {
    setCorrectlyTypedWordCount((prevValue) => prevValue + countCorrectlyTypedWords(typedText, generatedText));
  }, [typedText, generatedText]);

  useEffect(() => {
    if (isStarting) {
      setAppState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  useEffect(() => {
    if (!timeLeft && appState === "run") {
      setAppState("finish");
      sumWronglyTypedCharacters();
      sumCorrectlyTypedWords();
    }
  }, [timeLeft, appState, sumWronglyTypedCharacters, sumCorrectlyTypedWords]);

  useEffect(() => {
    if (areWordsFinished) {
      sumWronglyTypedCharacters();
      sumCorrectlyTypedWords();
      updateGeneratedText();
      clearTypedText();
    }
  }, [areWordsFinished, sumWronglyTypedCharacters, sumCorrectlyTypedWords, updateGeneratedText, clearTypedText]);

  return {
    appState,
    generatedText,
    typedText,
    timeLeft,
    wronglyTypedCharacterCount,
    totalTypedCharacterCount,
    correctlyTypedWordCount,
    reset,
  };
};

export default useController;
