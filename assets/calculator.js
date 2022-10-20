//globals
let currentTheme = "light";
let currentEquation = "";
let mathArea;
//position is inverse (0 = end of the line)
let cursorPosition = 0;
let cursorOn = true;

//define the text field and update the theme on load
function InitCalculator() {
  updateTheme();
  mathArea = document.getElementById("mathArea");

    //loop to toggle cursor
    let cursorLoop = setInterval(function(){
        cursorOn = !cursorOn;
        updateEquation();
  }, 500);
}

//update the equation to show in the text field
function updateEquation() {
  let relativeCursorPosition = currentEquation.length-cursorPosition;
  mathArea.value = [currentEquation.slice(0, relativeCursorPosition), (cursorOn)? "▮" : "▯", [currentEquation.slice(relativeCursorPosition)]].join('');
}


//CURSOR MANAGEMENT

//move the cursor position
function moveCursor(amt) {
  cursorPosition += amt;
  updateEquation();
}

//THEME MANAGEMENT

//function for toggling the global theme
function toggleTheme() {
  currentTheme = (currentTheme === "dark")? "light" : "dark";
  updateTheme();
}

//apply the global theme
function updateTheme() {
  localStorage.setItem('theme', `theme-${currentTheme}`);
  document.documentElement.className = `theme-${currentTheme}`;
}


//BUTTON REGISTERS

//registers for buttons
function register(element) {
  let thisChar = element.children[0].innerHTML;
  let relativeCursorPosition = currentEquation.length-cursorPosition;
  console.log(`register: ${thisChar}`);
  
  currentEquation = [currentEquation.slice(0, relativeCursorPosition), thisChar, currentEquation.slice(relativeCursorPosition)].join('');

  updateEquation();
}

//register special (multicharacter things (sin, cos, etc))
function registerSpecial(element) {
  let thisChar = element.children[0].innerHTML;
  let relativeCursorPosition = currentEquation.length-cursorPosition;
  console.log(`register: ${thisChar}`);
  
  currentEquation = [currentEquation.slice(0, relativeCursorPosition), thisChar, currentEquation.slice(relativeCursorPosition)].join('');
  cursorPosition++; //puts the cursor in the parantheses of the function
  updateEquation();
}

//register operation keys (like evaluation, deletion, and clearing)
function registerOperation(element) {
  let thisOperation = element.children[0].innerHTML;
  switch(thisOperation) {
    case "=":
      console.log("run equation");
      currentEquation = doTheMath(currentEquation).toString();
      cursorPosition = 0;
      updateEquation();
    break;
    case "DEL":
      console.log("delete character");
      let relativeCursorPosition = currentEquation.length-cursorPosition;
      currentEquation = [currentEquation.slice(0, relativeCursorPosition-1), currentEquation.slice(relativeCursorPosition)].join('');
      updateEquation();
    break;
    case "CLR": 
      console.log("clear");
      currentEquation = "";
      cursorPosition = 0;
      updateEquation();
    break;
  }
}