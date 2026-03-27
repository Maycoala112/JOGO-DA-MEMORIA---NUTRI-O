const board = document.getElementById("game-board");
const text = document.getElementById("final-text");

const images = [
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg"
];

let cardsArray = [...images, ...images];
cardsArray.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

cardsArray.forEach((img) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const inner = document.createElement("div");
  inner.classList.add("card-inner");

  const front = document.createElement("div");
  front.classList.add("card-front");

  const back = document.createElement("div");
  back.classList.add("card-back");

  back.style.backgroundImage = `url('${img}')`;

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.addEventListener("click", () => flipCard(card));
  board.appendChild(card);
});

function flipCard(card) {
  if (lockBoard || card === firstCard) return;

  card.classList.add("flip");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

function checkMatch() {
  const img1 = firstCard.querySelector(".card-back").style.backgroundImage;
  const img2 = secondCard.querySelector(".card-back").style.backgroundImage;

  if (img1 === img2) {
    matches++;
    resetBoard();

    /* MOSTRA TEXTO AO FINAL */
    if (matches === images.length) {
      text.style.display = "block";
    }

  } else {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 800);
  }
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}