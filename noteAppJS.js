console.log("Project 01 : Note App");

shwoNotes();

// Add Notes Function
let addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function (e) {
  let textAdd = document.getElementById("textAreaInput");
  let titleTxt = document.getElementById("titleText");
  let notesObj;
  if (!titleTxt.value.length && !textAdd.value.length) {
    alert("Please Add Task title and description");
  }else if (!titleTxt.value.length) {
    alert("Please Add Task title");
  }else if (!textAdd.value.length) {
    alert("Please Add Task Description");
  }
  if (textAdd.value && titleTxt.value) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push({
      title: titleTxt.value,
      note: textAdd.value,
      date: new Date(),
    });
    localStorage.setItem("notes", JSON.stringify(notesObj));
    textAdd.value = "";
    titleTxt.value = "";
    shwoNotes();
  }
});

// Convert Date Formate
function dateFormate(inputDate) {
  let date = new Date(inputDate).getDate();
  let month = Number(new Date(inputDate).getMonth()) + 1;
  let year = new Date(inputDate).getFullYear();
  let hour = new Date(inputDate).getHours();
  let min = new Date(inputDate).getMinutes();
  // -  ${Math.floor(hour/2)}:${min}
  return `${date}/${month}/${year}`;
}

//  Show All Notes Function
function shwoNotes() {
  let notes = localStorage.getItem("notes");
  if (notes != null) {
    notesObj = JSON.parse(notes);
    let html = "";
    notesObj.forEach(function (element, index) {
      html += `<div class="card cardNotes my-2 mx-2" style="">
                    <div class="card-body pe" style="display:flex;justify-content:space-between;">
                        <div style="width:92%;">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.note}</p>
                            <span style="color: grey;ont-size: .8rem;">${dateFormate(
                              element.date
                            )}</span>
                        </div>
                        <div>
                            <button class="btn btn-primary" id="${index}" onclick="removeNotes(this.id)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                            <button onclick="handleEditData(this)" type="button" id="${index}" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><i class="fa-solid fa-pen-to-square"></i></button>
                        </div>
                    </div>                                           
                </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length) {
      notesElm.innerHTML = html;
    } else {
      notesElm.innerHTML = `<h4> -- Add Your Note --</h4>`;
    }
  }
}

// Handle Edit Data
const handleEditData = (self) => {
  let notes = localStorage.getItem("notes");
  let notesObj = JSON.parse(notes);
  let taskName = document.getElementById("task-name");
  let taskDescription = document.getElementById("task-description");
  document.getElementsByClassName("update-btn")[0].id = self.id;
  taskName.value = notesObj[self.id].title;
  taskDescription.value = notesObj[self.id].note;
};

// Handle Update Action Data
const handleUpdateAction = (self) => {
  let notes = localStorage.getItem("notes");
  let notesObj = JSON.parse(notes);
  let taskName = document.getElementById("task-name");
  let taskDescription = document.getElementById("task-description");
  notesObj[Number(self.id)].title = taskName.value;
  notesObj[Number(self.id)].note = taskDescription.value;
  notesObj[Number(self.id)].date = new Date();
  localStorage.setItem("notes", JSON.stringify(notesObj));
  shwoNotes();
  document.getElementById("close").click();
};

// Searching Notes Function
let search = document.getElementById("search");
search.addEventListener("input", function (e) {
  let notes = localStorage.getItem("notes");
  // If Local Storage is Empty Function Not Run
  if (notes != "[]") {
    let searchTxt = search.value.toLowerCase();
    let cards = document.getElementsByClassName("cardNotes");
    let notfound = true;
    Array.from(cards).forEach(function (element) {
      cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
      cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
      if (cardTxt.includes(searchTxt) || cardTitle.includes(searchTxt)) {
        element.style.display = "block";
        notfound = false;
      } else {
        element.style.display = "none";
      }
    });

    let notFoundSearch = document.getElementById("notFound");
    if (notfound) {
      notFoundSearch.innerHTML = `<h2> -- Not Found -- </h2>`;
    } else {
      notFoundSearch.innerHTML = ``;
    }
  }
});

// Remove Notes Function
function removeNotes(indexOfDeleteItem) {
  let notes = localStorage.getItem("notes");
  if (notes != null) {
    let filterNoteObj = [];
    notesObj = JSON.parse(notes);
    notesObj.forEach(function (element, index) {
      if (index != indexOfDeleteItem) {
        filterNoteObj.push(element);
      }
    });
    localStorage.setItem("notes", JSON.stringify(filterNoteObj));
    shwoNotes();
  }
}
