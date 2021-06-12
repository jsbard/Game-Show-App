/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        // Take the text content from the phrase object and convert to all lower case.
        this.phrase = phrase.phrase.toLowerCase();
    }

    addPhraseToDisplay () {
        // Split the phrase string and check the letters one at a time
        const splitPhrase = this.phrase.split("");
        const phraseUl = document.querySelector("#phrase ul");
        for (let i=0; i<splitPhrase.length; i++) {
            let letter = splitPhrase[i];

            // Only add phrase letter to display if it is a letter a-z or a space.
            if(/[a-z]/.test(letter)){
                phraseUl.insertAdjacentHTML("beforeend",`<li class="hide letter ${letter}">${letter}</li>`);
            }

            if(/\s/.test(letter)){
                phraseUl.insertAdjacentHTML("beforeend",`<li class="space"> </li>`);
            }
        }
    }

    // Return true if argument matches a letter in the phrase
    checkLetter (letter) {
     return this.phrase.includes(letter);
    }

    showMatchedLetter (letter) {
        // Get all letters on the board that contain the class that matches the argument
        const lettersInPhrase = document.querySelectorAll(`#phrase li.${letter}`);
        // Update class list on every board letter that matches
        for (let i=0; i<lettersInPhrase.length; i++){
            let boardLetter = lettersInPhrase[i];
            boardLetter.classList.replace("hide", "show");
        }
    }
}