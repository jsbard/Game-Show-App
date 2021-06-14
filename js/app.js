/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startBtn = document.getElementById("btn__reset");
const keyboard = document.getElementById("qwerty");

startBtn.addEventListener("click", () => {

    const game = new Game();
    game.startGame();

    // Listen for keyboard button clicks
    keyboard.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON"){
            game.handleInteraction(e)
        }
    });

    // Listen for physical keyboard as well
    document.addEventListener("keyup", (e) => {
        // Prevent keyup event if onscreen button is disabled
            if (/[a-z]/.test(e.key)) {
                game.handleInteraction(e);
            }
    });
});

