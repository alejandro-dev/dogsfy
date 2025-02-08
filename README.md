# Dogsfy - Indigitall

## Descripción
Esta es una API desarrollada en Node.js que implementa autenticación, CRUD de usuarios y funcionalidades para gestionar amigos.  

- **Autenticación**: Registro y login de usuarios con JWT.  
- **CRUD de Usuarios**: Añadir, consultar, actualizar y eliminar usuarios.  
- **Amigos**: Agregar, eliminar y consultar amigos.  
- **Base de Datos**: Según el hemisferio del usuario, se almacena en diferentes bases de datos.  

---

## Tecnologías Utilizadas
- **Node.js** + **Express**
- **TypeScript**
- **JWT** para autenticación
- **SQLite** como base de datos
- **express-validator** para validaciones
- **bcrypt** para el manejo de contraseñas
- **dotenv** para configuración segura

---

## Instalación y Uso

Instalar dependencias
  ```
  npm install
  ```

Configurar variables de entorno
  ```
    PORT=port
    NODE_ENV=production
    JWT_SECRET=your-secret
  ```

Crear la base de datos
  ```
  npm run create-db
  ```

Ejecutar en desarrollo
  ```
  npm run dev
  ```

Construir para producción
  ```
  npm run build
  ```

Ejecutar en producción
  ```
  npm start
  ```

---

## Endpoints

Authentication

| Método  | Ruta                 | Descripción          |
|---------|----------------------|----------------------|
| POST    | /api/auth/register   | Registro de usuario  |
| POST    | /api/auth/login      | Inicio de sesión     |


Users 

| Método  | Ruta                 | Descripción                 |
|---------|----------------------|-----------------------------|
| POST    | /api/users           | Registro de usuario         |
| GET     | /api/users/:id       | Obtener un usuario          |
| PUT     | /api/users/:id       | Actualizar un usuario       |
| DELETE  | /api/users/:id       | Eliminar un usuario         |
| GET     | /api/users           | Obtener todos los usuarios  |


Friends  

| Método  | Ruta                 | Descripción                 |
|---------|----------------------|-----------------------------|
| POST    | /api/friends         | Agregar un amigo            |
| DELETE  | /api/friends/:id     | Eliminar un amigo           |
| GET     | /api/friends         | Consultar amigos            |


## Queries
Listado de amigos de un usuario determinado:
  ```
  SELECT DISTINCT friend_id 
    FROM friends 
    WHERE user_id = ?
    UNION
    SELECT DISTINCT user_id as friend_id
    FROM friends 
    WHERE friend_id = ?
  ```

Número de amigos de un usuario determinado:
  ```
  SELECT COUNT(DISTINCT friend_id) as total_friends
    FROM friends 
    WHERE user_id = ?
    UNION
    SELECT DISTINCT user_id as friend_id
    FROM friends 
    WHERE friend_id = ?
  ```
