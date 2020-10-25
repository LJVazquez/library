let library = [];

class Task{
    constructor(name, description, id){
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

function addToLibrary(input){
    library.push(input);
}


function addTask(task){
    let defaultCard = $(`<div class="col-3"><div class="card p-2"><h5 class="card-title">${task.name}</h5><p class="card-text">${task.description}</p><button class="btn btn-info">Estado</button><button class="btn btn-danger">Borrar</button></div></div>`);
    $('[data-cards]').append(defaultCard).append(defaultCard);
}


// pruebaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
let cabra = new Task('cabras', 'perros', 0)
addToLibrary(cabra)
displayTasks()


function displayTasks(){
    for (let i in library){
        addTask(library[i]);
    }
}

function expandForm(){

    $('[data-newtask="expand-btn"]').click(function () { 
        $('[data-newtask="form"]').toggle(500);
    });
}

function createCard(){
    let title = $('[data-newtask="title-input"]');
    let desc = $('[data-newtask="description-input"]');
    let btn = $('[data-newtask="create"]')
    let id = 0;
    
    $(btn).click(function (e) { 
        e.preventDefault();

        let newTask = new Task(title.val(), desc.val(), id);
        id++;
        addToLibrary(newTask)
        displayTasks();
    });


}

createCard()
expandForm()

$('#test').click(function(){
    console.table(library)
})

$('#test2').click(displayTasks)