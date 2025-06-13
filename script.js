// Refrence display element
const display = document.getElementById("display");

//Track if we have performed calculation
let justCalculated = false

function appendToDisplay(value) {
    console.log("Button pressed:", value);

    let currentvalue = display.value;

    if (justCalculated && !isNaN(value)) {
        display.value = value;
        justCalculated = false;
        return;
    }

    // if current  display show 0 and user enters a number, we want to replace the 0
    if (currentvalue === "0" && !isNaN(value)) {
        display.value = value;
    } else if (currentvalue === "0" && value === "."){
       display.value = currentvalue + value; 
    } else if (value === '.') {
        //Get the last number in the display
        let lastNumber = currentvalue.split("[/-+*/\]").pop();
        //Only add the decimal if the current number doesn't have it
        if (!lastNumber.includes('.')) {
            display.value = currentvalue + value
        }

    } else {
        display.value = currentvalue + value;
    }
 
    //Reset the justCalculated flag when user starts typing
    justCalculated = false

    console.log('Display updated to', display.value);

    // if the current display shows 0 and user enters decimal, keep the 0
    
    
}

function clearDisplay() {
    console.log("Clear button was clicked.");

    display.value = "0";
    justCalculated = false;

    display.style.backgroundColor = "#f0f0f0";
    setTimeout(() => {
        display.style.backgroundColor = '';
    }, 150);

   
}

function deleteLast() {
    console.log("Backspace button was clicked");

    let currentvalue = display.value;
    
// if there is only one character or its 0, reset to 0
    if (currentvalue.length <= 1 || currentvalue === "0")  {
    display.value = '0';
} else {
    display.value = currentvalue.slice(0, -1);
}

    alert('Backspace button was clicked');
    
}

function calculate() {
    console.log("Equals button was clicked");

    alert('Equals button was clicked');
    
}

document.addEventListener("keydown", function(event) {
    console.log("key pressed", event.key);

    if (event.key >= "0" && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (event.key === '+') {
        appendToDisplay('+');
    } else if (event.key === '-') {
        appendToDisplay('-');
    } else if (event.key === '-') {
        appendToDisplay('-');    
    } else if (event.key === '/') {
        event.preventDefault();
        appendToDisplay('/');      
    } else if (event.key === '*') {
        appendToDisplay('*');   
    }           

// Other character
    else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape' || event.key === "c" || event.key === 'C') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        deleteLast();
    }

})

document.addEventListener('DOMContentLoaded', function() {
    console.log("Calculator loaded succesfully");
    console.log('Display elemt', display);

    if (display) {
        console.log('Current display value',display.value);
    } else {
        console.log('Display element not found');
    }
})


