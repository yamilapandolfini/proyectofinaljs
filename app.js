const listaProductos = document.querySelector('#lista-productos');
const tableCarrito = document.querySelector('#lista-carrito tbody');
const formBuscador = document.querySelector('#formulario');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let carrito;
let boton;
let productos;


document.addEventListener('DOMContentLoaded', () => {
	const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
	carrito = carritoStorage || [];
	actualizarCarritoHTML();
	$.ajax({
		url: 'productos.json',
		success: function(productosJSON, textStatus, xhr){
			productos= productosJSON;
			renderProducts(productos);
		},
		error: function (xhr, textStatus, error){
			console.log(xhr);
			console.log(textStatus);
			console.log(error);
		}
	});
});

listaProductos.addEventListener('click', agregarProducto);
formBuscador.addEventListener('submit', buscarProductos);
tableCarrito.addEventListener('click', eliminarProducto);
btnVaciarCarrito.addEventListener('click', vaciarCarrito);

setTimeout(() => {
	const clickEvt = new Event('click', {
		bubbles: true
	});
	boton = document.querySelector('#id1');
	console.log("Pasa");
	boton.dispatchEvent(clickEvt);
}, 2000);

function vaciarCarrito(e) {
	e.preventDefault();
	carrito = [];
	actualizarCarritoHTML();
	actualizarStorage();
}

function eliminarProducto(e) {
	e.preventDefault();
	if (e.target.nodeName === "A" || e.target.nodeName === "I") {
		const id = e.target.closest('a').dataset.id;
		const carritoFiltrado = carrito.filter(producto => producto.id !== id);
		carrito = [...carritoFiltrado];
		actualizarCarritoHTML();
		actualizarStorage();
	}
}

function buscarProductos(e) {
	e.preventDefault();

	const inputBuscador = document.querySelector('#buscador').value;
	const inputFiltrado = inputBuscador.toLowerCase().trim();


	const resultado = productos.filter(producto => producto.nombre.toLowerCase().includes(inputFiltrado));

	console.log(resultado);
	renderProducts(resultado);
	formBuscador.reset();
}

function agregarProducto(e) {
	e.preventDefault();

	if (e.target.classList.contains("agregar-carrito")) {
		const productCard = e.target.parentElement.parentElement;

		const productoAgregado = {
			imagen: productCard.querySelector('img.card-img-top').src,
			nombre: productCard.querySelector('h5').textContent,
			precio: productCard.querySelector('.precio span').textContent,
			cantidad: 1,
			id: productCard.querySelector('a').dataset.id
		}

		const existe = carrito.some(producto => producto.id === productoAgregado.id);

		if (existe) {
			const nuevoCarrito = carrito.map(producto => {
				if (producto.id === productoAgregado.id) {
					producto.cantidad++;
				}
				return producto;
			});
			carrito = [...nuevoCarrito];

		} else {

			carrito.push(productoAgregado);

		}


		actualizarCarritoHTML();
		actualizarStorage();
	}
}

function actualizarCarritoHTML() {
	tableCarrito.innerHTML = '';

	carrito.forEach(producto => {
		const { imagen, nombre, precio, cantidad, id } = producto;
		console.log(producto);
		$('#lista-carrito tbody')
			.append(`
				<tr>
					<td>
						<img src="${imagen}" width="80%">
					</td>
					<td>
						${nombre}
					</td>
					<td>
						${precio}
					</td>
					<td>
						${cantidad}
					</td>
					<td>
						<a href="#" class="borrar-producto" data-id="${id}"><i class="fas fa-trash"></i></a>
					</td>
				</tr>
			`);
	});
}


function actualizarStorage() {
	// TODO
	localStorage.setItem('carrito', JSON.stringify(carrito));
}

function renderProducts(listadoProductos) {
	listaProductos.innerHTML = ''

    console.log(listaProductos);
	listadoProductos.forEach(producto => {
		const html = `
			
            <div class="card">
                <img class="card-img-top" src="${producto.imagen}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="precio"><span class="u-pull-right">${producto.precio}</span></p>
                    <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${producto.id}">Agregar al Carrito</a>
                </div>
            </div>

		`

		listaProductos.innerHTML += html;
	});
}



