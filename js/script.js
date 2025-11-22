// Al clickar en cada una de las banderas tendrá que mostrar la información detallada en una ventana flotante del país seleccionado. La Muestra información detallada sobre el país seleccionado, incluyendo la bandera, la capital, la población, el lado de la carretera por el que se circula.
//Tendrá un botón cerrar para hacer desaparecer esa información.
//https://restcountries.com/v3/all si no va  https://restcountries.com/v3.1/all

//orden alfabético (recuerda el método `sort`)
//- Si necesitas añadir clases a un elemento mediante JS, lo puedes hacer con `elemento.classList.add('clase que quieres añadir')` y para eliminar `elemento.classList.remove('clase que quieres añadir')`

const countriesList = document.getElementById('countries-list');

//peticion con funcion async
const getBanderas = async (banderas) => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
        if (!res.ok) {
            throw new Error(`Ha surgido un error ${res.status}`)
        }
        const data = await res.json()
        console.log(data)

        //ordenar alfabeticamente localeCompare acepta acentos mayus minus etc
        const dataSort = data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
        )

        const banderas = dataSort.map(bandera => {
            //destructuring de lo que necesito
            const {
                flags: { png, alt }, name: { common } } = bandera;

            return `
            <div class="container">
                <div class="img">
                    <img src="${png}"/>            
                    <h3>${common}</h3>
                </div>           
                <div class="submenu">${alt}</div>
            </div>
            `
        }).join('');
        countriesList.innerHTML = banderas


        // desplegar submenu 
        countriesList.addEventListener('click', e => {
            const img = e.target.closest('.img');
            if (!img) return;

            const container = img.parentElement;
            const submenu = container.querySelector('.submenu');
            //cerrar submenu al clicar fuera
            document.querySelectorAll('.submenu.active').forEach(open => {
                if (open !== submenu) open.classList.remove('active')
            })

            submenu.classList.toggle('active')
        })


    } catch (error) {
        console.log('error al obtener las banderas', error.message)
    }
}



getBanderas()