//*********************************poner en mayuscula**********************************/
function mayus(e) {
    e.value = e.value.toUpperCase();
}
//*********************************poner en mayuscula**********************************/



//***********************************crear categoria*************************************/
const formAgregarUsuario = document.getElementById('myForm');

formAgregarUsuario.addEventListener("submit", async function(event) {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

    // Obtener los valores del formulario
    const nombre_categoria = document.getElementById('nombre_categoria').value;
    const descripcion = document.getElementById('descripcion').value;
    
    try {
        // Enviar los datos al servidor para crear el nuevo usuario
        const response = await fetch('http://localhost:3009/La_holandesa/create_categoria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre_categoria,
                descripcion
            })
        });

        if (response.ok) {
            alert('Categoria creada correctamente');
            getAll();
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Error al crear Categoria');
            getAll();
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Error al enviar la solicitud');
    }
}); 
//***********************************crear usuario*************************************/


//*************renderizado de tabla categoria y mostrar tabla categoria*******************/
const categorias = document;

const paginaCategorias = categorias.querySelector('#categorias')

const Categorias = ({id_categoria, nombre_categoria, descripcion, fecha_registro, estado}) => {
    // Convertir la fecha de registro a un formato de año-mes-día
    const formattedDate = new Date(fecha_registro).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });

    const buttonColor = estado === true ? 'green' : 'red';
    const buttontxt = estado === true ? 'SI' : 'NO';

    return `
        <tr id="categoria-row-${id_categoria}"> <!-- Agregar un ID único para la fila -->
            <td>${id_categoria}</td>
            <td>${nombre_categoria}</td>
            <td>${descripcion}</td>
            <td>${formattedDate}</td>
            <td>
            <div class="container-btn-state">
                <button class="btn-state" style="background-color: ${buttonColor}" >${buttontxt}</button>
            </div>
            </td>
            <td>
                <div class="button-eliminar-editar">
                    <button class="editar" onclick="editCategoria(${id_categoria})"><i class="fi fi-rr-pen-field"></i></button> <!-- Llamar a la función editCategoria -->
                    <button class="estado" onclick="changeState(${id_categoria}, ${estado})"><i class="fi fi-sr-cross-small"></i></button>
                </div>
            </td>
        </tr>
    `;
}
const render = (data) => {
    const filteredCategories = data.filter(category => category.estado == true);
    const sortedCategoria = filteredCategories.sort((a, b) => a.id_categoria - b.id_categoria);
  
    if (Array.isArray(sortedCategoria) && sortedCategoria.length > 0) {
      const cardsHTML = sortedCategoria.map(item => Categorias(item)).join('');
      paginaCategorias.innerHTML = cardsHTML;
    } else {
      paginaCategorias.innerHTML = '<tr><td colspan="8">NO SE ENCONTRARON CATEGORIAS.</td></tr>';
    }
  };

  const getAll = async () => {
    try {
      const response = await fetch('http://localhost:3009/La_holandesa/categoria');
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
//*************renderizado de tabla categoria y mostrar tabla categoria*******************/



//*****************************editar categoria y guardar********************************/
const editCategoria = (id_categoria) => {
    const row = document.getElementById(`categoria-row-${id_categoria}`);
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

    // Dejar la primera celda (id_categoria) y las últimas tres celdas sin modificar
    for (let i = 0; i < 1; i++) {
        const cell = cells[i];
        // Aquí puedes dejar el contenido de la celda como está
    }
    for (let i = cells.length - 3; i < cells.length; i++) {
        const cell = cells[i];
        // Aquí puedes dejar el contenido de la celda como está
      }

    const editButton = cells[cells.length - 1].getElementsByTagName('button')[0];
    editButton.innerHTML = '<i class="fi fi-rr-check"></i>';
    editButton.classList.add('active'); // Agregar la clase 'active' al botón
    editButton.setAttribute('onclick', `saveChanges(${id_categoria}, ${JSON.stringify(valoresOriginales)})`);
}

// Función para guardar los cambios realizados en la fila
const saveChanges = async (id_categoria , valoresOriginales) => {
    const row = document.getElementById(`categoria-row-${id_categoria}`);
    const cells = row.getElementsByTagName('td');
    const newValues = [];

    for (let i = 1; i < cells.length - 3; i++) {
        const cell = cells[i];
        const newValue = cell.getElementsByTagName('input')[0].value;
        newValues.push(newValue);
    }

    // Restaurar los valores de la primera celda (id_categoria) y las últimas tres celdas
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
            const response = await fetch(`http://localhost:3009/La_holandesa/categoria/${id_categoria}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre_categoria: newValues[0],
                    descripcion: newValues[1],
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
                    title: "Error al actualizar la categoria"
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
        } else {
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
            title: "Ocurrio un error al actualizar la categoria"
        });
        // Eliminar la clase 'active' del botón
        editButton.classList.remove('active');
        getAll(); 
    }
}
//*****************************editar categoria y guardar********************************/



//*******************************inavilitar, eliminar*********************************/
// CAmbiar state del usaurio (deshabilitacion logica)
const changeState = async (userId, currentState) => {
    try {
        let newState = true;
        if (currentState == true) {
            newState = false;
        }

        // Mostrar el SweetAlert2 antes de cambiar el estado
        const { isConfirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar la categoria ${userId}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            background: 'rgba(255, 255, 255,)',
        });

        if (isConfirmed) {
            const response = await fetch(`http://localhost:3009/La_holandesa/categoria/${userId}/state`, {
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
                    title: "Error al eliminar la categoria"
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
