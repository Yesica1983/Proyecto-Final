$(document).ready(function() {
    // Manejar el envío del formulario
    $('#task-form').on('submit', function(event) {
        event.preventDefault();

        const taskName = $('#task-name').val().trim();
        const taskDescription = $('#task-description').val().trim();
        const taskAssignee = $('#task-assignee').val().trim();
        const taskProvider = $('#task-provider').val().trim();

        // Validaciones
        if (taskName === '') {
            alert('Por favor, ingrese el nombre de la tarea.');
            return;
        }
        if (taskName.length > 50) {
            alert('El nombre de la tarea no puede exceder los 50 caracteres.');
            return;
        }
        if (taskDescription.length > 200) {
            alert('La descripción no puede exceder los 200 caracteres.');
            return;
        }
        if (taskAssignee.length > 50) {
            alert('El nombre del asignado no puede exceder los 50 caracteres.');
            return;
        }
        if (taskProvider.length > 50) {
            alert('El nombre del proveedor no puede exceder los 50 caracteres.');
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
            url: 'http://localhost:3000/api/tasks',
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
                            <button class="btn btn-warning btn-sm edit-task">Editar</button>
                        </div>
                    </li>
                `);
                $('#task-list').append(taskItem);
                $('#message').text('Tarea enviada con éxito.').removeClass('d-none');
                setTimeout(() => $('#message').addClass('d-none'), 3000);
            },
            error: function(xhr) {
                console.error(xhr.responseText);
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
        taskItem.find('.task-content').toggleClass('completed');
    });

    // Manejar el clic en el botón "Eliminar"
    $('#task-list').on('click', '.delete-task', function() {
        const taskItem = $(this).closest('li');
        const taskId = taskItem.data('id');

        // Enviar solicitud para eliminar la tarea
        $.ajax({
            url: `http://localhost:3000/api/tasks/${taskId}`,
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

    // Manejar el clic en el botón "Editar"
    $('#task-list').on('click', '.edit-task', function() {
        const taskItem = $(this).closest('li');
        const taskId = taskItem.data('id');
        const taskName = taskItem.find('h5').text();
        const taskDescription = taskItem.find('p').text();
        const taskAssignee = taskItem.find('small').eq(0).text().replace('Asignado a: ', '');
        const taskProvider = taskItem.find('small').eq(1).text().replace('Proveedor: ', '');

        // Rellenar el formulario de edición
        $('#task-name').val(taskName);
        $('#task-description').val(taskDescription);
        $('#task-assignee').val(taskAssignee);
        $('#task-provider').val(taskProvider);

        // Cambiar el comportamiento del formulario para editar
        $('#task-form').off('submit').on('submit', function(event) {
            event.preventDefault();
            const updatedTask = {
                name: $('#task-name').val().trim(),
                description: $('#task-description').val().trim(),
                assignee: $('#task-assignee').val().trim(),
                provider: $('#task-provider').val().trim()
            };

            // Validaciones para la edición
            if (updatedTask.name === '') {
                alert('Por favor, ingrese el nombre de la tarea.');
                return;
            }
            if (updatedTask.name.length > 50) {
                alert('El nombre de la tarea no puede exceder los 50 caracteres.');
                return;
            }
            if (updatedTask.description.length > 200) {
                alert('La descripción no puede exceder los 200 caracteres.');
                return;
            }
            if (updatedTask.assignee.length > 50) {
                alert('El nombre del asignado no puede exceder los 50 caracteres.');
                return;
            }
            if (updatedTask.provider.length > 50) {
                alert('El nombre del proveedor no puede exceder los 50 caracteres.');
                return;
            }

            $.ajax({
                url: `http://localhost:3000/api/tasks/${taskId}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updatedTask),
                success: function(task) {
                    taskItem.find('h5').text(task.name);
                    taskItem.find('p').text(task.description);
                    taskItem.find('small').eq(0).text(`Asignado a: ${task.assignee}`);
                    taskItem.find('small').eq(1).text(`Proveedor: ${task.provider}`);
                    $('#message').text('Tarea editada con éxito.').removeClass('d-none');
                    setTimeout(() => $('#message').addClass('d-none'), 3000);
                },
                error: function() {
                    $('#message').text('Error al editar la tarea.').removeClass('d-none');
                    setTimeout(() => $('#message').addClass('d-none'), 3000);
                }
            });

            // Limpiar el formulario
            $('#task-name').val('');
            $('#task-description').val('');
            $('#task-assignee').val('');
            $('#task-provider').val('');
        });
    });
});
