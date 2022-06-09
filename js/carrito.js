 //Clase carrito

class Carrito {

    //Para agregar un producto al carrito
    agregarProducto(e){
        
        e.preventDefault();
        //Procedimiento para agregar en el carrito
        
        
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            
            
            //Enviamos el producto seleccionado para tomar sus datos
            this.verificarDatosProducto(producto);
        }
    }

    
    
    //selecciona la información de cada item
    verificarDatosProducto(producto){
        
        const infoProducto = {
            
            imagen : producto.querySelector('img').src,
            
            titulo: producto.querySelector('h4').textContent,
            
            precio: producto.querySelector('.precio span').textContent,
            
            id: producto.querySelector('a').getAttribute('data-id'),
            
            cantidad: 1
            }

        
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){
            
                productosLS = productoLS.id;
            }
        });
        
        if(productosLS === infoProducto.id){

        //USANDO SWEAT ALERT PARA INDICAR QUE EL PRODUCTO YA ESTA AGREGADO

         Swal.fire({
              
            title: 'El producto ya ha sido agregado',
              
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
               
                popup: 'animate__animated animate__fadeOutUp'
              }
            })

        }
        else {
            this.insertarCarrito(infoProducto);
        }  
    }



    //Mostrará productos insertados en el carrito de compras
        
    insertarCarrito(producto){
       
        const row = document.createElement('tr');
        
        row.innerHTML = `
            
        <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);

        this.guardarProductosLocalStorage(producto);
    
    }

    

    //Para eliminación del producto del carrito
    
    eliminarProducto(e){
       
        e.preventDefault();
       
        let producto, productoID;
       
        if(e.target.classList.contains('borrar-producto')){
            
            e.target.parentElement.parentElement.remove();
            
            producto = e.target.parentElement.parentElement;
            
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        
        this.eliminarProductoLocalStorage(productoID);
        
        this.calcularTotal();
    }

   

    //Para eliminación de todos los productos
    
    limpiarCarrito(e){
       
        e.preventDefault();
        
        while(listaProductos.firstChild){
            
            listaProductos.removeChild(listaProductos.firstChild);
        }
       
        this.vaciarLocalStorage();

        return false;
    }

   
    //Proceso para almacenar datos en el Local storage
    
    guardarProductosLocalStorage(producto){
        
        let productos;
        
        //Toma valor de un arreglo con datos del Local Storage
        productos = this.obtenerProductosLocalStorage();
        
        //Agrega productos en el carrito
        productos.push(producto);
        
        //Agregando al local storage
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //Comprobando que tenemos elementos en el Local storage
    
    obtenerProductosLocalStorage(){
        
        let productoLS;

   
        //OPERADOR TERNARIO PARA VALIDAR SI HAY DATOS EN EL LOCAL STORAGE

        (localStorage.getItem('productos') === null) ? (productoLS = []) : (productoLS = JSON.parse(localStorage.getItem('productos'))); 

         return productoLS;

    }

    //Mostrar lo guardado en el Local Storage
   
    leerLocalStorage(){
        
        let productosLS;
        
        productosLS = this.obtenerProductosLocalStorage();
        
        productosLS.forEach(function (producto){

            //Construcción de la plantilla
            
            const row = document.createElement('tr');
            
            row.innerHTML = `
                
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                
                <td>${producto.titulo}</td>
                
                <td>${producto.precio}</td>
                
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            
            listaProductos.appendChild(row);
        });
    }

    //Muestra productos guardados en el local storage EN COMPRA.HTML
    
    leerLocalStorageCompra(){
        
        let productosLS;
        
        productosLS = this.obtenerProductosLocalStorage();
        
        productosLS.forEach(function (producto){
            
            const row = document.createElement('tr');
            
            row.innerHTML = `
               
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                
                <td>${producto.titulo}</td>
                
                <td>${producto.precio}</td>
                
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                
                <td id='subtotales'>${producto.precio * producto.cantidad}</td>
                
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
                </td>
            `;
            
            listaCompra.appendChild(row);
        });
    }

    //Para eliminar producto del Local Storage
    eliminarProductoLocalStorage(productoID){
        
        let productosLS;
        
        //Primero obtenemos el arreglo de productos
        productosLS = this.obtenerProductosLocalStorage();
        
        //Compararamos el id del producto borrado con Local Storage
        productosLS.forEach(function(productoLS, index){
           
            if(productoLS.id === productoID){
               
                productosLS.splice(index, 1);
            }
        });

        //Se añade el arreglo actual al Local storage
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //Metodo para eliminar todos los productos del Local Storage
    vaciarLocalStorage(){
        localStorage.clear();
    }

       
//Para procesar el pedido:
    
procesarPedido(e){
       
    e.preventDefault();

        if(this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                
                text: 'El carrito está vacío, agrega algún producto',
                showConfirmButton: false,
                timer: 2000
            })
        }
        else {
            location.href = "compra.html";
        }
    }

       //Para calcular los montos
      
       calcularTotal(){
        
        let productosLS;
        
        let total = 0, igv = 0, subtotal = 0;
        
        productosLS = this.obtenerProductosLocalStorage();
        
        for(let i = 0; i < productosLS.length; i++){
            
            let element = Number(productosLS[i].precio * productosLS[i].cantidad);
            
            total += element;
        }
        
        igv = parseFloat(total * 0.18).toFixed(2);
        
        subtotal = parseFloat(total-igv).toFixed(2);

        document.getElementById('subtotal').innerHTML = "S/. " + subtotal;
        
        document.getElementById('igv').innerHTML = "S/. " + igv;
        
        document.getElementById('total').value = "S/. " + total.toFixed(2);
    }

    obtenerEvento(e) {
       
        e.preventDefault();
        
        let id, cantidad, producto, productosLS;
        
        if (e.target.classList.contains('cantidad')) {
            
            producto = e.target.parentElement.parentElement;
            
            id = producto.querySelector('a').getAttribute('data-id');
            
            cantidad = producto.querySelector('input').value;
            
            let actualizarMontos = document.querySelectorAll('#subtotales');
            
            productosLS = this.obtenerProductosLocalStorage();
            
            productosLS.forEach(function (productoLS, index) {
               
                if (productoLS.id === id) {
                    
                    productoLS.cantidad = cantidad;                    
                    
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }    
            });
            
            localStorage.setItem('productos', JSON.stringify(productosLS));
            
        }
        else {
            
            console.log("click afuera");
        }
    }
}