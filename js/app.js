// Cards and Deck Declaration
let cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
cards = cards.concat(cards);
const cardsContainer=document.querySelector(".deck");


//Card States Declaration
let openedCards = [];
let matchedCards = [];
let shuffledCards = [];

//Score Declarations
let countStars = 3;
const stars = document.querySelector(".stars");
let lastmoves = document.querySelector(".moves");
let lastcountStars = document.querySelector(".countStars");
let lastallSeconds = document.querySelector(".time");
let scorePanel = document.getElementById("score-panel");


//initGameialize the game 
function initGame() {
const shuffeledCards = shuffle(cards);
   
for (let i = 0; i < cards.length; i++){
const card=document.createElement("li");
card.classList.add("card");
card.innerHTML = "<i class= '" + cards[i] + "'</i>";
cardsContainer.appendChild(card);
  
// Add click event to each card
click(card);  
 }
}

//Set clock
let timerVar = setInterval(clockTimer, 1000);
let allSeconds = 0;

function clockTimer() {
  ++allSeconds;
  let hour = Math.floor(allSeconds / 3600);
  let minute = Math.floor((allSeconds - hour * 3600) / 60);
  let seconds = allSeconds - (hour * 3600 + minute * 60);

  document.getElementById(`hour`).innerHTML = hour;
  document.getElementById(`minute`).innerHTML = minute;
  document.getElementById(`allSeconds`).innerHTML = seconds;
}

function clockStart() {
  timerVar = setInterval(countTimer, 1000);
}

function tpause() {
  clearInterval(timerVar);
}

function sreset() {
  allSeconds = -1;
  clockTimer();
}
  
//Click Card
function click(card) {
  
//Card Click Event
card.addEventListener("click", function (){
const currentCard = this;
const previousCard = openedCards[0];
    
// Open Cards
    
if(openedCards.length === 1){ 
card.classList.add("open", "show", "disable");    
openedCards.push(this);     
         
// Compare Open Cards 
if(this.innerHTML === openedCards[0].innerHTML) {
  
 
// If Our Cards Match
currentCard.classList.add("match");
previousCard.classList.add("match"); 
  
matchedCards.push(currentCard, previousCard);          
openedCards = []; 
  
//Is Game Over?
isOver();
  
  
} else {
  
 //Flip Non Matching Cards Back Over
setTimeout(function(){
currentCard.classList.remove ("open","show", "disable");
previousCard.classList.remove ("open","show", "disable"); openedCards = []; 
  }, 500);
 
 //Increase Moves
addMove(); 
 
}  
  
} else {
  
//Look for open cards
  
currentCard.classList.add("open", "show", "disable");    
openedCards.push(this);   
  
}
       
  });
 
}

// Game Over Message    
function isOver() {
if(matchedCards.length === cards.length) {
alert(` You Won! Do You Wish To Play Again? You Have ${countStars} stars . It took you ${moves} moves. Your time in seconds was ${allSeconds}` );
 clearInterval(timerVar); 
}
}

//Increase Moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0
function addMove() {
 moves++;
  movesContainer.innerHTML = moves;
  
  // Star Rating 
rating();
}
//Rating
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
                            <li><i class="fa fa-star"></i></li>`;
function rating() {
  if (moves > 15) {
    countStars = 1;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  } else if (moves > 10) {
    countStars = 2;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
  } else {
    countStars = 3;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
                                    <li><i class="fa fa-star"></i></li>`;
  }
}





//Restart Game
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function(){
 
  // Flip All Cards Back Over
 cardsContainer.innerHTML = " "; 
  
  
  // Initialize Game and Reset Cards.
  initGame();
  
matchedCards=[];
moves = 0;
movesContainer.innerHTML = moves; 
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>`;

});


// Call The Game Start Function
initGame();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

