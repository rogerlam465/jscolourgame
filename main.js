// default game difficulty

var gameDifficulty = 3;

function initGame(setDifficulty) {

    // create initial colour boxes
    
    var boxes = document.getElementById("gameplay");
    boxes.innerHTML = "";
    for (var i = 0; i < setDifficulty; i++) {
        boxes.innerHTML += "<div class='colourBox'></div>";
    }
    fillBoxes();

    document.getElementById("restartButton").innerHTML = "Restart?";

    // set game logic
    
    var winner = Math.floor(Math.random() * setDifficulty);
    var allBox = document.getElementsByClassName("colourBox");
    var targetBanner = document.getElementById("targetRGB");

    targetBanner.innerHTML = "";
    targetBanner.innerHTML = allBox[winner].style.backgroundColor;

    for (var i = 0; i < allBox.length; i++) {
        allBox[i].addEventListener("click", function() { 
            if (this.style.backgroundColor === allBox[winner].style.backgroundColor) {
                targetBanner.innerHTML = "WINNER!";
                document.getElementById("restartButton").innerHTML = "New game?";
                for (var j = 0; j < allBox.length; j++) {
                    allBox[j].style.visibility = "visible";
                    allBox[j].style.transition = "background-color 0.7s ease";
                    allBox[j].style.backgroundColor = allBox[winner].style.backgroundColor;
                }
            } else {
                this.style.visibility = "hidden";
            }
        });
    }
}

function startGame() {

    initGame(gameDifficulty);

    // add menu listeners

    document.getElementById("easyButton").addEventListener("click", function() { 
        gameDifficulty = 3;
        this.classList.add("active");
        this.classList.remove("inactive");
        document.getElementById("hardButton").classList.add("inactive");
        document.getElementById("hardButton").classList.remove("active");
        initGame(gameDifficulty);
    });

    document.getElementById("hardButton").addEventListener("click", function() {

        gameDifficulty = 6;
        this.classList.add("active");
        this.classList.remove("inactive");
        document.getElementById("easyButton").classList.add("inactive");
        document.getElementById("easyButton").classList.remove("active");
        initGame(gameDifficulty);
    });

    document.getElementById("restartButton").addEventListener("click", function() {
        initGame(gameDifficulty);
    });

} 

// generate a CSS RGB code

function randColours() {
    var newRGB = 'rgb(';
    for (var i = 0; i < 3; i++) {
        newRGB += Math.floor(Math.random() * 255) + 1;
        if (i < 2) {
            newRGB += ',';
        } else {
            newRGB += ')';
        }
    }
    return newRGB;
}

// colour the boxes

function fillBoxes() {
    var everyBox = document.getElementsByClassName("colourBox");
    for (var i = 0; i < everyBox.length; i++) {
        everyBox[i].style.backgroundColor = randColours();
    }
}

startGame();
