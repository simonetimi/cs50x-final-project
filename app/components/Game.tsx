'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';

import { GameQuestions, GameSettings, PlayerState } from '@/app/page';

const Game = ({
  setPlayerState,
  gameSettings,
  setGameSettings,
  gameQuestions,
}: {
  setPlayerState: Dispatch<SetStateAction<PlayerState>>;
  gameSettings: GameSettings;
  setGameSettings: Dispatch<SetStateAction<GameSettings>>;
  gameQuestions: GameQuestions[] | null;
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasClicked, setHasClicked] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (isGameOver) {
      // Update player's best score if the game is over and the current score is higher than the best score
      setPlayerState((prevState) => ({
        ...prevState,
        score: Math.max(prevState.score, gameSettings.currentScore),
      }));
    }
  }, [isGameOver, gameSettings.currentScore, setPlayerState]);

  if (!gameQuestions) return null;

  const correctAnswer =
    gameQuestions[gameSettings.currentQuestion - 1].correctAnswer;

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === correctAnswer;
    setHasClicked(true);

    if (correct) {
      setGameSettings((prevSettings) => ({
        ...prevSettings,
        currentScore: prevSettings.currentScore + 1,
      }));
      playCorrect();
    } else {
      playWrong();
    }

    setTimeout(() => {
      if (gameSettings.currentQuestion === 10) {
        setIsGameOver(true);
      } else {
        setGameSettings((prevSettings) => ({
          ...prevSettings,
          currentQuestion: prevSettings.currentQuestion + 1,
        }));
      }
      setSelectedAnswer(null);
      setHasClicked(false);
    }, 3000);
  };

  return (
    <main className="flex h-3/4 w-11/12 flex-col items-center p-10 text-xl lg:h-4/5 lg:w-2/3">
      {!isGameOver ? (
        <>
          <h3>{gameSettings.currentQuestion}/10</h3>
          <h2 className="font-mouse p-3 text-2xl">
            {gameQuestions[gameSettings.currentQuestion - 1].question}
          </h2>
          <div className="mt-6 flex flex-col gap-6">
            {gameQuestions[gameSettings.currentQuestion - 1].allAnswers.map(
              (item) => (
                <Button
                  className={`min-h-[60px] min-w-[200px] bg-white text-xl text-slate-700 shadow-lg lg:min-w-[600px] ${
                    hasClicked
                      ? item === correctAnswer
                        ? 'bg-green-500 text-white'
                        : item === selectedAnswer
                          ? 'bg-red-500 text-white'
                          : ''
                      : ''
                  } flex h-auto w-full items-center justify-center whitespace-normal break-words p-2 text-center`}
                  key={item}
                  value={item}
                  onClick={() => handleAnswerClick(item)}
                  disabled={hasClicked}
                >
                  {item}
                </Button>
              ),
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="text-2xl">
            Your score was {gameSettings.currentScore}/10
          </h1>
          <Button
            color="primary"
            onClick={refreshPage}
            className="min-h-[60px] min-w-[200px] text-xl"
          >
            Play again!
          </Button>
        </div>
      )}
    </main>
  );
};

export default Game;

function refreshPage() {
  window.location.reload();
}

function playCorrect() {
  const correctSound = new Audio('/static/correct.mp3');
  correctSound.play();
}

function playWrong() {
  const wrongSound = new Audio('/static/wrong.mp3');
  wrongSound.play();
}
