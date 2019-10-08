let getLocal = () => {
  if (localStorage.getItem("item") === null) {
    let text = [
      {
        description: "",
        status: ""
      }
    ];
    return text;
  } else return JSON.parse(localStorage.getItem("item"));
};

let toDoList = getLocal();
let removeList = [];

function addToList() {
  const input = document.getElementById("inputVal").value;
  if (input == "") return;
  const item = { description: input, status: false }; //create a todo item with undone status
  toDoList.push(item);
  saveLocal(toDoList);
  //render todolist to screen
  render(toDoList);
  //   doneList = toDoList;
  document.getElementById("inputVal").value = "";
}

const render = status => {

  //render everything
  const todo = toDoList
    .map((item, i) => {
      if (item.status == false && item.description != "") {
        return `<div class="${item.status ? "done" : "undone"}">
            <div class="description" onclick="toggleStatus(${i})">${
          item.description
        }</div>
            <div><button class="btn btn-dark" onclick="removeItem(${i})">X</button></div>
        </div>`;
      }
    })
    .join("");

  const done = toDoList
    .map((item, i) => {
      if (item.status == true && item.description != "") {
        return `<div class="${item.status ? "done" : "undone"}">
        <div class="description" onclick="toggleStatus(${i})">${
          item.description
        }</div>
        
    </div>`;
      }
    })
    .join("");

  document.getElementById("todo-list").innerHTML = todo;
  document.getElementById("done-list").innerHTML = done;
};

const removeItem = i => {
  toDoList[i].status = "deleted";

  //save to local
  saveLocal(toDoList);

  render();
};

//switch status: Done or not Done
const toggleStatus = i => {
  let currStatus = toDoList[i].status;
  toDoList[i].status = !currStatus;
  console.log("toggle");

  //save to local
  saveLocal(toDoList);

  render();
  //   render(doneList);
};

const showDeleted = () => {
    let deleted = toDoList.map ( item => {
        if(item.status == "deleted")
        return `<li>${item.description}</li>`
    }).join("");

    document.getElementById('deleted-item').innerHTML = deleted;
}

//get local storage
render();
//save local
const saveLocal = obj => {
  let test = JSON.stringify(obj);
  console.log(test);
  return JSON.stringify(localStorage.setItem("item", test));
};
