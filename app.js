let library = [];

class Task{
    constructor(name, description){
        this.name = name;
        this.description = description;
    }
}

function addToLibrary(input){
    library.push(input);
}


function addCard(task){ 
//-------------crea tarjeta ----------------//
// el id es el index que tiene el elemento en el array library

    let defaultCard = 
    $(`<div class="col-3 dsnone" data-id="${library.indexOf(task)}"> 
        <div class="card p-2 tarj">
            <h5 class="card-title">${task.name}</h5>
            <p class="card-text">${task.description}</p>
            <button class="btn btn-info" data-card="status">Estado</button>
            <button class="btn btn-danger" data-card="del">Borrar</button>
        </div>
    </div>`);
    
    $('[data-cards]').append(defaultCard);
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

                    library.splice(parentElem.dataset.id, 1);
                    updateCardsDisplay();
            })
        element.setAttribute('data-listener', 'true');
        }
    })

    let statusBtns = document.querySelectorAll('[data-card="status"]');

        statusBtns.forEach( (element)=>{
            // si data-listener true quiere decir que ya se le agrego el evento
            // asi que hay que saltearlo para no duplicarlo muchas veces
            if (!element.dataset.listener){

                element.addEventListener('click', ()=>{
                    
                    let parentElem = element.parentElement;

                    $(parentElem).toggleClass('bg-success');
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

// crea nuevas cards con cada elemento del array library //
    for (let i in library){
        addCard(library[i]);
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
        addToLibrary(newTask)
        updateCardsDisplay();
    });
}










//---------------------------------------------------//

createCard()
expandForm()

$('#test').click(function(){
    console.table(library)
    
})

$('#test2').click(updateCardsDisplay);