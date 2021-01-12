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

// Function to initialize application.
init = () => {
  list.innerHTML = "";

  transactions.forEach(addTransactionToDOM);
};

init();
