# Trivia Quiz App
#### Video Demo:  <URL HERE>
#### Description:
This project is a Trivia Quiz game where the user can input their name, then select the difficulty for the current game and the categories of the questions (by default, they are all selected).

##### The flow of the application

On the first load, the app will be on a bank state. The user will see the header, only with the title, and a form to input their name. Once the name has been submitted (either by clicking the button or pressing Enter), it will be saved locally and the name of the user, along with the best score (0) will be shown on the top right of the screen. The user can then select the difficulty of the game (easy, medium and hard), and can select multiple categories for the questions (all of them are selected by default). When the user inputs the desiderate settings, the game starts.

When the game begins, the user will face a multiple-choice question with 4 possible answers.
If the user selects the correct answer, the button will turn green and it will play a specific sounds. Otherwise, the button will turn red, and the one with the correct answer will turn green instead. Another specific sound will be played in that case. After three seconds, the next question is then presented to the user. Every game has 10 questions, and the best score for the player will be saved. Now, the user is prompted to start a new game, where he can change the settings.

##### How does it work under the hood?

I used TypeScript as the main language, along with some HTML & CSS. Specifically, I used Next.js as a framework, paired with Tailwind CSS.
For a cleaner code, I used Eslint and Prettier, which are widely used in the industry. Eslint is essential in optimizing code, like avoiding declaring unused imports or variable. Prettier formats the code so it’s consistent throughout the whole applications.
Specifically, I configured Eslint to enforce the best practices for TypeScript, along with a11y components for better accessibility. I also set it to order imports in every TypeScript file to make them consistent.  Prettier, on the other hand, has been set to keep the print view under 80 characters, an indentation size of 2 and the use of single quotes, for consistency reasons.

The initial page is on the component Page.tsx, in the App directory. It holds the basic states of the application: playerState, gameSettings and gameQuestions. playerState contains data on user's name and score. This state specifically is saved on localStorage, and retrieved automatically on page load using the react's hook "useEffect". This ensures that the best score of the user is saved locally and will persist between sessions. The user also has the ability to clear local storage data with a button that is conditionally rendered on the header. gameSettings controls: the state of the game (if it's in progress), the difficulty, the selected categories, the current score and the current question. Lastly, gameQuestion is a custom state that contains an array of objects coming from the [Trivia Quiz API](https://the-trivia-api.com/) with the questions and the answers, correct and incorrect. The states are then passed as needed to the other components as props: Game.tsx and Settings.tsx. The Settings component is conditionally rendered when the user's name is confirmed but the game is not in progress. Game is, on the other side, rendered when both those conditions are true. If name is not confirmed, neither are rendered.
Before the logic of the application increases the current question number of one, there’s a delay of 3000 milliseconds (using setTimeout function) so that the user can look at the correct answer, and their selected one.
The UI has custom components and other components from the NextUI library, providing customizable components with native TypeScript and Tailwind CSS support.
Trivia Quiz API is queried with a server action, a React/Next.JS features that allows performing functions server-side, along with server components. The data from the API is then processed on the server, specifically transforming the JSON in a JavaScript object, and creating a custom object which is then consumed by the client side of the application.
The layout.tsx component is where the metadata of the app goes, containing therefore the language, the title and description of the webpage, the font imports and the icon/favicon data, supporting the standard favicon just as the os-specific versions like android/chrome versions or the apple version.

#####  Files

I created all the files in the app folder, except for page.tsx, layout.tsx and global.css, which were created by the framework cli and heavily modified by me.
Additionally, I created the favicons in the public folder using [Favicon Generator](https://realfavicongenerator.net/) and downloaded the two sounds in /static from [Pixabay](pixabay.com).
Everything outside the app folder are configuration files.

##### How to run the application
Node.js should be installed. Then run ```npm i``` in the root folder to install the dependencies. At this point, type ```npm run start``` to start the production environment.
The folder also contains the source files. For dev mode, type ```npm run dev```.