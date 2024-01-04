let gameName = "Guess The World";

document.title = gameName;
document.querySelector("h1").inertia = gameName;
let massagearea = document.querySelector(".massage");

document.querySelector(
  "footer"
).innerHTML = `${gameName} Game created by Yaser`;

let numberoftries = 6;
let numberofletters = 6;
let currentTry = 1;

let wordToGuess = "";
let words = [
  "Update",
  "Create",
  "Delete",
  "Branch",
  "school",
  "Master",
  "Mainer",
  "monster",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
//console.log(wordToGuess);

function generateinput() {
  const inputcontainer = document.querySelector(".inputs");
  for (let i = 1; i < numberoftries; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>try${i}</span>`;
    if (i !== 1) tryDiv.classList.add("dosabled-inputs");

    for (let j = 1; j <= numberofletters; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.id = `try-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputcontainer.appendChild(tryDiv);
  }

  inputcontainer.children[0].children[1].focus();
  let inputsIndesabeld = document.querySelectorAll(".dosabled-inputs input");
  inputsIndesabeld.forEach((el) => (el.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((el, i) => {
    el.addEventListener("input", function () {
      this.value = this.value.toUpperCase();

      let nextInput = inputs[i + 1];
      if (nextInput) nextInput.focus();
    });

    el.addEventListener("keydown", function (event) {
      //console.log(event)
      const currentIndex = Array.from(inputs).indexOf(event.target);
      //console.log(currentIndex);
      if (event.code === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }

      if (event.code === "ArrowLeft") {
        const pervInput = currentIndex - 1;
        if (pervInput >= 0) inputs[pervInput].focus();
      }
    });
  });
}

let guessbutton = document.querySelector(".check");
guessbutton.addEventListener("click", handelGeusess);


function handelGeusess() {
  let successGuess = true;
  for (let i = 1; i <= numberofletters; i++) {
    const inputfield = document.querySelector(`#try-${currentTry}-letter-${i}`);
    const letter = inputfield.value.toLowerCase();
    const actualletter = wordToGuess[i - 1];

    //game logic

    if (letter === actualletter && letter != "") {
      inputfield.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter != "") {
      inputfield.classList.add("not-in-palce");
      successGuess = false;
    } else {
      inputfield.classList.add("no");
      successGuess = false;
    }
  }
  // check if user win or not
  if (successGuess) {
    massagearea.innerHTML = `You Win! The word is <span>${wordToGuess}</span>`;

    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((trydiv) => {
      trydiv.classList.add("dosabled-inputs");
      guessbutton.disabled = true;
    });
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("dosabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => {
      input.disabled = true;
    });

    currentTry++;

    const nextInput = document.querySelectorAll(`.try-${currentTry} input`);
    nextInput.forEach((input) => {
      input.disabled = false;
    });
    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("dosabled-inputs");
      el.children[1].focus();
    } else {
      guessbutton.disabled = true;
      massagearea.innerHTML = `You Lose :( The Word Is <span> ${wordToGuess} </span>`;
    }
  }
}

window.onload = function () {
  generateinput();
};
