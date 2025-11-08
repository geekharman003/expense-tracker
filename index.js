function handleSubmit(event){
    event.preventDefault();
    let expenseAmount = event.target.elements[0].value;
    let expenseDescription = event.target.elements[1].value;
    let expenseCategory = event.target.elements[2].value;

    addExpense(expenseAmount,expenseDescription,expenseCategory);
}

function addExpense(amount,description,category){
    const ul = document.getElementById("expense-list");
    const id = Date.now(); 
    const newLi = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Expense";
    deleteBtn.id = id;
    deleteBtn.style.marginRight = "3px";
    deleteBtn.addEventListener('click',function(){
        deleteExpense(deleteBtn.id,newLi);
    })
    
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit Expense";
    editBtn.id = id;
    newLi.textContent = `${amount} ${description} ${category}`;
    newLi.appendChild(deleteBtn);
    newLi.appendChild(editBtn);
    ul.appendChild(newLi);

    let obj = {
        id: id,
        amount: amount,
        description: description,
        category: category
    }

    localStorage.setItem(id,JSON.stringify(obj));
}

function deleteExpense(id,li){
    localStorage.removeItem(id);
    // console.log(id,li);

    li.remove();
}
