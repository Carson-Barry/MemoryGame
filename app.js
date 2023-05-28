// Image sources
const images = ["images/reindeer.gif", "images/launch.gif", "images/cat.gif", "images/lightbulb.gif", "images/fish.gif", "images/oven.gif", "images/pizza.gif", "images/guy.gif", "images/nyan.gif", "images/dance.gif", "images/wave.gif", "images/alien.gif", "images/boom.gif"];

// Game code

// Selects an arbitrary amount of random images from the array given by the user. 
function getRandomImages(arrayOfImages, numberOfImages) {
    const returnArray = [];
    let maxNumber = arrayOfImages.length;
    let imageNumber;

    //Error if too many images requested
    if (numberOfImages > maxNumber) {
        throw new Error("Error: You attempted to get " + numberOfImages + " random images, but the array you provided contains only " + maxNumber + " images.");
    }

    //Uses Math.random() to select images at random
    for (let i = 0; i < numberOfImages; i++) {
        imageNumber = Math.floor(Math.random()*maxNumber);

        //Try again, image has already been selected
        if (returnArray.includes(images[imageNumber])) {
            i--;
        }

        //This is a new image, add to array
        else {
            returnArray.push(images[imageNumber]);
        }
    }

    return returnArray;
}


function assignImagesForMatch(arrayOfImages) {
    const orderedImages = [];
    let placedCount = 0;
    let position;

    //Fill an array with 0s
    for (i = 0; i < arrayOfImages.length*2; i++) {
        orderedImages.push(0);
    }

    //Assign each image 2 random spots in the orderedImages array
    for (let i = 0; i < arrayOfImages.length; i++) {
        placedCount = 0;
        //Place each image in a random spot twice
        while (placedCount < 2) {
            //Generate a random position for the image
            position = Math.floor(Math.random()*arrayOfImages.length*2);
            //If the spot hasn't been used, place the image there, otherwise try again
            if (!orderedImages[position]) {
                orderedImages[position] = arrayOfImages[i];
                placedCount++;
            }
        }
    }

    return orderedImages;
}


const startButton = document.querySelector("#start_button");
const titleScreen = document.querySelector("#title_screen");
const gameScreen = document.querySelector("#game_screen");
const gameCards = document.querySelector("#game_cards")

// Moves the title screen off-screen when the "Start Game" button is pressed.
startButton.addEventListener("click", function() {
    titleScreen.style.opacity = "0%";
    console.log("Hiding title screen...")
    setTimeout(function(){
        titleScreen.style.visibility="hidden";
        console.log("Showing cards...")
        gameScreen.style.visibility="visible";
        gameScreen.style.opacity="100%"
    },250)
});




let cards = assignImagesForMatch(getRandomImages(images, 7))
let imagesClicked = []
let matchedCards = []
let numberOfMoves = 0;

gameCards.addEventListener("click", function(e) {

    if (imagesClicked.length < 2) {
        cardNumberClicked = e.target.getAttribute("data-number");
        e.target.src=cards[cardNumberClicked];

        if (!matchedCards.includes(cardNumberClicked)){
            if (imagesClicked.length === 1) {
                if (cardNumberClicked !== imagesClicked[0]) {
                    imagesClicked.push(cardNumberClicked);
                    numberOfMoves++;
                } 
            }
            else {
                imagesClicked.push(cardNumberClicked); 
                numberOfMoves++;
            }
        }

    }

    if (imagesClicked.length === 2) {
        if (!(cards[imagesClicked[0]] === cards[imagesClicked[1]])) {
            console.log("No match found! Waiting 1 second, then flipping cards.")
            setTimeout(function() {
                document.querySelector("[data-number='" + imagesClicked[0] + "']").src="images/card.jpeg"
                document.querySelector("[data-number='" + imagesClicked[1] + "']").src="images/card.jpeg"
                imagesClicked = [];
            }, 1000)
        }
        else {
            console.log("Match found!");
            matchedCards.push(imagesClicked[0]);
            matchedCards.push(imagesClicked[1]);
            imagesClicked = [];

            if (matchedCards.length === cards.length) {
                console.log("Congratz... you won in only " + numberOfMoves + " moves. Do better next time.")
            }
        }
    }


});