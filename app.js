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
    let defaultCard = 
    $(`<div class="col-3" data-id="${task.id}">
        <div class="card p-2">
            <h5 class="card-title">${task.name}</h5>
            <p class="card-text">${task.description}</p>
            <button class="btn btn-info" data-card="status">Estado</button>
            <button class="btn btn-danger" data-card="del">Borrar</button>
        </div>
    </div>`);

    $('[data-cards]').append(defaultCard).append(defaultCard);
}


function displayTasks(){
    for (let i in library){
        let div = document.querySelector(`[data-id="${library[i]['id']}"]`);
        if (!div){
            addTask(library[i]);
        }
    }
}

function expandForm(){

    $('[data-newtask="expand-btn"]').click(function () { 
        $('[data-newtask="form"]').toggle(500);
    });
}

function createCard(){
    //------------crear nueva tarjeta-----------//

    let title = $('[data-newtask="title-input"]');
    let desc = $('[data-newtask="description-input"]');
    let btn = $('[data-newtask="create"]')
    let id = 0;
    
    $(btn).click(function (e) { 
        e.preventDefault(); // para que no funcione como un submit
        let newTask = new Task(title.val(), desc.val(), id);
        id++; //id va a seguir subiendo mientras se agreguen tareas
        addToLibrary(newTask)
        displayTasks();

//------------funcion boton borrar-----------//
// elimina elemento de la libreria y al parent del boton
        let delBtns = document.querySelectorAll('[data-card="del"]');
        delBtns.forEach( (element)=>{
            element.addEventListener('click', ()=>{
                let parentElem = element.parentElement.parentElement;
                console.log(parentElem.dataset.id)
                // library.splice(parentElem.dataset.id, 1);
                // parentElem.remove();
            })
        })
    });
}










//---------------------------------------------------//

createCard()
expandForm()

$('#test').click(function(){
    console.table(library)
    
})

$('#test2').click(function(){
    console.table(delBtns)
    
})