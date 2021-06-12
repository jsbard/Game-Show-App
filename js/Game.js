/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            {phrase: "Don't cry over spilled milk"},
            {phrase: "Life is like a box of chocolates"},
            {phrase: "Singing in the rain"},
            {phrase: "The eye of the tiger"},
            {phrase: "A stitch in time saves nine"}
        ];
        this.activePhrase = null;
    }

    startGame () {
        const overlay = document.getElementById("overlay");
        // Remove game start menu
        overlay.style.display = "none";

        // Grab a random phrase and set/display
        const phrase = new Phrase(this.getRandomPhrase());
        this.activePhrase = phrase;
        phrase.addPhraseToDisplay();
    }

    // Returns a random phrase from the phrases array
    getRandomPhrase () {
        const phrases = this.phrases;
        const randIndex = Math.floor(Math.random() * phrases.length);
        return phrases[randIndex];
    }

    handleInteraction (event) {
        // Handle button click if the onscreen keyboard is clicked
        if (event.type === "click") {
            // Disable the onscreen keyboard button
            event.target.disabled = true;
            // Add appropriate classes and reveal letter if the selected letter is in the random phrase
            if (this.activePhrase.checkLetter(event.target.textContent)) {
                event.target.classList.add("chosen");
                this.activePhrase.showMatchedLetter(event.target.textContent);
                // Check if player won
                if (this.checkForWin()) {
                    this.gameOver(true);
                }
            } else {
                // Add appropriate classes and remove a life if player guessed wrong
                event.target.classList.add("wrong");
                this.removeLife();
            }
        }

        // Handle button click if the user's physical keyboard is pressed
        if (event.type === "keyup"){
            const keyboardBtns = document.getElementsByClassName("key");
            for (let i=0; i<keyboardBtns.length; i++){
                if (keyboardBtns[i].textContent === event.key){
                    // Disable the onscreen keyboard button
                    if (!keyboardBtns[i].disabled) {
                        keyboardBtns[i].disabled = true;
                        // Add appropriate classes and reveal letter if the selected letter is in the random phrase
                        if (this.activePhrase.checkLetter(event.key)) {
                            keyboardBtns[i].classList.add("chosen");
                            this.activePhrase.showMatchedLetter(event.key);
                            // Check if player won
                            if (this.checkForWin()) {
                                this.gameOver(true);
                            }
                        } else {
                            // Add appropriate classes and remove a life if player guessed wrong
                            keyboardBtns[i].classList.add("wrong");
                            this.removeLife();
                        }
                    }
                }
            }
        }
    }

    // Increment missed counter and alter heart image if life is lost
    removeLife () {
        const lives = document.getElementsByClassName("tries");
        this.missed++;
        for (let i=0; i<this.missed; i++){
            lives[i].innerHTML = `<img src="images/lostHeart.png" alt="Lost Heart Icon" height="35" width="30">`;
        }
        // Lose the game if user runs out of lives
        if (this.missed === 5){
            this.gameOver(false);
        }
    }

    checkForWin () {
        let wonGame = false;
        const displayLetters = document.querySelectorAll("#phrase .letter");

        // Loop through phrase display, and any contain the "hide" class, then the game
        // is not over. wonGame is true when no letter in the display has the "hide" class.
        for (let i=0; i<displayLetters.length; i++){
            if (displayLetters[i].classList.contains("hide")){
                wonGame = false;
                break;
            }
            wonGame = true;
        }
        return wonGame;
    }

    gameOver (gameWon) {
        const overlay = document.getElementById("overlay");
        const gameOverMessage = document.getElementById("game-over-message");

        // Display overlay on game win or lose
        overlay.style.display = "flex";
        startBtn.textContent = "Play Again";

        // Adjust overlay content according to win or loss
        if (gameWon) {
            overlay.className = "win";
            gameOverMessage.textContent = "You Won!"
        } else {
            overlay.className = "lose";
            gameOverMessage.textContent = "Better Luck Next Time";
        }

        // Reset Gameboard
            const phraseUL = document.querySelector("#phrase ul");
            const keyboardButtons = document.querySelectorAll("button.key");
            const lives = document.getElementsByClassName("tries");
            // Reset missed counter
            this.missed = 0;
            this.phrases = [];
            this.activePhrase = null;
            // Reset phrase display
            phraseUL.innerHTML = "";
            // Reset keyboard
            for (let i=0; i<keyboardButtons.length; i++){
                keyboardButtons[i].disabled = false;
                keyboardButtons[i].className = "key";
            }
            // Reset lives
            for (let i=0; i<lives.length; i++){
                lives[i].innerHTML = `<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30">`;
            }
    }
}