# Sistema de Gestión de Beneficiarios

Aplicación web para la gestión de beneficiarios de un programa social multi-país. Permite el registro, búsqueda y administración de beneficiarios con validaciones específicas por tipo de documento y país.

## Stack Tecnológico

- **Backend**: .NET 8, Entity Framework Core, SQL Server
- **Frontend**: React 18, TypeScript, TailwindCSS, React Hook Form
- **Base de Datos**: SQL Server 2022 (Containerizado)
- **Infraestructura**: Docker Compose

## Requisitos Previos

- .NET SDK 8.0+
- Node.js 18+
- Docker Desktop

## Configuración y Ejecución

### 1. Base de Datos

El proyecto está configurado para funcionar con SQL Server. Tienes dos opciones:

#### Opción A: Usar Docker (Recomendado para aislamiento)
Si prefieres no instalar SQL Server localmente o quieres un entorno limpio:

```bash
docker-compose up -d
```
Esto levantará una instancia de SQL Server 2022 y ejecutará automáticamente los scripts de inicialización.

#### Opción B: SQL Server Local
Si ya tienes SQL Server instalado:

1. Asegúrate de que tu instancia esté corriendo.
2. Actualiza la cadena de conexión en `Backend/appsettings.json` si es necesario (por defecto espera usuario `sa` y password `Password123!`).
3. Ejecuta los scripts SQL ubicados en la carpeta `database/` en el siguiente orden:
   - `01-create-database.sql` (si no existe la BD)
   - `02-stored-procedures.sql` (si aplica)
   - `03-seed-data.sql` (para poblar datos iniciales)

### 2. Backend (.NET)

```bash
cd Backend
dotnet restore
dotnet run
```

La API estará disponible en: `http://localhost:5000`
Swagger UI: `http://localhost:5000/swagger`

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

## Características Implementadas

- **CRUD Completo**: Gestión de beneficiarios (Crear, Leer, Actualizar, Eliminar).
- **Validaciones Dinámicas**: Reglas de validación de documentos adaptables según el país seleccionado (longitud, tipo de caracteres).
- **Búsqueda y Filtrado**: Búsqueda en tiempo real por nombre o documento.
- **Paginación**: Paginación del lado del cliente con selectores de tamaño de página.
- **Diseño Responsive**: Interfaz moderna construida con TailwindCSS.

## Arquitectura

El proyecto sigue una arquitectura de capas simple:
- **Controladores**: Manejo de peticiones HTTP.
- **Modelos**: Definición de entidades y DTOs.
- **Data**: Contexto de EF Core y configuración de base de datos.

## Decisiones Técnicas

- Se utilizó **Entity Framework Core** con enfoque Code-First (aunque la BD se inicializa con scripts para este demo).
- **React Hook Form** para manejo eficiente de formularios y validaciones complejas.
- **TailwindCSS** para un desarrollo rápido de UI consistente.
- **Docker** para garantizar un entorno de base de datos reproducible.
