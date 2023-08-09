let mesero = [];

const infoMesero = {
    nombre: '',
    mesa: '',
    pedido: '',
}

let editando = false;

const form = document.getElementById("form");
const nombreMeseroinput = document.getElementById("mesero");
const mesaInput = document.getElementById("mesa");
const ordenInput = document.getElementById("pedido");
const añadirPedidoInput = document.getElementById("pedido");

form.addEventListener('submit', formTest);

function formTest(e) {
    e.preventDefault();

    if (nombreMeseroinput.value === "" || mesaInput.value === "") {
        alert("Por favor rellene los campos indicados")
        return;
    }
    if (editando) {
        editarMesero();
        editando = false;

    } else {
        infoMesero.id = Date.now();
        infoMesero.nombre = nombreMeseroinput.value;
        infoMesero.mesas = mesaInput.value;
        infoMesero.orden = ordenInput.value;

        agregarInfo();
    }
}
function agregarInfo(){
    mesero.push({...infoMesero});
    mostrarMeseros();

    form.reset();

    borrarDatos();
}
function borrarDatos(){
    infoMesero.nombre = ''
    infoMesero.mesa = ''
    infoMesero.pedido = ''
}
function mostrarMeseroS(){

borrarDatos();

    const divMeseros = document.querySelector("#listado-ordenes");
mesero.forEach( mesero =>{
    const {nombre, mesa, orden} = mesero;

    const contenido = document.createElement('p');
    contenido.textContent = `${nombre} - ${mesa} - ${orden} -`;
    contenido.dataset.id;

    const botonEditar = document.createElement(button);
    botonEditar.onclick =() => infoOrden(mesero);
    botonEditar.textContent = 'editar'
    botonEditar.classList.add('btn, btn-add');
    contenido.append(botonEditar);

    const botonEliminar = document.createElement(button);
    botonEliminar.onclick =() => eliminarOrden(id);
    botonEliminar.textContent = 'eliminar'
    botonEliminar.classList.add('btn, btn-eliminar');
    contenido.append(botonEliminar);

    const hr = document.createElement('hr');
    divMeseros.appendChild(contenido);
    divMeseros.appendChild(hr);
} );
}

function botonEditar(mesero){
    const {nombre, mesa, pedido} = mesero
nombreMeseroinput.value = nombre;
mesaInput.value = mesa;
ordenInput.value = pedido;

form.querySelector('button[type="submit"]').textContent = 'actualizar';
editando = true;


}

function editarMesero(){
    mesero.nombre = nombreMeseroinput;
    mesero.mesa = mesaInput;
    mesero.pedido = ordenInput;

    mesero.map(mesero => {
        if(mesero.nombre === infoMesero.nombre){
            mesero.nombre = mesero.nombre;
            mesero.mesa = mesero.mesa;
            mesero.pedido = mesero.pedido;
        }
    });

    borrarDatos();
    infoMesero();
    form.reset();
    form.querySelector('button[type = submit]').textContent = 'agregar';

    editando = false;
    
}

function eliminarOrden(id){
    mesero = mesero.filter(mesero => mesero.id !== id);
    borrarDatos();
    infoMesero();
}

function borrarDatos(){
    const divMeseros = document.querySelector('#listado-ordenes');

    while(divMeseros.firstChild){
        divMeseros.removeChild(divMeseros.firstChild);
    }
}