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

        // Crear un nuevo objeto de tarea
        const newTask = {
            name: taskName,
            description: taskDescription,
            assignee: taskAssignee,
            provider: taskProvider
        };

        // Enviar la tarea a la API
        $.ajax({
            url: '/api/tasks',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newTask),
            success: function(task) {
                const taskItem = $(`
                    <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${task.id}">
                        <div class="task-content">
                            <h5>${task.name}</h5>
                            <p>${task.description}</p>
                            <small><strong>Asignado a:</strong> ${task.assignee}</small><br>
                            <small><strong>Proveedor:</strong> ${task.provider}</small>
                        </div>
                        <div>
                            <button class="btn btn-success btn-sm mr-2 complete-task">Completar</button>
                            <button class="btn btn-danger btn-sm delete-task">Eliminar</button>
                        </div>
                    </li>
                `);
                $('#task-list').append(taskItem);
                $('#message').text('Tarea enviada con éxito.').removeClass('d-none');
                setTimeout(() => $('#message').addClass('d-none'), 3000);
            },
            error: function() {
                $('#message').text('Error al enviar la tarea.').removeClass('d-none');
                setTimeout(() => $('#message').addClass('d-none'), 3000);
            }
        });

        // Limpiar el formulario
        $('#task-name').val('');
        $('#task-description').val('');
        $('#task-assignee').val('');
        $('#task-provider').val('');
    });

    // Manejar el clic en el botón "Completar"
    $('#task-list').on('click', '.complete-task', function() {
        const taskItem = $(this).closest('li');
        const taskId = taskItem.data('id');
        
        // Lógica para marcar como completada
        // Puedes implementar una llamada a la API aquí si es necesario
        taskItem.find('.task-content').toggleClass('completed');
    });

    // Manejar el clic en el botón "Eliminar"
    $('#task-list').on('click', '.delete-task', function() {
        const taskItem = $(this).closest('li');
        const taskId = taskItem.data('id');

        // Enviar solicitud para eliminar la tarea
        $.ajax({
            url: `/api/tasks/${taskId}`,
            type: 'DELETE',
            success: function() {
                taskItem.remove();
                $('#message').text('Tarea eliminada con éxito.').removeClass('d-none');
                setTimeout(() => $('#message').addClass('d-none'), 3000);
            },
            error: function() {
                $('#message').text('Error al eliminar la tarea.').removeClass('d-none');
                setTimeout(() => $('#message').addClass('d-none'), 3000);
            }
        });
    });
});
