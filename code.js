let gameName = "Guess The World";

document.title = gameName;
document.querySelector("h1").inertia = gameName;

document.querySelector(
  "footer"
).innerHTML = `${gameName} Game created by Yaser`;

let numberoftries = 6;
let numberofletters = 6;
let currentTry = 1;

function generateinput() {
  const inputcontainer = document.querySelector(".inputs");
  for (let i = 1; i < numberoftries; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>try${i}</span>`;
    if (i !== 1) tryDiv.classList.add('dosabled-inputs');
    for (let j = 1; j < numberofletters; j++){
      let input = document.createElement("input");
      input.type = "text";
      input.id = `try-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
     inputcontainer.appendChild(tryDiv);
  }
inputcontainer.children[0].children[1].focus();

}

window.onload = function () {
  generateinput();
};
