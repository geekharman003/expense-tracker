// this event listener fetches data from localstorage on page load
document.addEventListener("DOMContentLoaded", function () {
  const ul = document.getElementById("expense-list");
  for (let i = 0; i < localStorage.length; i++) {
    const jsonObj = localStorage.getItem(localStorage.key(i));
    const parsedObj = JSON.parse(jsonObj);

    const newLi = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Expense";
    deleteBtn.id = parsedObj.id;
    deleteBtn.style.marginRight = "3px";
    deleteBtn.addEventListener("click", function () {
      deleteExpense(deleteBtn.id, newLi);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit Expense";
    editBtn.id = parsedObj.id;
    editBtn.addEventListener("click", function (event) {
      editForm(event);
    });

    span.textContent = `${parsedObj.amount} ${parsedObj.description} ${parsedObj.category}`;
    newLi.appendChild(span);
    newLi.appendChild(deleteBtn);
    newLi.appendChild(editBtn);
    ul.appendChild(newLi);
  }
});

//this function gets called on form submittion.
function handleSubmit(event) {
  event.preventDefault();
  let expenseAmount = event.target.elements[0].value;
  let expenseDescription = event.target.elements[1].value;
  let expenseCategory = event.target.elements[2].value;

  const addExpenseBtn = document.getElementById("add-expense-btn");
  if (addExpenseBtn.textContent === "Update Expense") {
    updateExpense(expenseAmount, expenseDescription, expenseCategory);
  } else {
    addExpense(expenseAmount, expenseDescription, expenseCategory);
  }
}

//this function is responsible for adding new li on dom and localstorage
function addExpense(amount, description, category) {
  const ul = document.getElementById("expense-list");
  const id = Date.now();

  const newLi = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete Expense";
  deleteBtn.id = id;
  deleteBtn.style.marginRight = "3px";
  deleteBtn.addEventListener("click", function () {
    deleteExpense(deleteBtn.id, newLi);
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit Expense";
  editBtn.id = id;
  editBtn.addEventListener("click", function (event) {
    editForm(event);
  });

  span.textContent = `${amount} ${description} ${category}`;
  newLi.appendChild(span);
  newLi.appendChild(deleteBtn);
  newLi.appendChild(editBtn);
  ul.appendChild(newLi);

  const obj = {
    id: id,
    amount: amount,
    description: description,
    category: category,
  };

  localStorage.setItem(id, JSON.stringify(obj));
}

//this function is responsible for deleting the li from the dom and localstorage
function deleteExpense(id, li) {
  localStorage.removeItem(id);

  li.remove();
}

//this function is responsible to fill form input fields with that particular id.
let clickedEditBtn = undefined;
let editExpenseId = undefined;
function editForm(event) {
  const form = document.getElementById("expense-form");
  const addExpenseBtn = document.getElementById("add-expense-btn");
  const jsonObj = localStorage.getItem(event.target.id);
  const parsedObj = JSON.parse(jsonObj);

  const newExpenseAmount = parsedObj.amount;
  const newExpenseDescription = parsedObj.description;
  const newExpenseCategory = parsedObj.category;

  form.elements[0].value = newExpenseAmount;
  form.elements[1].value = newExpenseDescription;
  form.elements[2].value = newExpenseCategory;
  addExpenseBtn.textContent = "Update Expense";
  clickedEditBtn = event;
  editExpenseId = event.target.id;
}

//this function is responsible for updating the expense details
function updateExpense(expenseAmount, expenseDescription, expenseCategory) {
  clickedEditBtn.target.parentElement.firstElementChild.textContent = `${expenseAmount} ${expenseDescription} ${expenseCategory}`;
  const obj = {
    id: editExpenseId,
    amount: expenseAmount,
    description: expenseDescription,
    category: expenseCategory,
  };

  localStorage.setItem(editExpenseId, JSON.stringify(obj));
  const addExpenseBtn = document.getElementById("add-expense-btn");
  addExpenseBtn.textContent = "Add Expense";
}
