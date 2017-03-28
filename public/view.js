$(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
  var newBurgerInput = $("input.burger");
  // Our new todos will go inside the todoContainer
  var burgerContainer = $(".burger-container");
  // Adding event listeners for deleting, editing, and adding todos
  // $(document).on("click", "button.delete", deleteTodo);
  // $(document).on("click", ".todo-item", editTodo);
  // $(document).on("keyup", ".todo-item", finishEdit);
  // $(document).on("blur", ".todo-item", cancelEdit);
  $(document).on("submit", "#todo-form", insertTodo);

  // Our initial todos array
  var burgers = [];

  // Getting todos from database when page loads
  getBurgers();

  // This function resets the todos displayed with new todos from the database
  function initializeRows() {
    burgerContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
      rowsToAdd.push(createNewRow(burgers[i]));
    }
    burgerContainer.prepend(rowsToAdd);
  }

  // This function grabs todos from the database and updates the view
  function getBurgers() {
    $.get("/api/burgers", function(data) {
      burgers = data;
      initializeRows();
    });
  }

  // // This function deletes a todo when the user clicks the delete button
  // function deleteTodo() {
  //   var id = $(this).data("id");
  //   $.ajax({
  //     method: "DELETE",
  //     url: "/api/burgers/" + id
  //   }).done(function() {
  //     getBurgers();
  //   });
  // }

  // // This function handles showing the input box for a user to edit a todo
  // function editBurger() {
  //   var currentBurger = $(this).data("burger");
  //   $(this).children().hide();
  //   $(this).children("input.edit").val(currentBurger.text);
  //   $(this).children("input.edit").show();
  //   $(this).children("input.edit").focus();
  // }

  //Here

  // // This function starts updating a todo in the database if a user hits the "Enter Key"
  // // While in edit mode
  // function finishEdit(event) {
  //   var updatedTodo;
  //   if (event.key === "Enter") {
  //     updatedTodo = {
  //       id: $(this).data("todo").id,
  //       text: $(this).children("input").val().trim()
  //     };
  //     $(this).blur();
  //     updateTodo(updatedTodo);
  //   }
  // }

  // // This function updates a todo in our database
  // function updateTodo(todo) {
  //   $.ajax({
  //     method: "PUT",
  //     url: "/api/todos",
  //     data: todo
  //   }).done(function() {
  //     getTodos();
  //   });
  // }

  // // This function is called whenever a todo item is in edit mode and loses focus
  // // This cancels any edits being made
  // function cancelEdit() {
  //   var currentTodo = $(this).data("todo");
  //   $(this).children().hide();
  //   $(this).children("input.edit").val(currentTodo.text);
  //   $(this).children("span").show();
  //   $(this).children("button").show();
  // }

  // This function constructs a todo-item row
  function createNewRow(todo) {
    var newInputRow = $("<li>");
    newInputRow.addClass("list-group-item burger-item");
    var newBurgerSpan = $("<span>");
    newBurgerSpan.text(burger.burger_name);
    newInputRow.append(newBurgerSpan);
    var newBurgerInput = $("<input>");
    newBurgerInput.attr("type", "text");
    newBurgerInput.addClass("edit");
    newBurgerInput.css("display", "none");
    newBurgerRow.append(newBurgerInput);
    var newDeleteBtn = $("<button>");
    newDeleteBtn.addClass("delete btn btn-default");
    newDeleteBtn.text("x");
    newDeleteBtn.data("id", todo.id);
    newInputRow.append(newDeleteBtn);
    newInputRow.data("burger", todo);
    return newInputRow;
  }

  // This function inserts a new todo into our database and then updates the view
  function insertTodo(event) {
    event.preventDefault();
    // if (!newItemInput.val().trim()) {
    //   return;
    // }
    var burger = {
      burger_name: newItemInput.val().trim(),
      devoured: false
    };

    $.post("/", burger, function() {
      getBurgers();
    });
    newItemInput.val("");
  }

});
