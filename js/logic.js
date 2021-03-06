//Global Variables
let expenses = [];
let expensesSection = document.getElementById("expenses");
let budget;
//Add to budget
function addToBudget() {
  budget = document.getElementById("inputBudgetBox").value;
  document.getElementById("showBudgetValue").innerHTML = budget;
  document.getElementById("inputBudgetBox").value = "";
  CreateExpenseHTMLInject();
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
  sumExpenses();
  CreateExpenseHTMLInject();
}
//create edit button when an expense is created
function createEditButton(createNewDiv) {
  let createEditButton = document.createElement("button");
  createNewDiv.appendChild(createEditButton);
  createEditButton.className = "editButton";
  let editButtonText = document.createTextNode("Edit");
  createEditButton.appendChild(editButtonText);
  createEditButton.addEventListener("click", editExpense);
}

//Create save button when edit expense is clicked
function createSaveButton(expenseId) {
  if (document.getElementById("saveButton") == null) {
    let parentDivForSave = document.getElementById("inputExpenses");
    let saveButton = document.createElement("button");
    parentDivForSave.appendChild(saveButton);
    let saveButtonText = document.createTextNode("Save");
    saveButton.appendChild(saveButtonText);
    saveButton.addEventListener("click", saveExpenseEdit);
    saveButton.dataset.expenseId = expenseId;
    saveButton.setAttribute("id", "saveButton");
  }
}
//Updates the array expenses when people edit an expense
function editExpense(event) {
  let expenseId = event.target.parentElement.dataset.expenseNumber;
  document.getElementById("inputExpenseBox").value =
    expenses[expenseId].expenseValue;
  document.getElementById("expenseDescription").value =
    expenses[expenseId].expenseDescription;
  hideCalculateExpenseButton();
  createSaveButton(expenseId);
}

//Function that updates the expenses array when any of the values is updated
function saveExpenseEdit(event) {
  let expenseId = event.target.getAttribute("data-expense-id");
  console.log(expenseId);
  expenses[expenseId].expenseDescription = document.getElementById(
    "expenseDescription"
  ).value;
  expenses[expenseId].expenseValue = document.getElementById(
    "inputExpenseBox"
  ).value;
  document.getElementById("inputExpenseBox").value = "";
  document.getElementById("expenseDescription").value = "";

  CreateExpenseHTMLInject();
  deleteSaveButton();
}

//hides the calculate button when an expense is being edited.
function hideCalculateExpenseButton() {
  let calculateExpenseButton = document.getElementById(
    "calculateExpenseButton"
  );
  calculateExpenseButton.style.display = "none";
}

//deletes save button after expense has been edited, displays the submit button again for input another expense.
function deleteSaveButton() {
  let saveButton = document.getElementById("saveButton");
  saveButton.parentNode.removeChild(saveButton);
  calculateExpenseButton.style.display = "inline-block";
}

// adds all the expensesValue in the expenses Array
function sumExpenses() {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total = total + expenses[i].expenseValue;
  }
  return total;
}

function totalBalanceAfterExpenses() {
  let balance = budget - sumExpenses();
  return balance;
} // check if this function is correct

//Create Expense HTML Inject
function CreateExpenseHTMLInject() {
  document
    .querySelectorAll(".ExpenseDiv")
    .forEach((Element) => Element.remove()); //remove o que j?? est?? impresso

  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i] != expenses[i].expenseId) {
      let createNewDiv = document.createElement("div");
      createNewDiv.className = "ExpenseDiv";
      let createNewLine = document.createElement("p");
      createNewLine.className = "individualExpense";
      expensesSection.appendChild(createNewDiv);
      createNewDiv.appendChild(createNewLine);
      let newExpenseLine = document.createTextNode(
        "??" + expenses[i].expenseValue + " - " + expenses[i].expenseDescription
      );
      createNewLine.appendChild(newExpenseLine);
      createNewDiv.dataset.expenseNumber = i;
      createEditButton(createNewDiv);
      createDeleteButton(createNewDiv);
    }
  }

  let showTotal = document.getElementById("totalExpensesSum");
  showTotal.innerHTML = sumExpenses();
  let showBalance = document.getElementById("showBalanceValue");
  showBalance.innerHTML = totalBalanceAfterExpenses();
}
