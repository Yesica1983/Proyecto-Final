

# API de Gestión de Tareas - Tienda de Zapatillas

## Descripción

Esta API permite a los empleados gestionar tareas relacionadas con la tienda de zapatillas. Los empleados pueden agregar, editar y eliminar tareas, 
que incluyen una descripción, un nombre y un proveedor. Las tareas se envían desde el frontend.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express
- **Base de Datos**: PostgreSQL
- **Frontend**: HTML, CSS (Bootstrap), JavaScript
- **Herramientas de prueba**: Postman, CURL

## Estructura del Proyecto

- **Backend**: 
  - Puerto: `3000`
  - CRUD para tareas (crear, leer, actualizar, eliminar)
  
- **Base de Datos**: 
  - PostgreSQL en el puerto `5432`
  - Modelo entidad-relación basado en [Lucidchart](https://lucid.app/documents#/documents?folder_id=starred).

- **Frontend**:
  - Puerto: `3500` (donde se ejecuta el HTML)
  - Interfaz para agregar, editar y eliminar tareas. Las solicitudes se envían desde el frontend al backend.

## Endpoints

Aquí hay una lista de los principales endpoints de la API:

- `POST /tareas`: Agregar una nueva tarea (enviada desde el frontend)
- `GET /tareas`: Obtener todas las tareas
- `GET /tareas/:id`: Obtener una tarea específica
- `PUT /tareas/:id`: Actualizar una tarea
- `DELETE /tareas/:id`: Eliminar una tarea

## Pasos para Acceder a la API

    1 **Clonar el Repositorio**:
   ```bash
      git clone https://github.com/Yesica1983/Proyecto-Final.git
       cd Proyecto-Final
2  ** Instalar Dependencias:
              npm install
           3  ** Configurar la Base de Datos: Asegúrate de tener PostgreSQL corriendo y configurado según el modelo de datos.
            
           4**   Iniciar el Servidor Backend:
                   npm start
             
            5** Acceder a la Aplicación Frontend: Abre tu navegador y visita   
                       http://localhost:3500.

             6** Interacción con la API: Utiliza Postman o cURL para probar los endpoints de la API.
