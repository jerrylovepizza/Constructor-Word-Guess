// npm packages
const Word = require("./word.js");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require('figlet');
const boxen = require('boxen');

// global variables
let gameArr = ["elastigirl", "incredible", "jack-jack", "dash", "violetparr", "frozone", "ednamode", "syndrome", "voyd"];
let pickWord = gameArr[Math.floor(Math.random() * (gameArr.length))];
let hearts = ["♥"];
let chances = 6;
for (var h = 1; h < chances; h++) { hearts.push("♥") }
let expose = 0;
let guessedArr = [];
let newGuess = "";

// constructor
let newWord = new Word(pickWord);
newWord.LetterArr();
newWord.newPlayerLetter();
newWord.newShowLetter();

//////////////////////////////////// function ////////////////////////////////////

// Welcome
figlet(' Incredible !!  ', function (err, data) {
    if (err) { console.dir(err); return }
    console.log("\n" + chalk.bgRed(data) + "\n");
    console.log(chalk.redBright.bold("       - Welcome to Incredible Word Guess Game! -\n\n\n\n"))
    return preGame();
});

// reset
function reset() {
    gameArr = ["elastigirl", "incredible", "jack-jack", "dash", "violetparr", "frozone", "ednamode", "syndrome", "voyd"];
    pickWord = gameArr[Math.floor(Math.random() * (gameArr.length))];
    hearts = ["♥"];
    chances = 6;
    for (var h = 1; h < chances; h++) { hearts.push("♥") }
    expose = 0;
    guessedArr = [];
    newGuess = "";
    newWord = new Word(pickWord);
    newWord.LetterArr();
    newWord.newPlayerLetter();
    newWord.newShowLetter();
};

// before Game start
function preGame() {
    reset();
    inquirer.prompt([{
        type: "list",
        message: "Are you ready for adventure?",
        choices: ["Let's Go", "Quit Game", "About Game"],
        name: "preGame"
    }]).then(function (response) {
        if (response.preGame.toString() === "Let's Go") {
            console.log(boxen(chalk.blueBright("\n\n   The Incredible Word: " + newWord.wordArr.join(" ") + "   \n\n"), { padding: 1, margin: 1, borderStyle: 'round' }))
            console.log(chalk.red("Chances: ") + chalk.redBright(hearts.join(" ")));
            console.log(chalk.yellow("Chosen: \n\n\n\n"));
            return gameStart();
        } else if (response.preGame.toString() === "Quit Game") {
            console.log("I'm always at your service!");
        } else {
            figlet(' Incredible !!  ', function (err, data) {
                if (err) { console.dir(err); return }
                console.log("\n" + chalk.redBright.inverse(data) + "\n");
                console.log(chalk.redBright("       - Welcome to Incredible Word Guess Game! -\n\n"))
                console.log(chalk.redBright.underline("How to play\n\n") + chalk.blueBright(
                    "When start, game will pick a Incredible movie character name word\n" +
                    "The player has 6 chances to find out the name by enter any letter.\n" +
                    "System will let you know if your choices are right or wrong.\n" +
                    "If right, your letter will display in the word on the screen.\n" +
                    "If you find out the word by the 6 chances you win.\n" +
                    "If wrong, you will lose 1 chance until game over.\n" +
                    "Thank you for playing.\n\n") +
                    chalk.gray("CopyRight 2019 Jerry Dai\n\n\n\n"));
                return preGame();
            });
        };
    });
};

// Game Process
function gameStart() {
    inquirer.prompt([{
        type: "input",
        message: "Enter a letter: ",
        name: "guess"
    }]).then(function (playGame) {
        newGuess = playGame.guess;

        if (newGuess.length === 1 && guessedArr.indexOf(newGuess) === -1) {
            guessedArr.push(newGuess);

            // A.right guess
            if (pickWord.indexOf(newGuess) > -1) {

                for (let i = 0; i < pickWord.length; i++) {
                    if (pickWord[i] == newGuess) {
                        newWord.wordArr[i] = newGuess;
                        expose++;
                    }
                }
                console.log(boxen(chalk.blueBright("\n\n   The Incredible Word: " + newWord.wordArr.join(" ") + "   \n\n"), { padding: 1, margin: 1, borderStyle: 'round' }))
                console.log(chalk.red("Chances: ") + chalk.redBright(hearts.join(" ")));
                console.log(chalk.yellow("Chosen: ") + chalk.yellowBright(guessedArr.join(" ")));
                console.log(chalk.greenBright("\n\nCorrect!\n\n\n\n"))
                // a.win
                if (expose === pickWord.length) {
                    figlet(' You Win !!  ', function (err, data) {
                        if (err) { console.dir(err); return }
                        console.log("\n" + chalk.redBright(data) + "\n\n");
                        console.log(chalk.redBright("   The Word is: " + pickWord));
                        console.log(chalk.redBright("   Congratulations!\n\n\n\n\n\n\n\n"));
                    });
                    return preGame();
                }
                return gameStart();
            };

            // B.wrong guess
            if (pickWord.indexOf(newGuess) === -1) {
                hearts = ["♥"];
                chances--;
                for (var h = 1; h < chances; h++) {
                    hearts.push("♥");
                }
                console.log(boxen(chalk.blueBright("\n\n   The Incredible Word: " + newWord.wordArr.join(" ") + "   \n\n"), { padding: 1, margin: 1, borderStyle: 'round' }))
                console.log(chalk.red("Chances: ") + chalk.redBright(hearts.join(" ")));
                console.log(chalk.yellow("Chosen: ") + chalk.yellowBright(guessedArr.join(" ")));
                console.log(chalk.greenBright("\n\nIncorrect.\n\n\n\n"));
                // b.lose
                if (chances === 0) {
                    figlet(' Game Over !!  ', function (err, data) {
                        if (err) { console.dir(err); return }
                        console.log("\n" + chalk.blueBright(data) + "\n\n");
                        console.log(chalk.blue("   You were so close..."));
                        console.log(chalk.blue("   The Word is: " + pickWord + "\n\n\n\n\n\n\n\n"));
                    });
                    return preGame();
                }
                return gameStart();
            };
            // exceptions:
        } else {
            console.log(chalk.greenBright("\n\nInvalid Input!\n"));
            return gameStart();
        };
    })
}