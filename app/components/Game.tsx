'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';

import { GameQuestions, GameSettings, PlayerState } from '@/app/page';

const Game = ({
  playerState,
  setPlayerState,
  gameSettings,
  setGameSettings,
  gameQuestions,
}: {
  playerState: PlayerState;
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
    <main className="flex h-3/4 w-11/12 flex-col items-center p-10 lg:h-4/5 lg:w-2/3">
      {!isGameOver ? (
        <>
          <h3>{gameSettings.currentQuestion}/10</h3>
          <h2 className="p-3 text-xl">
            {gameQuestions[gameSettings.currentQuestion - 1].question}
          </h2>
          <div className="mt-6 flex flex-col gap-6">
            {gameQuestions[gameSettings.currentQuestion - 1].allAnswers.map(
              (item) => (
                <Button
                  className={`py-4 ${
                    hasClicked
                      ? item === correctAnswer
                        ? 'bg-green-500'
                        : item === selectedAnswer
                          ? 'bg-red-500'
                          : ''
                      : ''
                  }`}
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
        <div className="flex flex-col gap-10">
          <h1>Your score was {gameSettings.currentScore}/10</h1>
          <Button color="primary" onClick={refreshPage}>
            Restart?
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
