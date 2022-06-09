//Haciendo uso de FETCH y json


const container = document.querySelector('.container-cards');

const obtenerProductos = async () => {
    const resp = await fetch('/productos.json');
    const data = await resp.json();
   
    data.forEach((prod, index) => {

        const div1 = document.createElement('div');
        div1.className = 'card mb-4 shadow-sm';

        const div2 = document.createElement('div');
        div2.className = 'card-header';

        const div3 = document.createElement('div');
        div3.className = 'card-body';

        const h4 = document.createElement('h4');
        h4.className = 'my-0 font-weight-bold';
        h4.innerHTML = prod.nombre;
        div2.append(h4);

        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.setAttribute('src', prod.img);
        div3.append(img);

        const h1 = document.createElement('h1');
        h1.className = 'card-title pricing-card-title precio';
        h1.innerHTML = 'S/.';
        const span = document.createElement('span');
        span.innerHTML = prod.precio;
        h1.append(span);
        div3.append(h1);

        const ul = document.createElement('ul');
        ul.className = 'list-unstyled mt-3 mb-4';
        const li1 = document.createElement('li');
        const li2 = document.createElement('li');
        li2.innerHTML = prod.detalle;
        ul.append(li1);
        ul.append(li2);
        div3.append(ul);

        const a = document.createElement('a');
        a.className = 'btn btn-block btn-danger agregar-carrito';
        a.setAttribute('data-id', index +1);
        a.innerHTML = 'Agregar al Carrito';
        div3.append(a);

        div1.append(div2);
        div1.append(div3);
        container.append(div1);
    })
}

obtenerProductos();