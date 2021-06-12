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
            console.log("Missed " + game.missed);
        }
    });

    // Listen for physical keyboard as well
    document.addEventListener("keyup", (e) => {
        if (/[a-z]/.test(e.key)){
            game.handleInteraction(e)
            console.log("Missed " + game.missed);
        }
    });
});

