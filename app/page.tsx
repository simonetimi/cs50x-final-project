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

  const onClickNameConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPlayerState({ ...playerState, isNameConfirmed: true });
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerState({ ...playerState, name: event.target.value });
  };

  return (
    <>
      <header className="grid h-[10vw] grid-cols-3 p-2 pt-4 lg:mt-0 lg:border-b-1 lg:border-b-neutral-300 lg:p-8">
        <div className="col-start-2 col-end-2 flex flex-col items-center justify-center">
          <h1 className="text-3xl lg:text-3xl">Trivia Quiz App</h1>
          <h2 className="text-md hidden lg:block">
            I definitely need to find a better name, right?
          </h2>
        </div>
        <div className="ml-auto flex max-h-[10vh] flex-col items-end justify-center pr-4">
          {playerState.isNameConfirmed && (
            <>
              <p className="text-xl">Hi, {playerState.name}!</p>
              <p className="hidden text-xl lg:block">
                Your best score is: {playerState.score}
              </p>
              <p className="text-xl lg:hidden">
                Best score: {playerState.score}
              </p>
            </>
          )}
        </div>
      </header>
      <main className="flex h-[calc(100vh-16vw)] flex-col items-center justify-center">
        {!playerState.isNameConfirmed && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">Who are you?</p>
            <form
              className="mt-4 flex items-center justify-center gap-4"
              onSubmit={onClickNameConfirm}
            >
              <Input
                name="name"
                value={playerState.name}
                onChange={onChangeName}
                placeholder="Your name"
                className="w-[200px]"
                classNames={{ input: 'text-xl' }}
              ></Input>
              <Button color="primary" className="text-xl">
                Ok
              </Button>
            </form>
          </div>
        )}
        {playerState.isNameConfirmed &&
          (gameSettings.isInProgress ? (
            <Game
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
