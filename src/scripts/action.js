import { InputsState } from './state'
const dialog = document.querySelector('.dialog');

export const InputAction = (input) => {
    if(input[Symbol.toStringTag] !== 'HTMLInputElement'){
        throw new SyntaxError("Expected HTMLInputElement instead of " + (input[Symbol.toStringTag] || typeof input));
    }
    
    if(+input.value < 0) {
        input.value = +input.value * -1
    };

    switch(input.name){
        case "bill_input":
            InputsState.billValue = parseInt(input.value) || 0
            return InputsState
        case "people_amount-input":
            InputsState.peopleAmountValue = parseInt(input.value) || 0
            return InputsState
        }
}


export const ButtonsAction = (button) => {
    if(button[Symbol.toStringTag] !== 'HTMLButtonElement'){
        throw new SyntaxError('Expected HTMLButtonElement instead of ' + (button[Symbol.toStringTag] || typeof button));
    }

    switch(button.name){
        case "tip_1":
            InputsState.percentage = 5;
            return InputsState
        case "tip_2":
            InputsState.percentage = 10;
            return InputsState;
        case "tip_3":
            InputsState.percentage = 15;
            return InputsState
        case "tip_4":
            InputsState.percentage = 20;
            return InputsState;
        case "tip_5":
            InputsState.percentage = 25;
            return InputsState;
        case "tip_reset":
            InputsState.billValue = 0;
            InputsState.percentage = 0;
            InputsState.peopleAmountValue = 0;
            return InputsState;
        case "tip_custom":
            dialog.showModal();
            return InputsState;
    }

}