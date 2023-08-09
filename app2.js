// Obtener referencias a los elementos del formulario y la lista de órdenes
const form = document.getElementById('main-form');
const meseroInput = document.getElementById('mesero');
const mesaInput = document.getElementById('mesa');
const pedidoInput = document.getElementById('pedido');
const ordenesList = document.querySelector('.orden');

// Array para almacenar las órdenes
let ordenes = [];

// Función para agregar una orden
function agregarOrden(nombreMesero, numMesa, pedido) {
    ordenes.push({ mesero: nombreMesero, mesa: numMesa, pedido: pedido });
    mostrarOrdenes();
}

// Función para mostrar las órdenes en la lista
function mostrarOrdenes() {
    ordenesList.innerHTML = '';
    ordenes.forEach((orden, index) => {
        const ordenElement = document.createElement('div');
        ordenElement.classList.add('orden-item');
        ordenElement.innerHTML = `
            <p>Mesero: ${orden.mesero}</p>
            <p>Mesa: ${orden.mesa}</p>
            <p>Pedido: ${orden.pedido}</p>
            <button class="btn-edit" data-index="${index}">Editar</button>
            <button class="btn-delete" data-index="${index}">Eliminar</button>
        `;
        ordenesList.appendChild(ordenElement);
    });
}

// Función para manejar el envío del formulario
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const nombreMesero = meseroInput.value;
    const numMesa = mesaInput.value;
    const pedido = pedidoInput.value;
    agregarOrden(nombreMesero, numMesa, pedido);
    form.reset();
});

// Función para eliminar una orden
function eliminarOrden(index) {
    ordenes.splice(index, 1);
    mostrarOrdenes();
}

// Función para editar una orden
function editarOrden(index, nuevoPedido) {
    ordenes[index].pedido = nuevoPedido;
    mostrarOrdenes();
}

// Event delegation para manejar clics en botones de editar y eliminar
ordenesList.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-delete')) {
        const index = event.target.getAttribute('data-index');
        eliminarOrden(index);
    } else if (event.target.classList.contains('btn-edit')) {
        const index = event.target.getAttribute('data-index');
        const nuevoPedido = prompt('Editar pedido:', ordenes[index].pedido);
        if (nuevoPedido !== null) {
            editarOrden(index, nuevoPedido);
        }
    }
});

// Inicializar la lista de órdenes vacía al cargar la página
mostrarOrdenes();
