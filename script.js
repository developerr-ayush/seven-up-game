// all variables 
const button = document.getElementById("bet");
const form = document.getElementById("form");
const balanceHtml = document.getElementById("balance");
const moneyPut = document.getElementById("moneyPut");
const animation = document.getElementById("animation")
const resultNumber = document.getElementById("resultNumber");
const add = document.getElementById("add");
const sub = document.getElementById("sub");
const won = document.getElementById("resultText");
const errorCheck = document.getElementById("error-checkbox");
let balance = 100;
if (localStorage.getItem("balance")) {
  balance = Number(localStorage.getItem("balance"))
}
balanceHtml.innerHTML = balance;

// check random number
function checkNumber() {
  // reseting html 
  resultNumber.innerHTML = "Please Wait"
  won.innerHTML = "Your result will appear here"
  // generating randm numbers
  let n1 = Math.floor(Math.random() * 6) + 1;
  let n2 = Math.floor(Math.random() * 6) + 1;
  let number = n1 + n2;
  console.log(number)
  // dice rotation 
  rotateDice(n1, "#dice1");
  rotateDice(n2, "#dice2");
  // showing number after dice rotation is completed
  setTimeout(() => {
    resultNumber.innerHTML = number
  }, 2000);
  // returning result 
  return number == 7 ? "perfect" : number > 7 ? "up" : "down";

}
// check winner
function checkWinner(amount, answer) {
  let checkedElement = document.querySelector(
    ".form-check-input:checked"
  ).value;

  setTimeout(() => {

    if (answer == checkedElement) {
      won.classList.add("text-info")
      if (answer == "perfect") {
        won.innerHTML = "You won yay! its a perfect 7"
      } else {
        won.innerHTML = "You won yay"
      }
    } else {
      won.classList.add("text-danger")
      won.innerHTML = "You Lost! better luck Next time"
    }
  }, 2000);
  return answer == checkedElement
    ? answer == "perfect"
      ? amount * 4
      : amount * 2
    : 0;
}
// check weather input is checked or not
function inputChecked() {
  let result = false;
  document.querySelectorAll(".form-check-input").forEach((element) => {
    if (element.checked) {
      result = true;
    }
  });
  return result;
}
// dice rotation 
function rotateDice(number, element) {
  // showing popup 
  animation.style.display = "flex";
  // dice rotation animation 
  setTimeout(() => {
    // generating dice axis
    switch (number) {
      case 1:
        x = 720;
        y = 810;
        break;
      case 6:
        x = 720;
        y = 990;
        break;
      default:
        x = 720 + (6 - number) * 90;
        y = 900;
        break;
    }
    // adding style based on axis

    document.querySelector(
      element
    ).style.transform = `translateZ(-100px) rotateY(${x}deg) rotateX(${y}deg)`;
  }, 200);

  setTimeout(() => {
    // hiding popup after timeout 
    animation.style.display = "none";
    // reseting style of dice after timeout so that it can rotate second time too 
    document.querySelectorAll(".dice").forEach((element) => {
      element.removeAttribute("style");
    });
  }, 5000);
}
// reseting dice rotation 


// even listeners
// add icon event 
add.addEventListener("click", (e) => {
  moneyPut.value >= balance
    ? ""
    : (moneyPut.value = Number(moneyPut.value) + 5);
});
// subtract icon event 
sub.addEventListener("click", (e) => {
  moneyPut.value <= 5 ? "" : (moneyPut.value = Number(moneyPut.value) - 5);
});
// form submit event 
document.getElementById("bet").addEventListener("click", (e) => {
  e.preventDefault();
  let moneyUsed = Number(moneyPut.value);
  if (!(moneyUsed <= balance) || moneyUsed <= 0) {
    document.getElementById("errorAmount").innerHTML = "please enter a valid number"
  } else if (inputChecked()) {
    document.getElementById("errorAmount").innerHTML = ""
    errorCheck.innerHTML = "";
    balance -= moneyUsed;
    let answer = checkNumber();
    moneyUsed = checkWinner(moneyUsed, answer);
    balance += moneyUsed;
    balanceHtml.innerHTML = balance;
    moneyPut.value = 10
    localStorage.setItem("balance", balance)
  } else {
    errorCheck.innerHTML = "Please select some option";
  }
});
document.getElementById("reset").addEventListener("click",e=>{
  balance=100;
  localStorage.setItem("balance",100)
  balanceHtml.innerHTML = balance;

})