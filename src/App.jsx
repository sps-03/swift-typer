import { useState } from "react";
import { FaGithubSquare } from "react-icons/fa";
import Button from "./components/Button";
import Result from "./components/Result";
import ThemeSwitcher from "./components/ThemeSwitcher";
import UserTypings from "./components/UserTypings";
import useController from "./hooks/useController";
import { calculateAccuracyPercentage, calculateWPM } from "./utils/helpers";

const COUNTDOWN_SECONDS = 30;

const App = () => {
  const [countdownTime, setCountdownTime] = useState(COUNTDOWN_SECONDS);

  const {
    appState,
    generatedText,
    typedText,
    timeLeft,
    wronglyTypedCharacterCount,
    totalTypedCharacterCount,
    correctlyTypedWordCount,
    reset,
  } = useController(countdownTime);

  const handleTimeChange = (newTime) => {
    setCountdownTime(newTime);
    reset(newTime);
  };

  return (
    <div className="mx-5 flex min-h-screen max-w-5xl flex-col justify-between p-4">
      <div className="mt-4 text-center">
        <h1 className="text-5xl font-bold">SWIFT TYPER</h1>
        <p className="mt-2 text-xl text-tertiary">Accelerate your typing skills</p>
      </div>
      <div>
        <p className="font-medium">Time: {timeLeft}</p>
        <div className="relative text-3xl leading-relaxed">
          <UserTypings typedText={typedText} generatedText={generatedText} />
        </div>
        <div className="mt-8 flex justify-center gap-2">
          <Button className={"text-tertiary"} onClick={() => reset(countdownTime)} label="Reset" />
          <Button className={"text-tertiary"} onClick={() => handleTimeChange(30)} label={30} isTimeButton={true} />
          <Button className={"text-tertiary"} onClick={() => handleTimeChange(60)} label={60} isTimeButton={true} />
          <Button className={"text-tertiary"} onClick={() => handleTimeChange(90)} label={90} isTimeButton={true} />
        </div>
        <Result
          className="mt-8"
          appState={appState}
          wronglyTypedCharacterCount={wronglyTypedCharacterCount}
          accuracyPercentage={calculateAccuracyPercentage(wronglyTypedCharacterCount, totalTypedCharacterCount)}
          totalTypedCharacterCount={totalTypedCharacterCount}
          correctlyTypedWordCount={calculateWPM(correctlyTypedWordCount, countdownTime)}
        />
      </div>
      <div className="flex">
        <ThemeSwitcher />
        <a
          title="Check Out the Source Code"
          href="https://github.com/sps-03/swift-typer"
          target="_blank"
          className="ml-auto"
        >
          <FaGithubSquare className="h-11 w-11 text-tertiary/70 hover:text-tertiary" />
        </a>
      </div>
    </div>
  );
};

export default App;
