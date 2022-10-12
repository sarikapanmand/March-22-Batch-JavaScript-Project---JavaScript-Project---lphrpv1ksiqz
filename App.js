// * Inputs
const billAmountInput = document.querySelector('.bill-amount-input');
const numberOfPeopleInput = document.querySelector('.number-of-people-input');
const customPercentageInput = document.querySelector('.custom-percentage-input');
const resetBtn = document.querySelector('.reset-btn')

// * Result elements
const tipPerPersonResultEl = document.querySelector('.tip-per-person-result');
const tipTotalResultEl = document.querySelector('.tip-total-result');

function getCheckedTipPercentage() {
    if (customPercentageInput.value === "") {
        return document.querySelector('.tip-percentage-input:checked').dataset['percentage'];
    } else {
        return Number((customPercentageInput.value) / 100);
    }
}

document.querySelector('.form').addEventListener('keyup', renderResult)

customPercentageInput.addEventListener('keydown', resetPercentageLabelsColor);

document.querySelectorAll('.tip-percentage-input').forEach((e) => {
    e.addEventListener('change', () => {
        customPercentageInput.value = "";
        renderResult();
    });
})

const percentageLabels = document.querySelectorAll('.tip-percentage-label');

percentageLabels.forEach((label) => {
    label.addEventListener('click', (e) => {
        resetPercentageLabelsColor();
        e.target.style.backgroundColor = "var(--clr-strong-cyan)"
    });
})

function resetPercentageLabelsColor() {
    percentageLabels.forEach((label) => {
        label.style.backgroundColor = "var(--clr-very-dark-cyan)"
    })
}

function validateInput(e) {
    if (e.value === "0" || e.value === "") {
        e.dataset.invalid = "true"
    } else {
        e.dataset.invalid = "false"
    }
}

function renderResult() {

    document.querySelector('.tip-percentage-input:checked').style.backgroundColor = "var(--clr-strong-cyan)"

    const billAmount = Number(billAmountInput.value);
    const tipPercentage = Number(getCheckedTipPercentage());
    const numberOfPeople = Number(numberOfPeopleInput.value);

    if (billAmount === 0) {
        billAmountInput.dataset.invalid = true;
    } else {
        billAmountInput.dataset.invalid = false;
    }

    const tipPerPerson = Number(((billAmount * tipPercentage) / numberOfPeople).toFixed(2));
    const tipTotal = Number(((billAmount / numberOfPeople) + tipPerPerson).toFixed(2));
    // const tipTotal = Number((tipPerPerson * numberOfPeople).toFixed(2))

    if ( billAmount === 0 || tipPercentage === 0 || numberOfPeople === 0) {
        tipPerPersonResultEl.textContent = `$0.00`;
        tipTotalResultEl.textContent = `$0.00`;
    } else {
        tipPerPersonResultEl.textContent = `$${tipPerPerson}`;
        tipTotalResultEl.textContent = `$${tipTotal}`;
    }
}

resetBtn.addEventListener('click', resetForm)

function resetForm() {
    billAmountInput.value = 0;
    numberOfPeopleInput.value = 0;
    renderResult();
}

resetForm();
validateInput(numberOfPeopleInput);
