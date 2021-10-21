/* 
Description
This is the first try at a common program built by new developers, 
the todo list. You'll have to use everything we've covered so far 
in JS to tackle this challenge

Instructions
- Create an alert that lists all users, with their ids, 
names and what city they're from
- Prompt the user for a user id
- Display an alert with the username and all the todos titles 
that belong to that user 

Tips
- The user id creates an identifiable relationship with the todos
- Sometimes it's good to map some values into a new data structure

Challenge
After you select a user, add the option to either show the todos or 
add a new todo to the list

Challenge 2
Now that you can add a todo, add the option to either delete or update 
a todo. Add also the option to repeatedly choose a different user, or 
to finish the program
*/

let userData = [];
let userToDoList = [];
const askForId = "Insert your ID below:";
const errorMsgId = "Invalid ID. Please try again.";
let chosenId;
let validId = false;
let optionChosen;
let validOption = false;
let addToDo = false;
let showToDo = false;
let newTask;
let validTask = false;
const giveOption = "If you would like to see your ToDo list type in 1. If you would like to add a new item to the list, type in 2.";
const errorMsgOption = "Option incorrect. Please try again."
const addItem = "Please type in your new task:";
const errorMsgTask = "Invalid task. Please try again."
const errorMsgTaskDup = "This task is already on your list. Please add a new task.";

function strDisplayAlert (arr){
    let str = "";
    for(let i = 0; i < arr.length; i++){
        str += arr[i];
        str += "\n";
    }
    return str;
}

function isValidId(input){
    if(isNaN(input) || input === null || input === 0){
        alert(errorMsgId);
        return false;
    }
    else {
        if(input > 0 && input < users.length){
            return true;  
        }
        else{
            alert(errorMsgId);
            return false;
        }
    }
}

function isValidOption(input){
    if(isNaN(input) || input === null || input === 0){
        alert(errorMsgOption);
        return false;
    }
    else {
        if(input === 1 || input === 2){
            if(input === 1){
                showToDo = true;
            }
            else {
                addToDo = true;
            }
            return true;  
        }
        else{
            alert(errorMsgOption);
            return false;
        }
    }
}

function isValidTask(task, list){
    if(!isNaN(task) || task === null || task === 0){
        alert(errorMsgTask);
        return false;
    }
    else {
        for(let i = 0; i < list.length; i++){
            console.log(list[i]);
            console.log(list[i] === newTask);
            if(list[i] === newTask){
              alert(errorMsgTaskDup); 
              return false; 
            }
        }
        return true;
    }
}

for(let i = 0; i < users.length; i++){
    userData.push([users[i].id, users[i].name, users[i].address.city]);
}
alert(strDisplayAlert(userData));
do {
    chosenId = parseInt(prompt(askForId));
    validId = isValidId(chosenId);
} while (!validId);
console.log("ID: " + chosenId);

for (let i = 0; i < todos.length ; i++){
    if(todos[i].userId === chosenId){
        userToDoList.push(todos[i].title);
    }
}
do {
    optionChosen = parseInt(prompt(giveOption));
    validOption = isValidOption(optionChosen);    
} while (!validOption);
if(showToDo){
    alert(strDisplayAlert(userToDoList));
}
else if (addToDo) {
    do{
        newTask = prompt(addItem);
        validTask = isValidTask(newTask, userToDoList);    
    } while (!validTask);
    userToDoList.push(newTask);
}