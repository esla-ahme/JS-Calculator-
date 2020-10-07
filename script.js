/* Simple Calculator App */
// selectors
const calcScreen = document.querySelector(".screen");
const buttons = document.querySelector(".buttons");

//initialize variablse 
let screen = "0", mem = "";
let operation = "";

buttons.addEventListener('click', (event) => {
  //get pressed button info
  let pressed = event.target.innerText;
  const pressedType = event.target.classList;

  //handel operations
  if (pressedType[1] == 'op') {
    /* in case of equal pressed */
    if (pressed == "=") {
      //make sure opertion has been pressed 
      if (operation !== undefined && mem.length != 0) {
        screen = performCalculation(mem, operation, screen);
        mem = "";
      }

    }

    /* if operation pressed */
    else {

      // handle division, multiplication, power of and square root
      pressed = (pressed == "×") ? "*" : pressed;
      pressed = (pressed == "÷") ? "/" : pressed;
      pressed = (pressed == "Xy") ? "pow" : pressed;
      pressed = (pressed == "√") ? "sq" : pressed;

      /**
       * If mem already contains a result
       * e.g if user wants to perform...
       * 3 + 3 +
       * the second hit of the + would trigger this
       * scenario as already a previous operation
       * has occurred.
       */
      if (mem !== "") {
        mem = performCalculation(mem, operation, screen);
      }

      /**
       * In the case that mem is empty
       * this would trigger the first time 
       * the user uses an operation
       * e.g. 3 +
       * the + would trigger this scenario
       * and only once in this equation
       */
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

function performCalculation(memoryValue, operation, screenValue) {
  if (operation == "pow") {
    return Math.pow(memoryValue, screenValue);
  } else if (operation == "sq") {
    return Math.sqrt(memoryValue);
  } else {
    return eval(memoryValue + operation + screenValue);
  }
}