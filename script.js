// DOM Elements.
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const sampleTransactions = [
  { id: 1, text: "Flowers", amount: -20 },
  { id: 2, text: "Gift", amount: 300 },
  { id: 3, text: "Magazine", amount: -10 },
  { id: 4, text: "Textbook", amount: 150 },
];

let transactions = sampleTransactions;

// Function to add transaction.
addTransaction = (event) => {
  event.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    // Gets the snackbar.
    const notification = document.getElementById("snackbar");

    // Adds the "show" class to snackbar.
    notification.className = "show";

    // After 3 seconds, removes the show class from snackbar.
    setTimeout(() => {
      notification.className = notification.className.replace("show", "");
    }, 3000);
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionToDOM(transaction);

    updateValues();

    text.value = "";
    amount.value = "";
  }
};

// Function to generate a random ID.
generateID = () => {
  return Math.floor(Math.random() * 100000000);
};

// Function to add transaction to DOM list.
addTransactionToDOM = (transaction) => {
  // Gets sign of the amount dependent on if the number is less than or greater than zero.
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Adds class based on negative or positive value.
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn">x</button>`;

  list.appendChild(item);
};

// Function to update the balance, income, and expense.
updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
};

// Function to initialize application.
init = () => {
  list.innerHTML = "";

  transactions.forEach(addTransactionToDOM);
  updateValues();
};

init();

// Event listener for the submit button.
form.addEventListener("submit", addTransaction);
