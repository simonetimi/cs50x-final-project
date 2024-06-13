import { Dispatch, SetStateAction } from 'react';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
} from '@nextui-org/react';

import getQuestions from '@/app/actions/getQuestions';
import { GameQuestions, GameSettings } from '@/app/page';

const Settings = ({
  gameSettings,
  setGameSettings,
  setGameQuestions,
}: {
  gameSettings: GameSettings;
  setGameSettings: Dispatch<SetStateAction<GameSettings>>;
  setGameQuestions: Dispatch<SetStateAction<GameQuestions | null>>;
}) => {
  const categories = [
    { name: 'Music', code: 'music' },
    { name: 'Sport', code: 'sport_and_leisure' },
    { name: 'Film & TV', code: 'film_and_tv' },
    { name: 'History', code: 'history' },
    { name: 'Science', code: 'science' },
    { name: 'Society & Culture', code: 'society_and_culture' },
    { name: 'Food & Drink', code: 'food_and_drink' },
    { name: 'General Knowledge', code: 'general_knowledge' },
  ];

  const onSetDifficulty = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameSettings({ ...gameSettings, difficulty: event.target.value });
  };

  const onSetCategories = (value: string[]) => {
    setGameSettings({ ...gameSettings, category: value });
  };

  const onStartGame = async () => {
    setGameSettings({ ...gameSettings, isInProgress: true });
    const questions = await getQuestions(
      gameSettings.difficulty,
      gameSettings.category,
    );
    setGameQuestions(questions);
  };

  return (
    <main className="flex w-2/3 flex-col items-center gap-4 rounded-xl border-1 border-gray-800 p-10">
      <h1 className="text-xl">We&apos;re getting ready!</h1>
      <div className="flex flex-col gap-3">
        <RadioGroup
          label="Select a difficulty"
          value={gameSettings.difficulty}
          onChange={onSetDifficulty}
        >
          <Radio value="easy">Easy</Radio>
          <Radio value="medium">Medium</Radio>
          <Radio value="hard">Hard</Radio>
        </RadioGroup>
      </div>
      <div className="flex w-2/3 flex-col items-center justify-center gap-3">
        <CheckboxGroup
          label="Categories"
          orientation="horizontal"
          color="primary"
          value={gameSettings.category}
          onChange={onSetCategories}
        >
          {categories.map((item) => {
            return (
              <Checkbox key={item.code} value={item.code} className="px-3">
                {item.name}
              </Checkbox>
            );
          })}
        </CheckboxGroup>
        <Button className="mt-4" color="primary" onClick={onStartGame}>
          Start!
        </Button>
      </div>
    </main>
  );
};

export default Settings;