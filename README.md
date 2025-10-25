🏞️ Vive Tarquí - Sistema de Reservas Turísticas
Sistema web para la gestión de reservas turísticas, contactos y reseñas del destino turístico Vive Tarquí.
📋 Descripción
Vive Tarquí es una plataforma web desarrollada para promover y facilitar las reservas turísticas en Tarquí, Huila. El sistema permite a los usuarios explorar destinos, realizar reservas, contactar con los administradores y dejar reseñas sobre su experiencia.

✨ Características
🏨 Sistema de reservas turísticas
📧 Formulario de contacto
⭐ Sistema de reseñas y calificaciones
📱 Diseño responsive
🔒 Gestión segura de datos con variables de entorno

🛠️ Tecnologías Utilizadas
Frontend: HTML5 + Boostrap
Backend: Node.js + Express.js + MySQL

Dependencias principales
dotenv - Gestión de variables de entorno
mysql2 - Conexión con MySQL
cors - Manejo de CORS

📁 Estructura del Proyecto
vive-tarqui-sena/
├── frontend/
│   ├── index.html
│   ├── HTML/
│   └── assets/
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
└── README.md

🚀 Instalación y Configuración
Prerrequisitos
Node.js (versión 14 o superior)
MySQL (versión 5.7 o superior)
Git

1. Clonar el repositorio
bashgit clone https://github.com/danihache/vive-tarqui-sena.git
cd vive-tarqui-sena
2. Configurar la base de datos
Crea las bases de datos en MySQL:
sqlCREATE DATABASE contactodb;
CREATE DATABASE reservasdb;
CREATE DATABASE resenasdb;
3. Configurar el Backend
bashcd backend
npm install
4. Configurar variables de entorno
Copia el archivo .env.example a .env y completa con tus credenciales:
bashcp .env.example .env
Edita el archivo .env:
env# Configuración MySQL
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_PORT=3306

# Nombres de las bases de datos
DB_CONTACTOS=contactodb
DB_RESERVAS=reservasdb
DB_RESENAS=resenasdb

# Servidor
PORT=3000
NODE_ENV=development
5. Iniciar el servidor
bashnode server.js
El servidor estará corriendo en http://localhost:3000
6. Abrir el Frontend
Abre el archivo frontend/index.html en tu navegador o utiliza un servidor local como Live Server.

🗄️ Estructura de Base de Datos
Base de datos: contactodb
Gestiona los mensajes de contacto de los usuarios.
Base de datos: reservasdb
Almacena las reservas realizadas por los usuarios.
Base de datos: resenasdb
Guarda las reseñas y calificaciones de los visitantes.

🔒 Seguridad
Las credenciales sensibles están protegidas mediante variables de entorno
El archivo .env está incluido en .gitignore y no se sube al repositorio
Se utiliza .env.example como plantilla para configuración

📝 Scripts Disponibles
bash# Iniciar el servidor
node server.js

# Instalar dependencias
npm install

👥 Autor
Daniela - Tecnico en Programación de Software - SEAN
