let expense = {
    salary: 0,
    bills: [],
    costs: []
};
let ytdCost = 0;
let ytdSavings = 0;
let monthSaving = 0;
let percentSavingYtd = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    updateStats(expense.costs.reduce((acc, curr) => acc + curr, 0));
});

const form = document.getElementById('expenseForm');
const billsContainer = document.getElementById('billsContainer');
const addBillButton = document.getElementById('addBill');

addBillButton.addEventListener('click', () => {
    addBillEntry();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const wageInput = parseFloat(document.querySelector('input[name="salary"]').value);
    const billElements = document.querySelectorAll('.billEntry');

    if (!isNaN(wageInput)) {
        expense.salary += wageInput;
        document.getElementById('salary').innerText = expense.salary.toFixed(2);
    }

    billElements.forEach(billDiv => {
        const billName = billDiv.querySelector('input[name="billName"]').value;
        const cost = parseFloat(billDiv.querySelector('input[name="cost"]').value);

        expense.bills.push(billName);
        expense.costs.push(cost);

        addBillToTable(billName, cost);
    });

    const totalCost = expense.costs.reduce((acc, curr) => acc + curr, 0);
    updateStats(totalCost);
    saveState();

    form.reset();
    billsContainer.innerHTML = '';
    addInitialBillEntry();
});

function addBillEntry() {
    const billDiv = document.createElement('div');
    billDiv.classList.add('billEntry');

    const billNameLabel = document.createElement('legend');
    billNameLabel.textContent = 'Bill';
    billDiv.appendChild(billNameLabel);

    const billNameInput = document.createElement('input');
    billNameInput.type = 'text';
    billNameInput.name = 'billName';
    billNameInput.required = true;
    billDiv.appendChild(billNameInput);

    const costLabel = document.createElement('legend');
    costLabel.textContent = 'Cost';
    billDiv.appendChild(costLabel);

    const costInput = document.createElement('input');
    costInput.type = 'text';
    costInput.name = 'cost';
    costInput.required = true;
    billDiv.appendChild(costInput);

    billsContainer.appendChild(billDiv);
}

function addBillToTable(billName, cost) {
    const tableBody = document.getElementById('tableBody');
    const row = document.createElement('tr');

    const billCell = document.createElement('td');
    billCell.textContent = billName;
    const costCell = document.createElement('td');
    costCell.textContent = cost.toFixed(2);

    row.appendChild(billCell);
    row.appendChild(costCell);

    tableBody.appendChild(row);
}

function updateStats(totalCost) {
    ytdCost += totalCost;
    monthSaving = expense.salary - totalCost;
    ytdSavings += monthSaving;
    percentSavingYtd = (ytdSavings / expense.salary) * 100;

    document.getElementById('Month').innerText = totalCost.toFixed(2);
    document.getElementById('total').innerText = totalCost.toFixed(2);
    document.getElementById('savingMonth').innerText = monthSaving.toFixed(2);
    document.getElementById('std').innerText = ytdSavings.toFixed(2);
    document.getElementById('percentage').innerText = percentSavingYtd.toFixed(2);
}

function saveState() {
    localStorage.setItem('expense', JSON.stringify(expense));
    localStorage.setItem('ytdCost', ytdCost);
    localStorage.setItem('ytdSavings', ytdSavings);
    localStorage.setItem('monthSaving', monthSaving);
    localStorage.setItem('percentSavingYtd', percentSavingYtd);
}

function loadState() {
    if (localStorage.getItem('expense')) {
        expense = JSON.parse(localStorage.getItem('expense'));
        ytdCost = parseFloat(localStorage.getItem('ytdCost')) || 0;
        ytdSavings = parseFloat(localStorage.getItem('ytdSavings')) || 0;
        monthSaving = parseFloat(localStorage.getItem('monthSaving')) || 0;
        percentSavingYtd = parseFloat(localStorage.getItem('percentSavingYtd')) || 0;

        document.getElementById('salary').innerText = expense.salary.toFixed(2);
        expense.bills.forEach((billName, index) => {
            addBillToTable(billName, expense.costs[index]);
        });
    }
}

function addInitialBillEntry() {
    addBillEntry();
}




