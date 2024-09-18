$(document).ready(function() {
    // Manejar el envío del formulario
    $('#task-form').on('submit', function(event) {
        event.preventDefault();

        const taskName = $('#task-name').val().trim();
        const taskDescription = $('#task-description').val().trim();
        const taskAssignee = $('#task-assignee').val().trim();
        const taskProvider = $('#task-provider').val().trim();

        if (taskName === '') {
            alert('Por favor, ingrese el nombre de la tarea.');
            return;
        }

        // Crear un nuevo elemento de tarea
        const taskItem = $(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <h5>${taskName}</h5>
                    <p>${taskDescription}</p>
                    <small><strong>Asignado a:</strong> ${taskAssignee}</small><br>
                    <small><strong>Proveedor:</strong> ${taskProvider}</small>
                </div>
                <div>
                    <button class="btn btn-success btn-sm mr-2 complete-task">Completar</button>
                    <button class="btn btn-danger btn-sm delete-task">Eliminar</button>
                </div>
            </li>
        `);

        // Agregar la tarea a la lista
        $('#task-list').append(taskItem);

        // Limpiar el formulario
        $('#task-name').val('');
        $('#task-description').val('');
        $('#task-assignee').val('');
        $('#task-provider').val('');
    });

    // Manejar el clic en el botón "Completar"
    $('#task-list').on('click', '.complete-task', function() {
        $(this).closest('li').toggleClass('completed');
    });

    // Manejar el clic en el botón "Eliminar"
    $('#task-list').on('click', '.delete-task', function() {
        $(this).closest('li').remove();
    });
});
