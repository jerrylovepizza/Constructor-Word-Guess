let Letter = function (letterParam) {
    ////// 1.The letter from game preload words:
    this.letter = letterParam;
    this.tof = false; //true or false

    ////// 3.The result letter or "_" shows on screen:
    this.showLetter = function () {
        if (this.tof) {
            this.letter = letterParam;
        } else {
            this.letter = "_";
        };
        // console.log(this.letter)
    };

    ////// 2.The player input letter in terminal:
    this.playerLetter = function (playerParam) {
        if (playerParam === letterParam) {
            this.tof = true;
            // console.log(this.tof)
        } else {
            this.tof = false;
            // console.log(this.tof)
        };
    };
    // this.playerLetter("f")
    // this.showLetter();
};
// Letter("g");


module.exports = Letter