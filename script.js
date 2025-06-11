// Refrence display element
const display = document.getElementById("display");

//Track if we have performed calculation
let justCalculated = false

function appendToDisplay(value) {
    console.log("Button pressed:", value);

    alert('You pressed: ' + value);
}

function clearDisplay() {
    console.log("Clear button was clicked.");

    alert('Clear button was clicked');
}

function deleteLast() {
    console.log("Backspace button was clicked");

    alert('Backspace button was clicked');
    
}

function calculate() {
    console.log("Equals button was clicked");

    alert('Equals button was clicked');
    
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Calculator loaded succesfully");
    console.log('Display elemt', display);

    if (display) {
        console.log('Current display value',display.value);
    } else {
        console.log('Display element not found');
    }
})


