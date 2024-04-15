//*********************************poner en mayuscula**********************************/
function mayus(e) {
    e.value = e.value.toUpperCase();
}
//*********************************poner en mayuscula**********************************/



//***********************************crear usuario*************************************/
const formAgregarUsuario = document.getElementById('myForm');

formAgregarUsuario.addEventListener("submit", async function(event) {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

    // Obtener los valores del formulario
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const perfil = document.getElementById('perfil').value; // Nuevo campo de perfil
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;


    try {
        // Enviar los datos al servidor para crear el nuevo usuario
        const response = await fetch('http://localhost:3009/La_holandesa/create_users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombres,
                apellidos,
                perfil,
                usuario,
                contraseña
            })
        });

        if (response.ok) {
            alert('Usuario creado correctamente');
            getAll();
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Error al crear usuario');
            getAll();
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Error al enviar la solicitud');
    }
});
//***********************************crear usuario*************************************/



//*************renderizado de tabla usuarios y mostrar tabla usuario*******************/
const users = document;

const paginaUsers = users.querySelector('#usuarios')

const Users = ({id_usuario, nombres, apellidos, perfil, usuario, contraseña, fecha_registro, estado}) => {
    // Convertir la fecha de registro a un formato de año-mes-día
    const formattedDate = new Date(fecha_registro).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    const buttonColor = estado === true ? 'green' : 'red';
    const buttontxt = estado === true ? 'SI' : 'NO';

    // Mostrar la contraseña como asteriscos
    /* const maskedPassword = contraseña.replace(/./g, '*'); */
    // Mostrar solo los últimos 4 caracteres de la contraseña cifrada
    /* const maskedPassword = `******${contraseña.slice(-4)}`; */
    // Mostrar la contraseña cifrada como asteriscos
    /* const maskedPassword = '*'.repeat(contraseña.length); */
    // Mostrar los primeros 2 y últimos 2 caracteres de la contraseña cifrada
    const maskedPassword = `${contraseña.slice(0, 2)}..${contraseña.slice(-2)}`;

    return `
        <tr id="user-row-${id_usuario}"> <!-- Agregar un ID único para la fila -->
            <td>${id_usuario}</td>
            <td>${nombres}</td>
            <td>${apellidos}</td>
            <td>${perfil}</td>
            <td>${usuario}</td>
            <td>${maskedPassword}</td>
            <td>${formattedDate}</td>
            <td>
            <div class="container-btn-state">
                <button class="btn-state" style="background-color: ${buttonColor}" >${buttontxt}</button>
            </div>
            </td>
            <td>
                <div class="button-eliminar-editar">
                    <button class="editar" onclick="editUser(${id_usuario})"><i class="fi fi-rr-pen-field"></i></button> <!-- Llamar a la función editUser -->
                    <button class="estado" onclick="changeState(${id_usuario}, ${estado})"><i class="fi fi-sr-cross-small"></i></button>
                </div>
            </td>
        </tr>
    `;
}

const render = (data) => {
    const filteredUsers = data.filter(user => user.estado == true);
    const sortedUsers = filteredUsers.sort((a, b) => a.id_usuario - b.id_usuario);
  
    if (Array.isArray(sortedUsers) && sortedUsers.length > 0) {
      const cardsHTML = sortedUsers.map(item => Users(item)).join('');
      paginaUsers.innerHTML = cardsHTML;
    } else {
      paginaUsers.innerHTML = '<tr><td colspan="8">NO SE ENCONTRARON USUARIOS.</td></tr>';
    }
  };
  
  const getAll = async () => {
    try {
      const response = await fetch('http://localhost:3009/La_holandesa/Users');
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
//*************renderizado de tabla usuarios y mostrar tabla usuario*******************/



//*****************************editar usuario y guardar********************************/
const editUser = (id_usuario) => {
    const row = document.getElementById(`user-row-${id_usuario}`);
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

    // Dejar la primera celda (id_usuario) y las últimas tres celdas sin modificar
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
    editButton.setAttribute('onclick', `saveChanges(${id_usuario}, ${JSON.stringify(valoresOriginales)})`);
}

// Función para guardar los cambios realizados en la fila
const saveChanges = async (id_usuario, valoresOriginales) => {
    const row = document.getElementById(`user-row-${id_usuario}`);
    const cells = row.getElementsByTagName('td');
    const newValues = [];

    for (let i = 1; i < cells.length - 3; i++) {
        const cell = cells[i];
        const newValue = cell.getElementsByTagName('input')[0].value;
        newValues.push(newValue);
    }

    // Restaurar los valores de la primera celda (id_usuario) y las últimas tres celdas
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
            const response = await fetch(`http://localhost:3009/La_holandesa/Users/${id_usuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombres: newValues[0],
                    apellidos: newValues[1],
                    perfil: newValues[2],
                    usuario: newValues[3],
                    fecha_registro: newValues[4],
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
                    title: "Error al actualizar el usuario"
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
            title: "Ocurrio un error al actualizar usuario"
        });
        // Eliminar la clase 'active' del botón
        editButton.classList.remove('active');
        getAll(); 
    }
}
//*****************************editar usuario y guardar********************************/



//*******************************inavilitar, eliminar*********************************/
const changeState = async (userId, currentState) => {
    try {
        let newState = true;
        if (currentState == true) {
            newState = false;
        }
        // Mostrar el SweetAlert2 antes de cambiar el estado
        const { isConfirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar el usuario ${userId}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            background: 'rgba(255, 255, 255,)',
        });

        if (isConfirmed) {
            const response = await fetch(`http://localhost:3009/La_holandesa/Users/${userId}/state`, {
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
                    title: "Error al eliminar el usuario"
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
