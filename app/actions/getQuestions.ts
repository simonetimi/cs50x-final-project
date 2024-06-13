'use server';

const getQuestions = async (
  difficulty: string,
  category: string[] | undefined,
) => {
  let string;
  if (category) {
    const categoryString = category.join();
    string = `https://the-trivia-api.com/v2/questions?difficulties=${difficulty}&categories=${categoryString}`;
  } else {
    string = `https://the-trivia-api.com/v2/questions?difficulties=${difficulty}`;
  }
  try {
    const response = await fetch(string);
    if (!response) throw new Error('Error fetching data from Trivia API');
    const data = await response.json();
    const filteredData = data.map(
      (item: {
        question: { text: string };
        correctAnswer: string;
        incorrectAnswers: string[];
        allAnswers: string[];
      }) => {
        return {
          question: item.question.text,
          correctAnswer: item.correctAnswer,
          incorrectAnswers: item.incorrectAnswers,
          allAnswers: [...item.incorrectAnswers, item.correctAnswer],
        };
      },
    );
    return filteredData;
  } catch (error) {
    return error;
  }
};

export default getQuestions;
