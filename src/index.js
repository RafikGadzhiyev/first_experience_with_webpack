import './styles/style.scss'
import dollarIcon from './assets/icon-dollar.svg';
import personIcon from './assets/icon-person.svg'
import { ButtonsAction, InputAction } from './scripts/action'
import { InputsState } from './scripts/state';

const dollarIconImage = document.querySelector('.bill_image');
const personIconImage = document.querySelector('.person_image');
const billInput = document.querySelector('.bill-input');
const personAmountInput = document.querySelector('.people_amount-input');
const tipButtons = document.querySelectorAll('.tip_button');
const resetButton = document.querySelector('.reset-button');
const tipAmount = document.querySelector('.tip_amount_total');
const totalAmount = document.querySelector('.total-total');
const customTipButton = document.querySelector('.tip_custom');
const dialog = document.querySelector('.dialog');
const closeDialogbutton = document.querySelector('.dialog_close-button');
const saveButton = document.querySelector('.dialog_save-button')
const dialogInput = document.querySelector('.dialog_input')

billInput.oninput = (e) => InputEventHandler(e);
personAmountInput.oninput = (e) => InputEventHandler(e);

tipButtons.forEach(item => item.onclick = (e) => ButtonEventHandler(e))
resetButton.onclick = (e) => {ButtonEventHandler(e); setData({tip_amount: (0).toFixed(2), total: (0).toFixed(2)}); resetInputs()};

closeDialogbutton.onclick = e => {
    e.preventDefault();
    dialog.close();
}

saveButton.onclick = e => {
    e.preventDefault();
    customTipButton.textContent = +dialogInput.value + '%'
    InputsState.percentage = +dialogInput.value;
    customTipButton.classList.add('active');
    update();
    dialog.close();
}

function update(){
    let result = checkInputState(InputsState);
    if(!result){
        setData(getBillData(InputsState));
    }else{
        if(result.slice(1, 2) === 'B'){
            // billInput.classList.add('error');
        }else if(result.slice(1, 2) === 'P'){
            // billInput.classList.add('error');
        }
    }
}

function renderImages(){
    dollarIconImage.src = dollarIcon;
    personIconImage.src = personIcon;
}

function InputEventHandler(e){
    e.preventDefault();
    let input = e.target;
    InputAction(input);
    update()
}

function ButtonEventHandler(e){
    e.preventDefault();
    let button = e.target;
    ButtonsAction(button);
    setButton(button);
    update();
}

function setButton(button){
    for(let btn of tipButtons){
        btn.classList.remove('active');
    }

    button.classList.add('active');
}

function resetInputs(){
    billInput.value = 1;
    personAmountInput.value = 1;
}

function setData(data){
    tipAmount.textContent = '$' + data.tip_amount;
    totalAmount.textContent = '$' + data.total
}

function checkInputState(state) {
    if(typeof state !== 'object'){
        throw new SyntaxError('Expected object insted of ' + typeof state);
    }
    if(!state.billValue){
        return '[B]: bill input is empty'
    }else if(!state.peopleAmountValue){
        return "[P]: people amount input is empty"
    }

    return '';
}

function getBillData(state){
    if(typeof state !== 'object'){
        throw new SyntaxError('Expected object insted of ' + typeof state);
    }
    return {
        total: (state.billValue / state.peopleAmountValue + (state.percentage / 100 * state.billValue / state.peopleAmountValue)).toFixed(2), 
        tip_amount: (state.percentage / 100 * state.billValue / state.peopleAmountValue).toFixed(2)
    }
}

renderImages();

