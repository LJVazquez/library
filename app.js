let incompleteTasks = [];
let completedTasks = [];

class Task{
    constructor(name, description){
        this.name = name;
        this.description = description;
    }
}

// Copia los array de objetos de las librerias  en el localstorage
function updateLocalStorage(){
    localStorage.setItem('incompleteTasks', JSON.stringify(incompleteTasks)); 
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Copa los datos del localstorage en los array de objetos de las librerias 
function retrieveFromLocalStorage(){
    if (localStorage.getItem('incompleteTasks')) incompleteTasks = JSON.parse(localStorage.getItem('incompleteTasks'));
    if (localStorage.getItem('completedTasks')) completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
}

function addToincompleteTasks(input){
    incompleteTasks.push(input);
    updateLocalStorage();
}

// boton delete de las tarjetas
function addDeleteButtonListeners(taskType){

    const deleteButtons = $('[data-card="del"]');
    $.each(deleteButtons, function (index, element) { 
        if (!element.dataset.listener){ //si no tiene ya atribuido un listener

            $(element).click(function (e) { 
                //div padre, la tarjeta quien contiene el data-id;
                let parentElem = element.parentElement.parentElement; 
                let dataId = parentElem.dataset.id

                taskType.splice(dataId, 1); // borra el elemento del array
                updateLocalStorage();
                updateCardsDisplay(); // actualiza las tarjetas en pantalla;
            });

            // añade la propiedad para saber que ya tiene un listener
            element.setAttribute('data-listener', 'true'); 
        }
    });
}

// boton completar de las tarjetas
function addStatusButtonListeners(){

    const statusButtons = $('[data-card="status"]');
    $.each(statusButtons, function (index, element){
        if (!element.dataset.listener){ //si no tiene ya atribuido un listener

            $(element).click(function (e){
                //div padre, la tarjeta quien contiene el data-id;
                let parentElem = element.parentElement.parentElement;
                let dataId = parentElem.dataset.id
                
                completedTasks.push(incompleteTasks[dataId]) // envia el elemento a completed
                incompleteTasks.splice(dataId, 1); // elimina el elemento de incomplete
                updateLocalStorage();
                updateCardsDisplay();
            })

        // añade la propiedad para saber que ya tiene un listener
        element.setAttribute('data-listener', 'true');
        }
    })
}

//------------- crear tarjeta de tarea ----------------//
function addTaskCard(task){ 
    // el id es el index que tiene el elemento en el array incompleteTasks
    
    let cardTemplate = 
    $(`<div class="col-12 col-md-6 col-lg-3 mb-3 dsnone" data-id="${incompleteTasks.indexOf(task)}"> 
        <div class="card border-lpurple p-2 text-center tarj">
            <h5 class="card-title">${task.name}</h5>
            <p class="card-text">${task.description}</p>
            <button class="btn rounded-pill bg-lpurple" data-card="status">Completar</button>
        </div>
    </div>`);
    
    $('[data-cards="incomplete"]').append(cardTemplate);
    $(cardTemplate).show(500);
    
    addStatusButtonListeners();
    // addDeleteButtonListeners(incompleteTasks); para agregar un boton borrar
}

function addCompletedTaskCard(task){ 
    //-------------crea tarjeta ----------------//
    // el id es el index que tiene el elemento en el array incompleteTasks
    
    let cardTemplate = 
    $(`<div class="col-12 col-md-6 col-lg-3 mb-3 dsnone" data-id="${completedTasks.indexOf(task)}"> 
        <div class="card border-red p-2 text-center tarj">
            <h5 class="card-title">${task.name}</h5>
            <p class="card-text">${task.description}</p>
            <button class="btn rounded-pill bg-lred" data-card="del">Borrar</button>
        </div>
    </div>`);
    
    $('[data-cards="completed"]').append(cardTemplate); // append al div de tareas
    $(cardTemplate).show(500); //la tarjeta se crea con 'display:none' para poder tener el efecto
        
    addDeleteButtonListeners(completedTasks);
}

// elimina todas las cards para no tener problemas al crear las nuevas
function removeCards(){
    const cards = $('[data-id]')   
    $.each(cards, function (index, element) { 
        $(element).hide(100, ()=>{
            $(element).remove();
        })
    });
}

function updateCardsDisplay(){
    removeCards();

    // crea nuevas cards con cada elemento del array incompleteTasks //
    for (let i in incompleteTasks){
        addTaskCard(incompleteTasks[i]);
    }
    // crea nuevas cards con cada elemento del array completedTasks //
    for (let i in completedTasks){
        addCompletedTaskCard(completedTasks[i]);
    }
}

// boton crear tarea del formulario 'Agregar tareas' //
function createCard(){
    //------------ crear nueva tarjeta con los datos del form -----------//
    const title = $('[data-newtask="title-input"]');
    const desc = $('[data-newtask="description-input"]');
    const btn = $('[data-newtask="create"]');
    
    $(btn).click(function (e) { 
        e.preventDefault(); // para que no funcione como un submit
        let newTask = new Task(title.val(), desc.val()); // crea una nueva tarea
        title.val('');
        desc.val('');
        addToincompleteTasks(newTask); // agrega la tarea al array incompleteTasks
        updateCardsDisplay(); // actualiza las tarjetas visibles en pantalla
    });
}

function setButtons(){
    //--------- toggle no completadas ---------//
    $('[data-btn="toggle-incomplete"]').click(function(){
        $('[data-cards="incomplete"]').toggle(500);
    })
    //--------- toggle completadas ---------//
    $('[data-btn="toggle-completed"]').click(function(){
        $('[data-cards="completed"]').toggle(500);
    })
    createCard() // boton crear del formulario
}

$(document).ready(function initialLoad() {
    setButtons() // establece los listeners de los botones
    retrieveFromLocalStorage() // busca si hay datos de las tarjetas almacenados
    updateCardsDisplay() // actualiza las tarjetas en pantalla
});