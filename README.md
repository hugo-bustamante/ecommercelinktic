# ecommercelinktic

Este repositorio contiene los tres servicios que componen el sistema de E-commerce Linktic: uno para gestionar el catálogo de productos, otro para gestionar los pedidos y un frontend desarrollado en Angular.

## Backend: Gestión del Catálogo de Productos

Este servicio se desarrolló utilizando Java, Spring Boot y JPA para la gestión del catálogo de productos. Se utiliza MySQL como base de datos.

### Ejecución del Servicio

1. Antes de iniciar el servicio, asegúrate de haber creado la base de datos MySQL. Puedes hacerlo utilizando el comando SQL adecuado en tu cliente de MySQL.
2. Ejecuta el siguiente comando en la raíz del proyecto:

mvn spring-boot:run

Este comando iniciará el servidor Spring Boot junto con la base de datos MySQL.

### Ejecución de Pruebas

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:

mvn test

## Backend: Gestión de Pedidos

Este servicio se desarrolló utilizando Node.js para gestionar los pedidos. Se utiliza una base de datos local (MySQL) para almacenar los datos.

### Ejecución del Servicio

1. Antes de iniciar el servicio, asegúrate de haber creado la base de datos MySQL. Puedes hacerlo utilizando el comando SQL adecuado en tu cliente de MySQL.
2. Ejecuta el siguiente comando en la raíz del proyecto:

npm start

Este comando iniciará el servidor Node.js junto con la base de datos MySQL.

## Frontend

El frontend de la aplicación se desarrolló utilizando Angular.

### Ejecución del Servicio

1. Ejecuta el siguiente comando en la raíz del proyecto:

npm start

Este comando iniciará el servidor de desarrollo de Angular.

### Compilación de la Aplicación

Para compilar la aplicación Angular, utiliza el siguiente comando:

npm run build

Este comando compilará la aplicación y generará los archivos necesarios en el directorio `dist`.

### Ejecución de Pruebas Unitarias

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:

npm test

### Observación de Cambios en Archivos

Para observar cambios en los archivos y recargar automáticamente el servidor de desarrollo, utiliza el siguiente comando:

npm run watch

Una vez que hayas iniciado los servidores de los tres microservicios, podrás acceder a la aplicación desde los diferentes puertos.

Recuerda que los servicios backend para cada uno levantas una base de datos diferente, las credenciales de esas bases de datos las configuras tu, en el servicio de catalogos de productos lo haces desde el archivo application.properties lo haces desde el modelo en el archivo order.js