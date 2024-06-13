import { Dispatch, SetStateAction } from 'react';

import settings from '@/app/components/Settings';
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
  gameQuestions: GameQuestions | null;
}) => {
  return (
    <main className="flex w-2/3 flex-col items-center rounded-xl border-1 border-gray-800 p-10">
      This is the game
    </main>
  );
};

export default Game;
