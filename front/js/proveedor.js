//*********************************poner en mayuscula**********************************/
function mayus(e) {
    e.value = e.value.toUpperCase();
}
//*********************************poner en mayuscula**********************************/



//***********************************crear proveedor*************************************/
const formAgregarUsuario = document.getElementById('myForm');

formAgregarUsuario.addEventListener("submit", async function(event) {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

    // Obtener los valores del formulario
    const nombre_proveedor = document.getElementById('nombre_proveedor').value;
    const telefono = document.getElementById('telefono').value;
    const descripcion = document.getElementById('descripcion').value;
    const direccion = document.getElementById('direccion').value;
    
    console.log(nombre_proveedor)
    console.log(telefono)
    console.log(descripcion)
    console.log(direccion)


    try {
        // Enviar los datos al servidor para crear el nuevo usuario
        const response = await fetch('http://localhost:3009/La_holandesa/create_proveedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre_proveedor,
                telefono,
                descripcion,
                direccion
            })
        });

        if (response.ok) {
            // Actualizar la tabla después de cambiar el estado
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                
            });
            Toast.fire({
                icon: "success",
                title: "Se creo el proveedor correctamente"
            });
            getAll()
        } else {
            // Actualizar la tabla después de cambiar el estado
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                
            });
            Toast.fire({
                icon: "error",
                title: "Error al crear nuevo proveedor"
            });
            getAll()
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Error al enviar la solicitud');
    }
}); 
//***********************************crear proveedor*************************************/



//*************renderizado de tabla proveedor y mostrar tabla proveedor*******************/
const proveedor = document;

const paginaProveedor = proveedor.querySelector('#proveedor')

const Proveedor = ({id_proveedor, nombre_proveedor, telefono, descripcion, direccion, fecha_registro, estado}) => {
    // Convertir la fecha de registro a un formato de año-mes-día
    const formattedDate = new Date(fecha_registro).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });

    const buttonColor = estado === true ? 'green' : 'red';
    const buttontxt = estado === true ? 'SI' : 'NO';

    return `
        <tr id="Proveedor-row-${id_proveedor}"> <!-- Agregar un ID único para la fila -->
            <td>${id_proveedor}</td>
            <td>${nombre_proveedor}</td>
            <td>${telefono}</td>
            <td>${descripcion}</td>
            <td>${direccion}</td>
            <td>${formattedDate}</td>
            <td>
            <div class="container-btn-state">
                <button class="btn-state" style="background-color: ${buttonColor}" >${buttontxt}</button>
            </div>
            </td>
            <td>
                <div class="button-eliminar-editar">
                    <button style="cursor: pointer;" class="editar" onclick="editProveedor(${id_proveedor})"><i class="fi fi-rr-pen-field"></i></button> <!-- Llamar a la función editCategoria -->
                    <button style="cursor: pointer;" class="estado" onclick="changeState(${id_proveedor}, ${estado})"><i class="fi fi-sr-cross-small"></i></button>
                </div>
            </td>
        </tr>
    `;
}
const render = (data) => {
    const filteredProveedor = data.filter(proveedor => proveedor.estado == true);
    const sortedProveedor = filteredProveedor.sort((a, b) => a.id_proveedor - b.id_proveedor);
  
    if (Array.isArray(sortedProveedor) && sortedProveedor.length > 0) {
      const cardsHTML = sortedProveedor.map(item => Proveedor(item)).join('');
      paginaProveedor.innerHTML = cardsHTML;
    } else {
      paginaProveedor.innerHTML = '<tr><td colspan="8">NO SE ENCONTRARON PROVEEDORES.</td></tr>';
    }
  };
  
  const getAll = async () => {
    try {
      const response = await fetch('http://localhost:3009/La_holandesa/proveedor');
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const result = await response.json();
      /* console.log(result); */
      if (result.error) {
        console.error('Error:', result.message);
        alert(result.message);
      } else {
        render(result.data);
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert(error.message);
    }
  };
//*************renderizado de tabla proveedor y mostrar tabla proveedor*******************/



//*****************************editar proveedor y guardar********************************/
const editProveedor = (id_proveedor) => {
    const row = document.getElementById(`Proveedor-row-${id_proveedor}`);
    const cells = row.getElementsByTagName('td');

    // Guardar los valores originales de todas las celdas
    const valoresOriginales = [];
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        valoresOriginales.push(cell.innerHTML);
    }

    // Iterar sobre las celdas de la fila, excepto la primera y las últimas tres
    for (let i = 1; i < cells.length - 3; i++) {
        const cell = cells[i];
        const oldValue = cell.innerText.trim();
        cell.innerHTML = `<input class="tab" type="text" value="${oldValue}" onkeyup="mayus(this);" style="width: 100%; ">`;
    }

    // Dejar la primera celda (id_proveedor) y las últimas tres celdas sin modificar
    for (let i = 0; i < 1; i++) {
        const cell = cells[i];
        // Aquí puedes dejar el contenido de la celda como está
    }
    for (let i = cells.length - 3; i < cells.length; i++) {
        const cell = cells[i];
        // Aquí puedes dejar el contenido de la celda como está
    }

    const editButton = cells[cells.length - 1].getElementsByTagName('button')[0];
    editButton.innerHTML = '<i class="fi fi-rr-check" style=" "></i>';
    editButton.classList.add('active'); // Agregar la clase 'active' al botón
    editButton.setAttribute('onclick', `saveChanges(${id_proveedor}, ${JSON.stringify(valoresOriginales)})`);
}

// Función para guardar los cambios realizados en la fila
const saveChanges = async (id_proveedor, valoresOriginales) => {
    const row = document.getElementById(`Proveedor-row-${id_proveedor}`);
    const cells = row.getElementsByTagName('td');
    const newValues = [];

    for (let i = 1; i < cells.length - 3; i++) {
        const cell = cells[i];
        const newValue = cell.getElementsByTagName('input')[0].value;
        newValues.push(newValue);
    }

    // Restaurar los valores de la primera celda (id_proveedor) y las últimas tres celdas
    for (let i = 0; i < 1; i++) {
        const cell = cells[i];
        cell.innerHTML = valoresOriginales[i];
    }
    for (let i = cells.length - 3; i < cells.length; i++) {
        const cell = cells[i];
        cell.innerHTML = valoresOriginales[i];
    }

    try {
        // Mostrar el SweetAlert2 antes de guardar los cambios
        const { isConfirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres guardar los cambios realizados?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, guardar',
        });
  
        if (isConfirmed) {
            const response = await fetch(`http://localhost:3009/La_holandesa/proveedor/${id_proveedor}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre_proveedor: newValues[0],
                    telefono: newValues[1],
                    descripcion: newValues[2],
                    direccion: newValues[3]
                })
            });
            
            if (response.status !== 200) {
                // Actualizar la tabla después de cambiar el estado
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    
                });
                Toast.fire({
                    icon: "error",
                    title: "Error al actualizar el proveedor"
                });
            }
            // Actualizar la tabla después de cambiar el estado
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                
            });
            Toast.fire({
                icon: "success",
                title: "Se actualizo correctamente"
            });
            getAll();
        }else {
            // Si el usuario cancela, ejecutar la función getAll()
            getAll();
        }
    } catch (error) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            
        });
        Toast.fire({
            icon: "error",
            title: "Ocurrio un error al actualizar proveedor"
        });
        // Eliminar la clase 'active' del botón
        editButton.classList.remove('active');
        getAll(); 
    }
}
//*****************************editar proveedor y guardar********************************/



//*******************************inavilitar, eliminar*********************************/
// CAmbiar state del proveedor (deshabilitacion logica)
const changeState = async (userId, currentState) => {
    try {
        let newState = true;
        if (currentState == true) {
            newState = false;
        }
        // Mostrar el SweetAlert2 antes de cambiar el estado
        const { isConfirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar el proveedor ${userId}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            background: 'rgba(255, 255, 255,)',
        });

        if (isConfirmed) {
            const response = await fetch(`http://localhost:3009/La_holandesa/proveedor/${userId}/state`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ state: newState }) // Cambiar el estado a 0
            });

            if (response.status !== 200) {
                // Actualizar la tabla después de cambiar el estado
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    
                });
                Toast.fire({
                    icon: "error",
                    title: "Error al eliminar el proveedor"
                });
            }

            // Actualizar la tabla después de cambiar el estado
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                
            });
              Toast.fire({
                icon: "success",
                title: "Se elimino correctamente"
             }
            );
            getAll();
        }
    } catch (error) {
        alert('Error ' + error);
        getAll();
    }
}
//*******************************inavilitar, eliminar*********************************/

getAll()
