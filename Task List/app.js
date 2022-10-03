// define ui var
const form = document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();  

// load all event listeners
function loadEventListeners() {
  // add task event
  form.addEventListener('submit',addTask);  
  //remove tasks
  taskList.addEventListener('click',removeTask);
  //clear tasks
  clearBtn.addEventListener('click',clearTasks);
  //filter tasks
filter.addEventListener('keyup',filterTasks);
//dom load event
document.addEventListener('DOMContentLoaded',getTasks);
}
//get tasks from LS
function getTasks(){
  let tasks;
if(localStorage.getItem('tasks')=== null){
  tasks = [];
}else{
  tasks =  JSON.parse(localStorage.getItem('tasks'));
}
tasks.forEach(function(task) {
// Create li element
const li =document.createElement('li');
// Add class
 li.className ='collection-item';
 // create text node and append to li
 li.appendChild(document.createTextNode(task));
 // create new link element
 const link = document.createElement('a');
 // Add class
link.className = 'delete-item secondary-content';
// Add icom htmi
link.innerHTML = '<i class="fa fa-remove"></i>';
// Append the link to li
li.appendChild(link);

// Append li to ul
taskList.appendChild(li);
});
}

// addtask() 
 function addTask(e){
if(taskInput.value === ''){
alert('add a task');

}
// Create li element
const li =document.createElement('li');
// Add class
 li.className ='collection-item';
 // create text node and append to li
 li.appendChild(document.createTextNode(taskInput.value));
 // create new link element
 const link = document.createElement('a');
 // Add class
link.className = 'delete-item secondary-content';
// Add icom htmi
link.innerHTML = '<i class="fa fa-remove"></i>';
// Append the link to li
li.appendChild(link);

// Append li to ul
taskList.appendChild(li);
//store in local storage
storeTaskInLocalStorage(taskInput.value);
//clear input
taskInput.value = '';
//console.log(li);
e.preventDefault();
} 
function storeTaskInLocalStorage(task){
let tasks;
if(localStorage.getItem('tasks')=== null){
  tasks = [];
}else{
  tasks =  JSON.parse(localStorage.getItem('tasks'));
}

tasks.push(task); 
localStorage.setItem('tasks',JSON.stringify(tasks));
}


// Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('are you Sure?')){
e.target.parentElement.parentElement.remove();
//remove from ls
removeTaskFromLocalStorage(e.target.parentElement.parentElement);

      } 
    }

}
//remove from ls
function removeTaskFromLocalStorage(taskItem){
 let tasks;
if(localStorage.getItem('tasks')=== null){
  tasks = [];
}else{
  tasks =  JSON.parse(localStorage.getItem('tasks'));
}
tasks.forEach(function(task,index){
if(taskItem.textContent===task){
tasks.splice(index,1);
}
});
localStorage.setItem('tasks',JSON.stringify(tasks));
}
//clear Tasks
function clearTasks(){
 //   taskList.innerHTML = '';
while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
}
//clear from LS
clearTasksFromLocalStorage();
}
//clear from ls
function clearTasksFromLocalStorage(){
  localStorage.clear();
}
//filter tasks

function filterTasks  (e){ 
 const text = e.target.value;
// console.log(text);
 document.querySelectorAll('.collection-item').forEach(
    function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display = 'block';
        }else{
        task.style.display = 'none';
        }
    } 
 );

}  