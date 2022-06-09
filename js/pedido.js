


const carro = new Carrito();

const carrito = document.getElementById('carrito');

const productos = document.getElementById('lista-productos');

const listaProductos = document.querySelector('#carritoLista tbody');

const limpiarCarritoBtn = document.getElementById('limpiarcarrito');

const procesarPedidoBtn = document.getElementById('procesar-pedido');



cargaDeEventosCarrito();


function cargaDeEventosCarrito(){

    //agregar al carrito
    
    productos.addEventListener('click', (e)=>{carro.agregarProducto(e)});

    
    //elimina elementos del carrito
    
    carrito.addEventListener('click', (e)=>{carro.eliminarProducto(e)});

    
    //limpia carrito
    
    limpiarCarritoBtn.addEventListener('click', (e)=>{carro.limpiarCarrito(e)});

    
    //Muestra lo que está guardado en Local Storage
    
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());

    //Enviar pedido a otra pagina
    
    procesarPedidoBtn.addEventListener('click', (e)=>{carro.procesarPedido(e)});
    
}