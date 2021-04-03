//Global Variables
let expenses = [];
let expensesSection = document.getElementById("expenses");

//Add to budget
function addToBudget() {
  let budgetValue = document.getElementById("inputBudgetBox").value;
  let displayBudget = (document.getElementById(
    "showBudgetValue"
  ).innerHTML = budgetValue);
  document.getElementById("inputBudgetBox").value = "";
}

//Create Expense Function
function createExpense() {
  let expenseDescription = document.getElementById("expenseDescription").value;
  let expenseValue = document.getElementById("inputExpenseBox").value;
  let expenseStorage = {
    // expenseId: expenses.length, //o ultimo que for criado vai ser sempre o tamanho do array
    expenseDescription: expenseDescription,
    expenseValue: parseInt(expenseValue),
  };
  expenses.push(expenseStorage);
  document.getElementById("inputExpenseBox").value = "";
  document.getElementById("expenseDescription").value = "";

  CreateExpenseHTMLInject();
}

//Create Expense HTML Inject
function CreateExpenseHTMLInject() {
  document
    .querySelectorAll(".ExpenseDiv")
    .forEach((Element) => Element.remove()); //remove o que já está impresso
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i] != expenses[i].expenseId) {
      let createNewDiv = document.createElement("div");
      createNewDiv.className = "ExpenseDiv";
      let createNewLine = document.createElement("p");
      createNewLine.className = "individualExpense";
      expensesSection.appendChild(createNewDiv);
      createNewDiv.appendChild(createNewLine);
      let newExpenseLine = document.createTextNode(
        "£" + expenses[i].expenseValue + " - " + expenses[i].expenseDescription
      );
      createNewLine.appendChild(newExpenseLine);
      createNewDiv.dataset.expenseNumber = i;
      createEditButton(createNewDiv);
      createDeleteButton(createNewDiv);
    }
  }
}

//Create Delete Button for Expense and add onClick event
function createDeleteButton(createNewDiv) {
  let createDeleteButton = document.createElement("button");
  createDeleteButton.className = "deleteButton";
  let editDeleteButtonText = document.createTextNode("Delete");
  createDeleteButton.appendChild(editDeleteButtonText);
  createNewDiv.appendChild(createDeleteButton);
  createDeleteButton.addEventListener("click", deleteExpense);
}

//Delete Expense Function
function deleteExpense(event) {
  let expenseId = event.target.parentElement.dataset.expenseNumber;
  expenses.splice(expenseId, 1);
  CreateExpenseHTMLInject();
}

function createEditButton(createNewDiv) {
  let createEditButton = document.createElement("button");
  createNewDiv.appendChild(createEditButton);
  createEditButton.className = "editButton";
  let editButtonText = document.createTextNode("Edit");
  createEditButton.appendChild(editButtonText);
  createEditButton.addEventListener("click", editExpense);
}

function createSaveButton() {
  let parentDivForSave = document.getElementById("inputExpenses");
  let saveButton = document.createElement("button");
  parentDivForSave.appendChild(saveButton);
  let saveButtonText = document.createTextNode("Save");
  saveButton.appendChild(saveButtonText);
  saveButton.addEventListener("click", saveExpenseEdit);
}
function editExpense(event) {
  let expenseId = event.target.parentElement.dataset.expenseNumber;
  document.getElementById("inputExpenseBox").value =
    expenses[expenseId].expenseValue;
  document.getElementById("expenseDescription").value =
    expenses[expenseId].expenseDescription;

  hideCalculateExpenseButton();
  createSaveButton();
}
//why can't I pass the expenseID (AKA the number)?!
function saveExpenseEdit(expenseId) {
  // expenses[expenseId].expenseDescription = document.getElementById(
  //   "expenseDescription"
  // ).value;
  // expenses[expenseId].expenseValue = document.getElementById(
  //   "inputExpenseBox"
  // ).value;

  console.log(expenseId);
}

function hideCalculateExpenseButton() {
  let calculateExpenseButton = document.getElementById(
    "calculateExpenseButton"
  );
  calculateExpenseButton.style.display = "none";
}
// function deleteExpense(event) {
//   let deleteButton = document.querySelectorAll(".deleteButton");

//   for (let i = 0; i <= deleteButton.length; i++) {
//     deleteButton[i].addEventListener("click", checkIndex(event));
//   }
// }

// deleteButton.forEach(function (removeExpenseCheckIndex) {
//   removeExpenseCheckIndex.addEventListener("click", removeExpenseCheckIndex);
// });

// function removeExpenseCheckIndex(event) {
//   let arrayIndex = Array.from(deleteButton).indexOf(event.target);
//   console.log(arrayIndex);
// }

// function editExistingExpense(expenses) {
//   let deleteExpenseButton = document.getElementsByClassName("deleteExpense");
//   let editExpenseButton = document.getElementsByClassName("editExpense");

//   for (let i = 0; i <= expenses.length; i++) {
//     if(expenses[i].expenseId == )
//   }
// }
