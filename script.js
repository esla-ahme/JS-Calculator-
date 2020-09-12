/* Simple Calculator App */
const calcScreen = document.querySelector(".screen");
const buttons = document.querySelector(".buttons");

let screen = "0", mem = "";
let operation = "";

buttons.addEventListener('click', (event) => {
  let pressed = event.target.innerText;
  const pressedType = event.target.classList;

  if (pressedType[1] == 'op') {
    /* in case of equal pressed */
    if (pressed == "=") {
      //make sure opertion has been pressed 
      if (operation !== undefined && mem.length != 0) {
        screen = eval(mem + operation + screen);
        mem = "";
      }

    }

    /* if operation pressed */
    else {
      // handle division and multiplication
      pressed = (pressed == "×") ? "*" : pressed;
      pressed = (pressed == "÷") ? "/" : pressed;

      /* if memory not empty */
      if (mem !== "") {
        mem = eval(mem + operation + screen);
      }

      /* in case memory is empty */
      else {
        mem = screen;
      }

      // keep last opertion clicked
      operation = pressed;
      screen = "0";
    }

  }
  else if (pressedType[1] == "c") {
    mem = "", screen = "0";
  }
  else if (pressedType[1] == "del") {
    if (screen == NaN) {
      screen = (screen.length <= 1) ? "0" : screen.toString().slice(0, -1);
    } else {
      // if delete is pressed on the result it will act as C
      mem = "", screen = "0";
    }

  }
  else {
    screen = (screen == "0") ? pressed : screen + pressed;
  }
  calcScreen.innerText = screen;
});
