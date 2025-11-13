# Todo APP – Prueba técnica de PayPros
Desarrollado por: Rodrigo Batista

Stack: NestJS · TypeScript · Prisma· MySQL · Docker

## Backend

Está desarrollado con **NestJS**, **Prisma ORM** y **JWT Authentication**, siguiendo los principios de **arquitectura hexagonal (Clean Architecture)**.

La aplicación se organiza por dominios (Users, Auth, Tasks), y cada módulo se estructura en tres capas principales:

- **Application Layer:** contiene los *use cases* (casos de uso), donde se encuentra la lógica de negocio.
- **Infrastructure Layer:** implementa los detalles técnicos, como la persistencia de datos mediante Prisma y los repositorios concretos.
- **Domain Layer:** define las entidades y contratos (interfaces, DTOs, etc.), completamente aisladas de las dependencias externas.

Cada capa tiene responsabilidades bien definidas, lo que facilita las pruebas unitarias, mejora la mantenibilidad y escalabilidad del código.

---

### Decisiones y aprendizajes

- Inicialmente se implementó el CRUD de **Tasks** en memoria. Luego se integró **Prisma** como ORM sin modificar la lógica de negocio, gracias a la abstracción proporcionada por los repositorios (`TasksRepository`).
  
- Antes de este proyecto, mi experiencia era principalmente con **Sequelize** y **TypeORM**. Investigué las particularidades de Prisma (tipado, migraciones, patrones de integración con NestJS) para implementarlo de la mejor manera posible.
  
- Se creó un decorador personalizado **`@CurrentUser()`** que permite acceder fácilmente al `userId` dentro de los controladores. De esta forma, las tareas pueden asociarse al usuario autenticado tanto al crearlas como al listarlas.

---

### Endpoints principales

| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| `POST` | `/user/register` | Crea un nuevo usuario |
| `POST` | `/auth/login` | Devuelve un JWT para autenticación |

Header requerido para las **rutas protegidas** de `Tasks`:
```bash
Authorization: Bearer <token>
```

| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| `GET` | `/tasks` | Lista las tareas del usuario autenticado |
| `POST` | `/tasks` | Crea una nueva tarea |
| `PATCH` | `/tasks/:id` | Actualiza una tarea existente |
| `PUT` | `/tasks/:id/status` | Actualiza el estado de una tarea |
| `DELETE` | `/tasks/:id` | Elimina una tarea |

---

## Ejecución y evaluación
La aplicación se dockerizó para simplificar la ejecución y evaluación.

El archivo `docker-compose.yml` levanta automáticamente:
- Una base de datos MySQL
- El servidor NestJS
- La configuración de entorno necesaria (variables embebidas para la prueba técnica)

El contenedor automáticamente:
- Instala dependencias necesarias.
- Ejecuta migraciones de Prisma.
- Inicia el servidor y expone la API.

⚠️ El servicio de base de datos no expone el puerto MySQL al host, como la comunicación entre contenedores ocurre dentro de la red interna de Docker, se tomo la decision de no exponer al host para evitar conflictos de puertos no disponibles.

### Pasos de ejecución:

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd <repo-name>

# 2. Levantar el entorno con Docker
docker compose up
```

Una vez iniciado, la API estará disponible en:
```bash
http://localhost:3000
```
