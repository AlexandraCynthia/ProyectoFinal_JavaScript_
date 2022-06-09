

const compra = new Carrito();

const listaCompra = document.querySelector("#lista-compra tbody");

const carrito = document.getElementById('carrito');

const procesarCompraBtn = document.getElementById('procesar-compra');

const cliente = document.getElementById('cliente');

const correo = document.getElementById('correo');



cargarEventos();

function cargarEventos() {
    
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Elimina los  productos del carrito
    
    carrito.addEventListener('click', (e) => {compra.eliminarProducto(e)});

    compra.calcularTotal();

     
    
    //cuando se selecciona el boton de procesar Compra
     
     procesarCompraBtn.addEventListener('click', procesarCompra);

     carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
     
     carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });
   
}



function procesarCompra() {
   
    // Uso de e.preventDefault() para cancelar la acción del evento, de no cumplirse las condiciones
    if (compra.obtenerProductosLocalStorage().length === 0) {
       

        Swal.fire({
            title: 'Selecciona algún producto!',
            
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKlh1w31xkHkifUNUxu9ru5sT2-VqZmJnLDg&usqp=CAU',
           
            imageWidth: 400,
            
            imageHeight: 200,
           
            imageAlt: 'Custom image',

        }).then(function () {
                window.location = "index.html";
            })
    }

    else if (cliente.value === '' || correo.value === '') {
        

        Swal.fire({
            title: 'Ingresa todos los campos!',
            
            imageWidth: 400,
            
            imageHeight: 200,
           
            imageAlt: 'Custom image',
    })
        }
        else {
              
        compra.vaciarLocalStorage();
        Swal.fire(
            'Muchas gracias!',
            'Dentro de poco se comunicarán contigo para procesar la compra',
            'success'
          )

        }
}

