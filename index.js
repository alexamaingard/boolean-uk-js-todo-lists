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
let activeProgram = false;
const askForId = "Insert your ID below:";
let chosenId;
let validId = false;
let optionChosen;
let validOption = false;
let addToDo = false;
let indexCount = 0;
let showToDo = false;
let modifyToDo = false;
let toModify;
let validModify = false;
let deleteToDo = false;
let toDelete;
let indexDeleteCount = 0;
let validDelete = false;
let newTask;
let validTask = false;
const options = 
[
    { // 0
        number: 1,
        text: "If you would like to see your ToDo list type in 1."
    },
    { // 1
        number: 2,
        text: "If you would like to add a new item to the list, type in 2.",
        action: "Please type in your new task:",
        success: "Task added successfully!"
    },
    { // 2
        number: 3,
        text: "If you would like to update a pre-existing item, type in 3.",
        action: "Please type in the task you would like to update as done: ",
        success: "Status changed to: completed."
    },
    { // 3
        number: 4,
        text: "To delete a pre-existing item, type in 4.",
        action: "Please type in the name of the task you would like to delete:",
        success: "Task was deleted successfully!"
    }
];
const errors = [
    { // 0
        type: 'id',
        text: "Invalid ID. Please try again."
    },
    { // 1
        type: 'option',
        text: "Option incorrect. Please try again."
    },
    { // 2
        type: 'task',
        text: "Invalid task. Please try again."
    },
    { // 3
        type: 'duplicate',
        text: "This task is already on your list. Please add a new task."
    }
];

function strDisplayAlert (arr){
    let str = "";
    for(let i = 0; i < arr.length; i++){
        str += arr[i];
        str += "\n";
    }
    return str;
}

function strDisplayOptions (arr) {
    let str = "";
    for(let i = 0; i < arr.length; i++){
        str += arr[i].text;
        str += "\n";
    }
    return str;
}

function askId() {
    activeProgram = confirm(strDisplayAlert(userData));
    if (!activeProgram){
        alert("See you soon!");
    }
    else{
        do {
            chosenId = parseInt(prompt(askForId));
            validId = isValidId(chosenId);
        } while (!validId); 
    }

}

function isValidId(input){
    if(isNaN(input) || input === null || input === 0){
        alert(errors[1].text);
        return false;
    }
    else {
        if(input > 0 && input < users.length){
            return true;  
        }
        else{
            alert(errors[0].text);
            return false;
        }
    }
}

function isValidOption(input){
    if(isNaN(input) || input === null || input === 0){
        alert(errors[1].text);
        return false;
    }
    else {
        if(input > 0 && input < 5){
            switch(input){
                case 1: 
                    showToDo = true;
                    break;
                case 2:
                    addToDo = true;
                    break;
                case 3:
                    modifyToDo = true;
                    break;
                case 4:
                    deleteToDo = true;
                    break;
            }
            return true;
        }
        else{
            alert(errors[1].text);
            return false;
        }
    }
}

function isValidTask(task, list){
    if(!isNaN(task) || task === null || task === 0){
        alert(errors[2].text);
        return false;
    }
    else {
        if (isDuplicate(task, list)){
            alert(errors[3].text); 
            return false;   
        }
        return true;
    }
}

function isDuplicate(task, list){
    for(let i = 0; i < list.length; i++){
        if(list[i] === task){ 
          return true; 
        }
    }
}

function resetAll () {
    userToDoList = [];
    chosenId = 0;
    validId = false;
    optionChosen = 0;
    validOption = false;
    addToDo = false;
    indexCount = 0;
    showToDo = false;
    modifyToDo = false;
    toModify = 0;
    validModify = false;
    deleteToDo = false;
    toDelete = 0;
    validDelete = false;
    newTask = 0;
    validTask = false;
}

for(let i = 0; i < users.length; i++){
    userData.push([users[i].id, users[i].name, users[i].address.city]);
}

askId();
do {
    for (let i = 0; i < todos.length ; i++){
        indexCount++;
        if(todos[i].userId === chosenId){
            userToDoList.push(todos[i].title);
        }
        else{
            break;
        }
        console.log(indexCount);
    }
    do {
        optionChosen = parseInt(prompt(strDisplayOptions(options)));
        validOption = isValidOption(optionChosen);    
    } while (!validOption);
    if(showToDo){
        alert(strDisplayAlert(userToDoList));
    }
    else if (addToDo) {
        do{
            newTask = prompt(options[1].action);
            validTask = isValidTask(newTask, userToDoList);    
        } while (!validTask);
        const newToDo = {
            userId: chosenId,
            id: (indexCount-1), 
            title: newTask,
            completed: false
        };
        console.log(newToDo);
        todos.splice((indexCount-1), 0, newToDo);
        for(let i = indexCount; i < todos.length; i++){
            todos[i].id ++;
        }
        alert(options[1].success);
    }
    else if (modifyToDo) {
        do {
            toModify = prompt(options[2].action);
            validModify = isDuplicate(toModify, userToDoList);
        } while (!validModify);
        for(let i = 0; i < indexCount; i++){
            if(toModify === todos[i].title){
                todos[i].completed = true;
                alert(options[2].success);
                break;
            }
        }
    }
    else if (deleteToDo) {
        do {
            toDelete = prompt(options[3].action);
            validDelete = isDuplicate(toDelete, userToDoList);
        } while (!validDelete);
        for(let i = 0; i < indexCount; i++){
            if(toDelete != todos[i].title){
                indexDeleteCount ++;
            }
            else{
                break;
            }
        }
        todos.splice(indexDeleteCount, 1);
        alert(options[3].success);
    }
    resetAll();
    askId();
} while(activeProgram);