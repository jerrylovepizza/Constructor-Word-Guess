const Letter = require("./letter.js");

////// 4.The word that game preload:
let Word = function (wordParam) {
    this.newLetterArr = [];
    this.wordArr = [];

    ////// 5. Put every letter of preload word into the Letter object template(the "Letter" object (constructor) in letter.js) as new Letter objects.
    ////// Then push these new Letter objects into a new object array:
    this.LetterArr = function () {
        for (let i = 0; i < wordParam.length; i++) {
            let newLetter = new Letter(wordParam[i]);
            this.newLetterArr.push(newLetter)
        };
        // console.log(newLetterArr)
        // a. newLetter is a new Letter object
        // b. this.newLetterArr is an array of new Letter objects.
    };

    ////// 7.All result letters or "_" show on screen:
    this.newShowLetter = function () {
        for (let j = 0; j < this.newLetterArr.length; j++) {
            this.newLetterArr[j].showLetter();
        }
        // c. this.newLetterArr[j] is an object,
        // d. this.newLetterArr[j] = new Letter[j]
        // console.log(this.newLetterArr)

        ////// 8. Replace the newLetterArr(object array) to wordArr(string array).
        for (let k = 0; k < this.newLetterArr.length; k++) {
            this.wordArr.push(this.newLetterArr[k].letter);
        }
        // console.log("\n")
        // console.log("   The Hidden Word: " + this.wordArr.join(" "))
        // console.log("\n")
    }

    ////// 6.All player guessed letters in terminal:
    this.newPlayerLetter = function (playerParam) {
        for (let l = 0; l < this.newLetterArr.length; l++) {
            this.newLetterArr[l].playerLetter(playerParam);
        }
    }
    // this.LetterArr();
    // this.newPlayerLetter("s");
    // this.newShowLetter();
}
// Word("test");


module.exports = Word