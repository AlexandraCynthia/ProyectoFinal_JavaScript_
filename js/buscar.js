//PROCEDIMIENTO PARA BUSCAR PRODUCTOS DONDE SE HIZO USO DE OPERADORES TERNARIOS

document.addEventListener('keyup', (e) => {
    if(e.target.matches('.filter')){

        document.querySelectorAll('.card').forEach(card => {
            // if(card.innerHTML.toLowerCase().includes(e.target.value)){
            //     card.classList.remove('hidden')
            // }else{
            //     card.classList.add('hidden')
            // }
            // Operador ternario
            (card.innerHTML.toLowerCase().includes(e.target.value)) ? card.classList.remove('hidden') : card.classList.add('hidden')
        })
    }
})