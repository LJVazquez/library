let incompleteTasks = [];
let completedTasks = [];

class Task{
    constructor(name, description){
        this.name = name;
        this.description = description;
    }
}

//localStorage.clear()

function updateLocalStorage(){
    localStorage.setItem('incompleteTasks', JSON.stringify(incompleteTasks)); 
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function retrieveFromLocalStorage(){
    if (localStorage.getItem('incompleteTasks')) incompleteTasks = JSON.parse(localStorage.getItem('incompleteTasks'));
    if (localStorage.getItem('completedTasks')) completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
}

function addToincompleteTasks(input){
    incompleteTasks.push(input);
    updateLocalStorage();
}

function addNewCard(task){ 
//-------------crea tarjeta ----------------//
// el id es el index que tiene el elemento en el array incompleteTasks

    let defaultCard = 
    $(`<div class="col-6 col-md-4 col-lg-3 mb-3 dsnone" data-id="${incompleteTasks.indexOf(task)}"> 
        <div class="card p-2 tarj">
            <h5 class="card-title">${task.name}</h5>
            <p class="card-text">${task.description}</p>
            <button class="btn btn-info" data-card="status">Completar</button>
            <button class="btn btn-danger" data-card="del">Borrar</button>
        </div>
    </div>`);
    
    $('[data-cards="incomplete"]').append(defaultCard);
    $(defaultCard).show(500);
    
//-------------------BOTON BORRAR -------------------------------//
    let deleteButtons = $('[data-card="del"]');
        $.each(deleteButtons, function (index, element) { 
            if (!element.dataset.listener){ //si no tiene ya atribuido un listener

                $(element).click(function (e) { 
                    //div padre, la tarjeta quien contiene el data-id;
                    let parentElem = element.parentElement.parentElement; 
                    let dataId = parentElem.dataset.id

                    incompleteTasks.splice(dataId, 1); // borra el elemento del array
                    updateLocalStorage();
                    updateCardsDisplay(); // actualiza las tarjetas en pantalla;
                });

                // añade la propiedad para saber que ya tiene un listener
                element.setAttribute('data-listener', 'true'); 
            }
        });
//------------funcion boton status-----------//
    let statusButtons = $('[data-card="status"]');
    $.each(statusButtons, function (index, element){
        if (!element.dataset.listener){ //si no tiene ya atribuido un listener

            $(element).click(function (e){
                //div padre, la tarjeta quien contiene el data-id;
                let parentElem = element.parentElement.parentElement;
                let dataId = parentElem.dataset.id
                
                completedTasks.push(incompleteTasks[dataId])
                incompleteTasks.splice(dataId, 1);
                updateLocalStorage();
                updateCardsDisplay();
            })
        element.setAttribute('data-listener', 'true');
        }
    })
}


function addCompletedCard(task){ 
    //-------------crea tarjeta ----------------//
    // el id es el index que tiene el elemento en el array incompleteTasks
    
    let defaultCard = 
    $(`<div class="col-3 dsnone" data-id="${completedTasks.indexOf(task)}"> 
        <div class="card p-2 tarj">
            <h5 class="card-title">${task.name}</h5>
            <p class="card-text">${task.description}</p>
            <button class="btn btn-danger" data-card="del">Borrar</button>
        </div>
    </div>`);
    
    $('[data-cards="completed"]').append(defaultCard);
    $(defaultCard).show(500);
        
    
    //------------funcion boton borrar-----------//
    // elimina el elemento de la libreria y llama a updateCardsDisplay();
    
        let delBtns = document.querySelectorAll('[data-card="del"]');
    
            delBtns.forEach( (element)=>{
                // si data-listener true quiere decir que ya se le agrego el evento
                // asi que hay que saltearlo para no duplicarlo muchas veces
                if (!element.dataset.listener){
    
                    element.addEventListener('click', ()=>{
                        
                        let parentElem = element.parentElement.parentElement;
    
                        completedTasks.splice(parentElem.dataset.id, 1);
                        updateLocalStorage();
                        updateCardsDisplay();
                })
            element.setAttribute('data-listener', 'true');
            }
        })
}

function removeCards(){
// elimina todas las cards para no tener problemas al crear las nuevas
    const cards = $('[data-id]')   
    $.each(cards, function (index, element) { 
        $(element).hide(100, ()=>{
            $(element).remove();
        })
        
    });
    
    // cards.forEach((element) =>{
    //     element.remove();
    // })
}

function updateCardsDisplay(){
    removeCards()

// crea nuevas cards con cada elemento del array incompleteTasks //
    for (let i in incompleteTasks){
        addNewCard(incompleteTasks[i]);
    }
    for (let i in completedTasks){
        addCompletedCard(completedTasks[i]);
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
    
    $(btn).click(function (e) { 
        e.preventDefault(); // para que no funcione como un submit
        let newTask = new Task(title.val(), desc.val());
        //id++; id va a seguir subiendo mientras se agreguen tareas
        addToincompleteTasks(newTask)
        updateCardsDisplay();
    });
}


$('[data-btn="toggle-completed"]').click(function(){
    $('[data-cards="completed"]').toggle(500);
    
})

$('[data-btn="toggle-incomplete"]').click(function(){
    $('[data-cards="incomplete"]').toggle(500);
    
})

createCard()
expandForm()
retrieveFromLocalStorage()
updateCardsDisplay()