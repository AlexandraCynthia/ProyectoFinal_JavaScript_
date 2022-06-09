(async()=>{


const{value:pais}= await Swal.fire({
	title:"Bienvenido a tu tienda virtual",
	text: 'Selecciona tu país',
	confirmButtonText:'Seleccionar',
	backdrop: true,
	timer: 9000,
	position:'center', 
	allowOutsideClick:true,
	allowEscapeKey: false,
	allowEnterKey:false,  
	stopKeyDownPropagation:false,
	input: 'select',
	inputPlaceholder: 'País',
	inputValue: '',
	inputOptions: {
		peru: 'Perú',
		mexico: 'México',
		colombia:'Colombia',
		argentina: 'Argentina',
		ecuador: 'Ecuador'

	},
	cancelButtonAriaLabel:'Cancelar',
	imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ95O_DKxS2STn5YVzINxJ9aeZCJMLSpE0ZBQ&usqp=CAU',
	imageWidth:'300px',
	imageAlt:'Bienvenido'
});

	if(pais){
		Swal.fire({
			title:`Seleccionaste ${pais}`
		});
	}

}) ()


