/* se crean las variables para hacer referencia a los elemtos del HTML, estas variables hacer referencia a los Imputs 
del formulario y al lista de ordenes que se desplegara mas abajo*/

const form = document.getElementById('main-form'); 
const meseroInput = document.getElementById('mesero');
const pedidoInput = document.getElementById('orden');
const ordenesList = document.getElementById('ordenes');


let ordenes = []; //Array para almacenar las órdenes que rescatará de los imputs

/* Función para agregar una orden donde se dan los parametros del nombre del mesero y el pedido, ambis serán
guardados en el array ordenes en forma de objeto*/

function agregarOrden(nombreMesero, pedido) {
    ordenes.push({ mesero: nombreMesero, pedido: pedido });
    mostrarOrdenes();
    guardarEnLocalStorage(); // se llama la función guardarEnLocalStorage que más abajo esta creada para poder almacenar los datos en el localStorage
}



/* Función para mostrar los pedidos en el contenedor que se creará una vez que se ingrese la informacion,
más abajo se especifica línea por línea que hace cada elemento*/
function mostrarOrdenes() {
  ordenesList.innerHTML = '';

  for (let index = 0; index < ordenes.length; index++) { //se itera el array que contiene el nombre del mesero y la orden
      const orden = ordenes[index]; //se crea una const que accede a los valores del array ordenes
      const ordenElement = document.createElement('div'); // ordenElement hace referencia a la etiqueta div que se creara, que se servirá de contenedor para los pedidos.
      ordenElement.classList.add('orden-item'); // una vez creado el div se agregará la lista dentro de nuestro html que tendra info del mesero, el de la orden y se crearán
      //dos botones, editar y eliminar, y como separador se ocupo ocupa un hr, todos estas etiquetas fueros previamente editadas en la hoja de estilos.
      ordenElement.innerHTML = ` 
          <p>Mesero: ${orden.mesero}</p>
          <p>Pedido: ${orden.pedido}</p> 
          <button class="btn-edit" data-index="${index}">Editar</button>
          <button class="btn-delete" data-index="${index}">Eliminar</button>
          <hr>
      `;
      ordenesList.appendChild(ordenElement); // tiene la funciones de agregar al div la informacion del ordenElement
  }
}


form.addEventListener('submit', function (e) { // se agrega un evento al ocurrir el submit ("Añadir Pedido"), en este caso ejecutara la función
    e.preventDefault(); // se agrega preventDefauult para que al momento de hacer ell  submit la pagina no se recargue y pierda la información
    const nombreMesero = meseroInput.value; //rescata el valor del input mesero
    const pedido = pedidoInput.value; // rescata el valor del input pedido
    agregarOrden(nombreMesero, pedido);
    form.reset(); // un vez añadido el pedido se resetea el el formulario
});


function eliminarOrden(index) { // se crea esta función con el metodo splice en donde se accede al array, en este caso para eliminar el pedido
    ordenes.splice(index, 1); //se hace referencia a los elementos a eliminar dentro del array ordenes
    mostrarOrdenes(); // se vuelve a llamar la función mostrarOrdenes para actualizar la información 
}


function editarOrden(index, nuevoPedido) { // se crea la función de editar el pedido, se establecen dos parametros, el de los valores del array, y nueva pedido que será
    // el nuevo valor a agregar. esta función se llamara mas abajo con los botones
    ordenes[index].pedido = nuevoPedido; // el array con la posición de pedido sera reemplazado por el nuevo valor
    mostrarOrdenes(); // se vuelve a llamar a la función para actualizar los valores de las ordenes
}


ordenesList.addEventListener('click', function (e) { // se agrega el evento de click, en este caso hacia los botones que se crearán una vez añadido un pedido.
    if (e.target.classList.contains('btn-delete')) { //verifica si la clase btn-delete esta creada para posteriormente ejecutar la función
        const index = e.target.getAttribute('data-index'); // se obtiene el valor del array ordenes
        eliminarOrden(index); // se llama a la funcón creada más arriba que correspondera al indice correspondiente (index,1)
    } else if (e.target.classList.contains('btn-edit')) { //verifica se la clase btn-edit esta creada
        const index = e.target.getAttribute('data-index'); // accede al array ordenes 
        const nuevoPedido = prompt('Editar pedido:', ordenes[index].pedido); //y abre un prompt con el fin de almacenar la nueva informacion del pedido, en este caso es solo
        //para el pedido y no el mesero, ya que se asume que un mesere no se equivocará en su nombre.
        if (nuevoPedido !== null) { // acá se verifica que la informacion haya sido agregada.
            editarOrden(index, nuevoPedido); // se llama a la función para actualizar con el nuevo valor del promppt
        }
    }
});


mostrarOrdenes(); // carga las ordenes al cargar la pagina (vacios)

function guardarEnLocalStorage() { // se crea la funcion funciones para guardar los valores de los inputs en el local storage, se llama a esta función al inicio del codigo
    localStorage.setItem('ordenes', JSON.stringify(ordenes));
}
