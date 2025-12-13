const BASE_URL = "http://localhost:3000/expenses";
let liToUpdate = null; //represents the list item that we want to update
let idToUpdate = null; //represents the list item id that we want to update
let isEditMode = false; //tells whether the user clicked on edit button or not

// this event listener fetches data from database on page load
document.addEventListener("DOMContentLoaded", function () {
  axios.get(BASE_URL).then((response) => {
    const expenses = response.data;
    for (let i = 0; i < expenses.length; i++) {
      createListItem(
        expenses[i].id,
        expenses[i].expenseAmount,
        expenses[i].expenseDescription,
        expenses[i].expenseCategory
      );
    }
  });
});

//this function gets called on form submittion and based on the isEditMode particular function will be called
function handleSubmit(event) {
  event.preventDefault();
  let expenseAmount = event.target.expenseAmount.value;
  let expenseDescription = event.target.expenseDescription.value;
  let expenseCategory = event.target.expenseCategory.value;

  if (isEditMode) {
    updateExpense(expenseAmount, expenseDescription, expenseCategory);
  } else {
    addExpense(expenseAmount, expenseDescription, expenseCategory);
  }
}

//this function is responsible for adding expense item to the dom and database
function addExpense(amount, description, category) {
  axios
    .post(`${BASE_URL}/add`, {
      expenseAmount: amount,
      expenseCategory: category,
      expenseDescription: description,
    })
    .then((response) => {
      const id = response.data;
      createListItem(id, amount, description, category);
      document.getElementById("expense-form").reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

//this function is responsible for deleting the expense item from the dom and database
function deleteExpense(id, li) {
  axios
    .delete(`${BASE_URL}/delete/${id}`)
    .then((response) => {
      console.log(response.data);
      li.remove();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// this function creates the list item on the frontend
function createListItem(id, amount, description, category) {
  const ul = document.getElementById("expense-list");

  const newLi = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete Expense";
  deleteBtn.style.marginRight = "3px";
  deleteBtn.addEventListener("click", function () {
    deleteExpense(id, newLi);
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit Expense";
  editBtn.addEventListener("click", function (event) {
    editForm(id, event);
  });

  span.textContent = `${amount} ${description} ${category}`;
  newLi.appendChild(span);
  newLi.appendChild(deleteBtn);
  newLi.appendChild(editBtn);
  ul.appendChild(newLi);
}
//this function is responsible to fill form input fields with the list item the user wants to update.
function editForm(id, event) {
  idToUpdate = id;
  isEditMode = true;
  const form = document.getElementById("expense-form");
  const addExpenseBtn = document.getElementById("add-expense-btn");
  axios.get(`${BASE_URL}/${id}`).then((response) => {
    const expenseDetails = response.data;
    const newExpenseAmount = expenseDetails.expenseAmount;
    const newExpenseDescription = expenseDetails.expenseDescription;
    const newExpenseCategory = expenseDetails.expenseCategory;

    form.elements[0].value = newExpenseAmount;
    form.elements[1].value = newExpenseDescription;
    form.elements[2].value = newExpenseCategory;
    addExpenseBtn.textContent = "Update Expense";
    liToUpdate = event.target.parentElement;
  });
}

//this function is responsible for updating the expense details
function updateExpense(expenseAmount, expenseDescription, expenseCategory) {
  axios
    .put(`${BASE_URL}/update/${idToUpdate}`, {
      expenseAmount,
      expenseDescription,
      expenseCategory,
    })
    .then((response) => {
      liToUpdate.firstElementChild.textContent = `${expenseAmount} ${expenseDescription} ${expenseCategory}`;
      idToUpdate = null;
      liToUpdate = null;
      isEditMode = false;
    })
    .catch((error) => {
      console.log(error.message);
    });

  const addExpenseBtn = document.getElementById("add-expense-btn");
  addExpenseBtn.textContent = "Add Expense";
  document.getElementById("expense-form").reset();
}
