// Refrence display element
const display = document.getElementById("display");

//Track if we have performed calculation
let justCalculated = false

function isOperator(char) {
    return ["+", "-","*","/"].includes(char);
}

function getLastChar() {
    return display.value.slice(-1);
}

function safeEval(expression) {
    try {
      let jsExpression = expression  
            .replace(/×/g, '*')
            .replace(/÷/g, '/');

        if (!/^[0-9+\-*/.()]+$/.test(jsExpression)){
            throw new Error('Invalid characters in expression');
        }
        const result = Function(' "use strict"; return (' + jsExpression + ')')();

        if (!isFinite(result)) {
            throw new Error('Invalid calculation result');
        }

        return result;
    } catch (error) {
        console.error('Calculate error;', error);
        return 'Error';
    } 
    
}

function appendToDisplay(value) {
    console.log("Button pressed:", value);

    let currentvalue = display.value;

    if (justCalculated && !isNaN(value)) {
        display.value = value;
        justCalculated = false;
        return;
    }

    if (justCalculated && isOperator(value)) {
        display.value = currentvalue + value;
        justCalculated = false;
        return;
    }

//Handles operators
    if (isOperator(value)) {
        //Dont allow operator as first charactor, (exception for minus)
        if (currentvalue === '0' && value !== '-') {
            return; // do nothing
        }

    // if the last charactor is already an operator, replace  it
        if (isOperator(getLastChar())) {
            display.value = currentvalue.slice(0, -1) +  value;
        } else {
            display.value = currentvalue + value;
        }
        
    } else if (!isNaN (value)) {
        if (currentvalue === '0') {
            display.value = value;
        } else {
            display.value = currentvalue + value;
        } 
     
    } else if (value === "."){
       if (currentvalue === '0') {
        display.value = currentvalue + value;
       } else {
        // Get the last number in the display after last operator
        let parts = currentvalue.split(/[+\-*/]/);
        let lastNumber = parts[parts.length - 1];

        // Only add  decimal if number doesn't already have one
        if (!lastNumber.includes('.')){
            display.value = currentvalue + value;
        }


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
   
}

function calculate() {
    let expression = display.value;
    // Dont calculate if display is 0 or empty

    if (expression === '0' || expression === '') {
        return;
    }
    
    // Dont calculate of expression endns with operator
    if (isOperator(getLastChar())) {
        return;
    }
    let result = safeEval (expression);
    if (result === 'Error') {
        display.value = 'Error';
        setTimeout(() => {
           clearDisplay() 
        }, 2000);

    } else {
        if (Number.isInteger(result)) {
            display.value =result.toString();
    
    } else {
        display.value = parseFloat(result.toFixed(10)).toString();
    }
    justCalculated = true
}

    display.style.backgroundColor = '#e8f5e8';
    setTimeout(() => {
        display.style.backgroundColor = '';
    }, 300);
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


