'use client';

import { useState } from 'react';
import { Button, Input } from '@nextui-org/react';

export default function Home() {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  // server component to call quiz api
  // set it to a state

  // set states to handle: username, correct answers, incorrect, best scores, difficulty setting, current question/total
  // save to local storage on click
  // keep the highest score with difficulty

  const onClickConfirm = () => {
    setConfirmed(true);
    // optionally, add the ability to save in local storage
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <>
      <header className="grid h-[10vw] grid-cols-3 p-8">
        <div className="col-start-2 col-end-2 flex flex-col items-center justify-center">
          <h1 className="text-3xl">Trivia Quiz App</h1>
          <h2 className="text-lg">
            I definitely need to find a better name, right?
          </h2>
        </div>
        <div className="ml-auto flex flex-col items-end justify-center">
          {confirmed && (
            <>
              <p className="text-md">Hi, {name}!</p>
              <p>Your best score is: {score}</p>
            </>
          )}
        </div>
      </header>
      <main className="flex h-[calc(100vh-16vw)] flex-col items-center justify-center">
        {!confirmed && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg">Who are you?</p>
            <div className="flex gap-2">
              <Input
                name="name"
                value={name}
                onChange={onChangeName}
                placeholder="Your name"
              ></Input>
              <Button onClick={onClickConfirm}>Ok</Button>
            </div>
          </div>
        )}
        {
          // put game component here
        }
      </main>
    </>
  );
}
