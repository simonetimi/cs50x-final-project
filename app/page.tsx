'use client';

import { useEffect, useState } from 'react';
import { Button, Input } from '@nextui-org/react';

import Game from '@/app/components/Game';
import Settings from '@/app/components/Settings';

export interface PlayerState {
  name: string;
  isNameConfirmed: boolean;
  score: number;
}

export interface GameSettings {
  isInProgress: boolean;
  difficulty: string;
  category: string[] | undefined;
  currentScore: number;
  currentQuestion: number;
}

export interface GameQuestions {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  allAnswers: string[];
}

export default function Home() {
  const [playerState, setPlayerState] = useState<PlayerState>({
    name: '',
    isNameConfirmed: false,
    score: 0,
  });

  const [gameSettings, setGameSettings] = useState<GameSettings>({
    isInProgress: false,
    difficulty: 'easy',
    category: [
      'film_and_tv',
      'sport_and_leisure',
      'music',
      'society_and_culture',
      'general_knowledge',
      'food_and_drink',
      'history',
      'science',
    ],
    currentScore: 0,
    currentQuestion: 1,
  });

  const [gameQuestions, setGameQuestions] = useState<GameQuestions[] | null>(
    null,
  );

  // save to local storage on change
  useEffect(() => {
    const savedState = localStorage.getItem('playerState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if (parsedState.isNameConfirmed) {
        setPlayerState(parsedState);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('playerState', JSON.stringify(playerState));
  }, [playerState]);

  const onClickNameConfirm = () => {
    setPlayerState({ ...playerState, isNameConfirmed: true });
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerState({ ...playerState, name: event.target.value });
  };

  return (
    <>
      <header className="grid h-[10vw] grid-cols-3 p-2 lg:p-8">
        <div className="col-start-2 col-end-2 flex flex-col items-center justify-center">
          <h1 className="text-2xl lg:text-3xl">Trivia Quiz App</h1>
          <h2 className="collapse text-lg lg:visible">
            I definitely need to find a better name, right?
          </h2>
        </div>
        <div className="ml-auto flex max-h-[10vh] flex-col items-end justify-center pr-4">
          {playerState.isNameConfirmed && (
            <>
              <p className="text-md">Hi, {playerState.name}!</p>
              <p className="text-md hidden lg:visible lg:flex">
                Your best score is: {playerState.score}
              </p>
              <p className="visibile text-md lg:hidden">
                Best score: {playerState.score}
              </p>
            </>
          )}
        </div>
      </header>
      <main className="flex h-[calc(100vh-16vw)] flex-col items-center justify-center">
        {!playerState.isNameConfirmed && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg">Who are you?</p>
            <div className="flex gap-2">
              <Input
                name="name"
                value={playerState.name}
                onChange={onChangeName}
                placeholder="Your name"
              ></Input>
              <Button onClick={onClickNameConfirm} color="primary">
                Ok
              </Button>
            </div>
          </div>
        )}
        {playerState.isNameConfirmed &&
          (gameSettings.isInProgress ? (
            <Game
              playerState={playerState}
              setPlayerState={setPlayerState}
              gameSettings={gameSettings}
              setGameSettings={setGameSettings}
              gameQuestions={gameQuestions}
            />
          ) : (
            <Settings
              gameSettings={gameSettings}
              setGameSettings={setGameSettings}
              setGameQuestions={setGameQuestions}
            />
          ))}
      </main>
    </>
  );
}
