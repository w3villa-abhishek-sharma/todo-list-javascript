console.log('Project 01 : Note App')

shwoNotes()


// Add Notes Function
let addbtn = document.getElementById('addBtn')
addbtn.addEventListener('click', function (e) {
    let textAdd = document.getElementById('textAreaInput')
    let titleTxt = document.getElementById('titleText')
    if (textAdd.value && titleTxt.value) {
        let notes = localStorage.getItem('notes')
        let title = localStorage.getItem('title')
        if (notes == null) {
            notesObj = []
            titleObj = []
        }
        else {
            notesObj = JSON.parse(notes)
            titleObj = JSON.parse(title)
        }
        notesObj.push(textAdd.value)
        titleObj.push(titleTxt.value)
        localStorage.setItem('notes', JSON.stringify(notesObj))
        localStorage.setItem('title', JSON.stringify(titleObj))
        textAdd.value = ''
        titleTxt.value = ''
        shwoNotes()
    }
})


//  Show All Notes Function
function shwoNotes() {
    let notes = localStorage.getItem('notes')
    let title = localStorage.getItem('title')
    if (notes != null) {
        notesObj = JSON.parse(notes)
        titleObj = JSON.parse(title)
        let html = ''
        notesObj.forEach(function (element, index) {
            html += `<div class="card cardNotes my-2 mx-2" style="width: 18rem;">
           <div class="card-body pe">
               <h5 class="card-title">${titleObj[index]}</h5>
               <p class="card-text">${element}</p>
               <button class="btn btn-primary" id="${index + 1}" onclick="removeNotes(this.id)">Remove Note</button>
               <button onclick="handleEditData(this)" type="button" id="${index + 1}" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Edit</button>
           </div>
       </div>`;

        })
        let notesElm = document.getElementById('notes')
        if (notesObj.length != 0) {
            notesElm.innerHTML = html;
        }
        else {
            notesElm.innerHTML = `<h4> -- Add Your Note --</h4>`
        }

    }
}

// Handle Edit Data 
const handleEditData = (self) =>{
    let notes = localStorage.getItem('notes')
    let title = localStorage.getItem('title')
    let notesObj = JSON.parse(notes)
    let  titleObj = JSON.parse(title)
    let taskName = document.getElementById('task-name');
    let taskDescription = document.getElementById('task-description');
    document.getElementById('update-btn').id= self.id;
    taskName.value = titleObj[Number(self.id) - 1]
    taskDescription.value = notesObj[Number(self.id) - 1]
}


// Handle Update Action Data 
const handleUpdateAction = (self) =>{
    let notes = localStorage.getItem('notes')
    let title = localStorage.getItem('title')
    let notesObj = JSON.parse(notes)
    let  titleObj = JSON.parse(title)
    let taskName = document.getElementById('task-name');
    let taskDescription = document.getElementById('task-description');
    titleObj[Number(self.id) - 1] = taskName.value
    notesObj[Number(self.id) - 1] = taskDescription.value 
    localStorage.setItem('notes', JSON.stringify(notesObj))
    localStorage.setItem('title', JSON.stringify(titleObj))
    shwoNotes();
    document.getElementById("close").click();
}


// Searching Notes Function
let search = document.getElementById('search')
search.addEventListener('input', function (e) {
    let notes = localStorage.getItem('notes')
    // If Local Storage is Empty Function Not Run 
    if (notes != '[]') {
        let searchTxt = search.value.toLowerCase()
        let cards = document.getElementsByClassName('cardNotes')
        let notfound = true
        Array.from(cards).forEach(function (element) {
            cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase()
            cardTitle = element.getElementsByTagName('h5')[0].innerText.toLowerCase()
            if ((cardTxt.includes(searchTxt)) || (cardTitle.includes(searchTxt))) {
                element.style.display = 'block'
                notfound = false
            }
            else {
                element.style.display = 'none'
            }
        })

        let notFoundSearch = document.getElementById('notFound')
        if (notfound) {
            notFoundSearch.innerHTML = `<h2> -- Not Found -- </h2>`
        }
        else {
            notFoundSearch.innerHTML = ``
        }
    }
})



// Remove Notes Function
function removeNotes(indexOfDeleteItem) {
    let notes = localStorage.getItem('notes')
    let title = localStorage.getItem('title')
    if ((notes != null) && (title != null)) {
        let filterNoteObj = []
        let filterTitleObj = []
        notesObj = JSON.parse(notes)
        titleObj = JSON.parse(title)
        notesObj.forEach(function (element, index) {
            if (index != indexOfDeleteItem - 1) {
                filterNoteObj.push(element)
                filterTitleObj.push(titleObj[index])
            }
        })
        localStorage.setItem('notes', JSON.stringify(filterNoteObj))
        localStorage.setItem('title', JSON.stringify(filterTitleObj))
        shwoNotes()
    }
}


