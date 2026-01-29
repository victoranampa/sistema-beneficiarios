# Sistema de Gestión de Beneficiarios

Sistema Full Stack para gestionar beneficiarios de un programa social multi-país con validaciones condicionales de documentos de identidad.

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** con TypeScript
- **Vite** como build tool
- **TailwindCSS** para estilos
- **React Hook Form** para manejo de formularios
- **Axios** para peticiones HTTP
- **React Icons** para iconografía

### Backend
- **.NET 8** Web API
- **Entity Framework Core** para ORM
- **SQL Server** como base de datos
- **Swagger** para documentación de API

### Base de Datos
- **SQL Server 2022** en Docker
- Stored Procedures para operaciones CRUD
- Validaciones a nivel de base de datos

---

## 📋 Requisitos Previos

Asegúrese de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [.NET SDK 8.0](https://dotnet.microsoft.com/download)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/)

---

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd sistema-beneficiarios
```

### 2. Configurar la Base de Datos

Iniciar SQL Server con Docker Compose:

```bash
docker-compose up -d
```

Esperar unos segundos para que SQL Server inicie completamente, luego ejecutar los scripts:

```bash
# Crear tablas
docker exec -i sqlserver-beneficiarios /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'Password123!' -C -i /docker-entrypoint-initdb.d/01-create-tables.sql

# Crear stored procedures
docker exec -i sqlserver-beneficiarios /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'Password123!' -C -i /docker-entrypoint-initdb.d/02-stored-procedures.sql

# Insertar datos de ejemplo
docker exec -i sqlserver-beneficiarios /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'Password123!' -C -i /docker-entrypoint-initdb.d/03-seed-data.sql
```

> **Nota:** Los scripts ya han sido ejecutados automáticamente. La base de datos está lista para usar.

### 3. Configurar el Backend

```bash
cd Backend

# Restaurar dependencias
dotnet restore

# Compilar el proyecto
dotnet build
```

### 4. Configurar el Frontend

```bash
cd frontend

# Instalar dependencias
npm install
```

---

## ▶️ Ejecutar el Proyecto

### Iniciar el Backend

```bash
cd Backend
dotnet run
```

El backend estará disponible en:
- API: http://localhost:5000
- Swagger UI: http://localhost:5000/swagger

### Iniciar el Frontend

En otra terminal:

```bash
cd frontend
npm run dev
```

El frontend estará disponible en: http://localhost:5173

---

## 📊 Estructura del Proyecto

```
sistema-beneficiarios/
├── Backend/
│   ├── Controllers/
│   │   ├── BeneficiariosController.cs
│   │   └── DocumentosController.cs
│   ├── Data/
│   │   └── ApplicationDbContext.cs
│   ├── Models/
│   │   ├── Beneficiario.cs
│   │   └── DocumentoIdentidad.cs
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── appsettings.json
│   ├── Backend.csproj
│   └── Program.cs
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BeneficiarioForm.tsx
│   │   │   └── BeneficiarioList.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
├── database/
│   ├── 01-create-tables.sql
│   ├── 02-stored-procedures.sql
│   └── 03-seed-data.sql
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🔌 Endpoints de la API

### Documentos de Identidad

- `GET /api/documentos` - Obtener todos los documentos activos
- `GET /api/documentos/{id}` - Obtener un documento por ID

### Beneficiarios

- `GET /api/beneficiarios` - Listar todos los beneficiarios
- `GET /api/beneficiarios/{id}` - Obtener un beneficiario por ID
- `POST /api/beneficiarios` - Crear un nuevo beneficiario
- `PUT /api/beneficiarios/{id}` - Actualizar un beneficiario
- `DELETE /api/beneficiarios/{id}` - Eliminar un beneficiario

---

## ✨ Características Principales

### Validación Condicional de Documentos

El sistema implementa validación dinámica del número de documento según el tipo seleccionado:

- **DNI (Perú)**: 8 dígitos numéricos
- **Pasaporte**: 9 caracteres alfanuméricos
- **Cédula (Ecuador)**: 10 dígitos numéricos
- **RUT (Chile)**: 9 caracteres alfanuméricos
- **Cédula (Colombia)**: 10 dígitos numéricos
- **Carnet de Extranjería (Perú)**: 9 caracteres alfanuméricos

### Funcionalidades

- ✅ Crear beneficiarios con validación en tiempo real
- ✅ Editar beneficiarios existentes
- ✅ Eliminar beneficiarios con confirmación
- ✅ Listado con información completa
- ✅ Cálculo automático de edad
- ✅ Interfaz responsive y moderna
- ✅ Feedback visual de errores y éxitos
- ✅ Validaciones tanto en frontend como backend

---

## 🗄️ Tipos de Documentos Disponibles

| ID | Documento | Abreviatura | País | Longitud | Solo Números |
|----|-----------|-------------|------|----------|--------------|
| 1 | Documento Nacional de Identidad | DNI | Perú | 8 | Sí |
| 2 | Pasaporte | PAS | Internacional | 9 | No |
| 3 | Cédula de Identidad | CED-EC | Ecuador | 10 | Sí |
| 4 | Rol Único Tributario | RUT | Chile | 9 | No |
| 5 | Cédula de Ciudadanía | CED-CO | Colombia | 10 | Sí |
| 6 | Carnet de Extranjería | CE | Perú | 9 | No |

---

## 🧪 Pruebas

### Probar el Backend

1. Abrir http://localhost:5000/swagger
2. Probar el endpoint `GET /api/documentos` - debe retornar 6 documentos
3. Crear un beneficiario con `POST /api/beneficiarios`
4. Verificar que aparece en `GET /api/beneficiarios`

### Probar el Frontend

1. Abrir http://localhost:5173
2. Seleccionar un tipo de documento
3. Verificar que el campo de número de documento muestra las restricciones correctas
4. Intentar ingresar un número inválido y verificar el mensaje de error
5. Crear un beneficiario completo
6. Verificar que aparece en la lista
7. Editar y eliminar el beneficiario

---

## 🐳 Comandos Docker Útiles

```bash
# Ver logs de SQL Server
docker logs sqlserver-beneficiarios

# Detener SQL Server
docker-compose down

# Reiniciar SQL Server
docker-compose restart

# Conectarse a SQL Server
docker exec -it sqlserver-beneficiarios /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'Password123!' -C
```

---

## 🔧 Solución de Problemas

### El backend no se conecta a la base de datos

- Verificar que SQL Server está corriendo: `docker ps`
- Verificar la cadena de conexión en `Backend/appsettings.json`
- Esperar unos segundos después de iniciar Docker para que SQL Server esté listo

### El frontend no se conecta al backend

- Verificar que el backend está corriendo en http://localhost:5000
- Verificar la configuración de CORS en `Backend/Program.cs`
- Verificar la URL de la API en `frontend/src/services/api.ts`

### Error al crear beneficiario

- Verificar que el número de documento cumple con las reglas del tipo seleccionado
- Verificar que no existe otro beneficiario con el mismo número de documento
- Revisar la consola del navegador para más detalles

---

## 👨‍💻 Desarrollo

### Agregar un nuevo tipo de documento

1. Insertar en la tabla `DocumentoIdentidad` en SQL Server
2. El frontend lo detectará automáticamente

### Modificar validaciones

- **Frontend**: Editar `frontend/src/components/BeneficiarioForm.tsx`
- **Backend**: Editar `Backend/Controllers/BeneficiariosController.cs`

---

## 📝 Licencia

Este proyecto fue desarrollado como caso de evaluación para PowerIMas - Enero 2026.

---

## 📧 Contacto

Para consultas sobre este proyecto, contactar a PowerIMas.

**PowerIMas** - Sistema de Gestión de Beneficiarios © 2026
