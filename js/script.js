const previousOperationText = document.getElementById("previous-operation");
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll("#buttons-container button");

class calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    //Adicionar o digito na tela da calculadora
    addDigit(digit) { 
        // checar se current operation já tem ponto .
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return
        } 

        this.currentOperation = digit;
        this.updateScreen();
    }

    // Processar todas as operações da calculadora
    processOperation(operation) {


        //Checar se o current esta vazio
        if (this.currentOperationText.innerText === "") {
            if(this.previousOperationText.innerText !== "") {
                //Mudar operação
                this.changeOperation(operation)
            }
            return
        }

        
        //Pegar current and previous value
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            default:
                return;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                    operationValue = previous * current
                    this.updateScreen(operationValue, operation, current, previous)
                    break;
        }
    }

    //Mudar valores da tela da caluladora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null,
    ) {
        console.log(operationValue, operation, current, previous)

        if(operationValue ===  null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //checar se valor é zero, se for add ao current value
            if (previous === 0) {
                operationValue =  current
            }
            //add current value para previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }

    //Mudar operação
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]

        if (!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }
}

const calc =  new calculator(previousOperationText, currentOperationText);


// separando números de operadores
buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value)
        } else {
            calc.processOperation(value);
        }
    });
});