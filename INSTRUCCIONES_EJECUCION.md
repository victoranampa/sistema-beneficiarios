# Instrucciones para Ejecutar el Proyecto

## ✅ Estado Actual

### Frontend (React) - ✅ CORRIENDO
- **URL:** http://localhost:5173
- **Estado:** Servidor de desarrollo activo
- **Terminal:** Ejecutándose en background

### Backend (.NET) - ⏳ PENDIENTE
- **Estado:** Código completo, esperando instalación de .NET SDK
- **Requerimiento:** Completar instalación de .NET SDK (en progreso)

### Base de Datos (SQL Server) - ✅ CORRIENDO
- **Estado:** Activo y saludable
- **Puerto:** 1433
- **Container:** sqlserver-beneficiarios
- **Datos:** 6 tipos de documentos insertados

---

## 🚀 Acceder al Frontend

El frontend ya está corriendo. Abre tu navegador en:

```
http://localhost:5173
```

**Nota:** El frontend mostrará errores de conexión porque el backend aún no está corriendo. Esto es normal.

---

## 🔧 Iniciar el Backend (Cuando .NET SDK esté instalado)

### Opción 1: Usar el script automático

```bash
cd /Users/victoranampa/Documents/Proyectos/sistema-beneficiarios
./start-backend.sh
```

### Opción 2: Comandos manuales

```bash
cd /Users/victoranampa/Documents/Proyectos/sistema-beneficiarios/Backend

# Restaurar dependencias
dotnet restore

# Compilar
dotnet build

# Ejecutar
dotnet run
```

El backend estará disponible en:
- **API:** http://localhost:5000
- **Swagger:** http://localhost:5000/swagger

---

## 🧪 Probar el Sistema Completo

Una vez que el backend esté corriendo:

### 1. Verificar Backend en Swagger

Abrir: http://localhost:5000/swagger

Probar:
- `GET /api/documentos` → Debe retornar 6 tipos de documentos
- `GET /api/beneficiarios` → Debe retornar lista vacía inicialmente

### 2. Usar el Frontend

Abrir: http://localhost:5173

**Flujo de prueba:**

1. **Seleccionar tipo de documento**
   - Elegir "Documento Nacional de Identidad (DNI) - Perú"
   - Observar que el campo muestra: "8 caracteres (solo números)"

2. **Probar validación**
   - Intentar ingresar letras → Error: "Solo se permiten números"
   - Ingresar 7 dígitos → Error: "Debe tener exactamente 8 caracteres"
   - Ingresar 9 dígitos → Error: "Debe tener exactamente 8 caracteres"
   - Ingresar exactamente 8 dígitos → ✅ Válido

3. **Crear beneficiario**
   - Nombres: Juan Carlos
   - Apellidos: Pérez García
   - Tipo de documento: DNI
   - Número: 12345678
   - Fecha de nacimiento: 1990-05-15
   - Sexo: Masculino
   - Clic en "Guardar"

4. **Verificar en la lista**
   - El beneficiario debe aparecer en la tabla
   - Debe mostrar edad calculada (34 años)
   - Debe mostrar tipo de documento (DNI)

5. **Probar edición**
   - Clic en "Editar"
   - Cambiar tipo de documento a "Pasaporte"
   - Observar que las validaciones cambian a "9 caracteres (alfanumérico)"
   - Actualizar número de documento
   - Guardar cambios

6. **Probar eliminación**
   - Clic en "Eliminar"
   - Confirmar eliminación
   - Verificar que desaparece de la lista

---

## 📊 Tipos de Documentos Disponibles

| Tipo | País | Longitud | Formato |
|------|------|----------|---------|
| DNI | Perú | 8 | Solo números |
| Pasaporte | Internacional | 9 | Alfanumérico |
| Cédula | Ecuador | 10 | Solo números |
| RUT | Chile | 9 | Alfanumérico |
| Cédula | Colombia | 10 | Solo números |
| Carnet de Extranjería | Perú | 9 | Alfanumérico |

---

## 🛑 Detener los Servicios

### Detener Frontend
```bash
# Buscar el proceso en la terminal donde está corriendo
# Presionar Ctrl+C
```

### Detener Backend
```bash
# En la terminal donde está corriendo
# Presionar Ctrl+C
```

### Detener SQL Server
```bash
cd /Users/victoranampa/Documents/Proyectos/sistema-beneficiarios
docker-compose down
```

---

## 🔄 Reiniciar Todo

```bash
# 1. Iniciar SQL Server
docker-compose up -d

# 2. Iniciar Backend (en una terminal)
cd Backend
dotnet run

# 3. Iniciar Frontend (en otra terminal)
cd frontend
npm run dev
```

---

## ⚠️ Solución de Problemas

### Frontend muestra "Error al cargar beneficiarios"
- **Causa:** Backend no está corriendo
- **Solución:** Iniciar el backend con `dotnet run`

### Backend no inicia
- **Causa:** .NET SDK no instalado
- **Solución:** Completar instalación de .NET SDK

### No puedo crear beneficiarios
- **Causa:** Backend no conecta a SQL Server
- **Solución:** Verificar que SQL Server está corriendo con `docker ps`

---

## 📝 Notas Importantes

1. **Frontend ya está corriendo** en http://localhost:5173
2. **Backend requiere .NET SDK** - completar instalación primero
3. **SQL Server está activo** y con datos de ejemplo
4. **Validación condicional** funciona automáticamente según tipo de documento
5. **Scripts de inicio** disponibles: `start-backend.sh` y `start-frontend.sh`

---

## 🎯 Próximo Paso

**Completar la instalación de .NET SDK** (requiere tu contraseña de administrador)

Una vez instalado, ejecutar:
```bash
cd /Users/victoranampa/Documents/Proyectos/sistema-beneficiarios
./start-backend.sh
```

¡Y el sistema estará completamente funcional! 🎉
