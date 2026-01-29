-- =============================================
-- Script: Datos de Ejemplo - Documentos de Identidad
-- Descripción: Inserta tipos de documentos para diferentes países
-- =============================================

USE BeneficiariosDB;
GO

-- Limpiar datos existentes (solo para desarrollo)
-- DELETE FROM Beneficiario;
-- DELETE FROM DocumentoIdentidad;
-- DBCC CHECKIDENT ('DocumentoIdentidad', RESEED, 0);
-- DBCC CHECKIDENT ('Beneficiario', RESEED, 0);

-- Insertar tipos de documentos de identidad
IF NOT EXISTS (SELECT * FROM DocumentoIdentidad WHERE Abreviatura = 'DNI')
BEGIN
    INSERT INTO DocumentoIdentidad (Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
    VALUES ('Documento Nacional de Identidad', 'DNI', 'Perú', 8, 1, 1);
    PRINT 'DNI insertado.';
END

IF NOT EXISTS (SELECT * FROM DocumentoIdentidad WHERE Abreviatura = 'PAS')
BEGIN
    INSERT INTO DocumentoIdentidad (Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
    VALUES ('Pasaporte', 'PAS', 'Internacional', 9, 0, 1);
    PRINT 'Pasaporte insertado.';
END

IF NOT EXISTS (SELECT * FROM DocumentoIdentidad WHERE Abreviatura = 'CED-EC')
BEGIN
    INSERT INTO DocumentoIdentidad (Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
    VALUES ('Cédula de Identidad', 'CED-EC', 'Ecuador', 10, 1, 1);
    PRINT 'Cédula Ecuador insertada.';
END

IF NOT EXISTS (SELECT * FROM DocumentoIdentidad WHERE Abreviatura = 'RUT')
BEGIN
    INSERT INTO DocumentoIdentidad (Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
    VALUES ('Rol Único Tributario', 'RUT', 'Chile', 9, 0, 1);
    PRINT 'RUT insertado.';
END

IF NOT EXISTS (SELECT * FROM DocumentoIdentidad WHERE Abreviatura = 'CED-CO')
BEGIN
    INSERT INTO DocumentoIdentidad (Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
    VALUES ('Cédula de Ciudadanía', 'CED-CO', 'Colombia', 10, 1, 1);
    PRINT 'Cédula Colombia insertada.';
END

IF NOT EXISTS (SELECT * FROM DocumentoIdentidad WHERE Abreviatura = 'CE')
BEGIN
    INSERT INTO DocumentoIdentidad (Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
    VALUES ('Carnet de Extranjería', 'CE', 'Perú', 9, 0, 1);
    PRINT 'Carnet de Extranjería insertado.';
END

GO

-- Verificar datos insertados
SELECT 
    Id,
    Nombre,
    Abreviatura,
    Pais,
    Longitud,
    CASE WHEN SoloNumeros = 1 THEN 'Sí' ELSE 'No' END AS SoloNumeros,
    CASE WHEN Activo = 1 THEN 'Activo' ELSE 'Inactivo' END AS Estado
FROM DocumentoIdentidad
ORDER BY Pais, Nombre;

PRINT '';
PRINT 'Datos de ejemplo de documentos insertados exitosamente.';
PRINT 'Total de documentos: ' + CAST(@@ROWCOUNT AS VARCHAR(10));
GO

-- =============================================
-- Insertar Beneficiarios de Ejemplo
-- =============================================

-- Limpiar beneficiarios existentes (solo para desarrollo)
DELETE FROM Beneficiario;
DBCC CHECKIDENT ('Beneficiario', RESEED, 0);
GO

-- Beneficiarios con DNI (Perú) - 20 ejemplos
INSERT INTO Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
VALUES 
    ('Juan Carlos', 'García López', 1, '12345678', '1990-05-15', 'M'),
    ('María Elena', 'Rodríguez Pérez', 1, '23456789', '1985-08-22', 'F'),
    ('Pedro José', 'Martínez Silva', 1, '34567890', '1992-03-10', 'M'),
    ('Ana Lucía', 'Fernández Torres', 1, '45678901', '1988-11-30', 'F'),
    ('Carlos Alberto', 'Sánchez Ramírez', 1, '56789012', '1995-07-18', 'M'),
    ('Rosa María', 'González Vargas', 1, '67890123', '1987-02-25', 'F'),
    ('Luis Miguel', 'Díaz Castillo', 1, '78901234', '1993-09-12', 'M'),
    ('Carmen Rosa', 'Herrera Morales', 1, '89012345', '1991-06-08', 'F'),
    ('Jorge Luis', 'Vega Mendoza', 1, '90123456', '1989-12-20', 'M'),
    ('Patricia Isabel', 'Cruz Flores', 1, '01234567', '1994-04-17', 'F'),
    ('Roberto Carlos', 'Ríos Gutiérrez', 1, '11223344', '1986-10-05', 'M'),
    ('Sofía Alejandra', 'Paredes Núñez', 1, '22334455', '1996-01-28', 'F'),
    ('Miguel Ángel', 'Campos Rojas', 1, '33445566', '1990-08-14', 'M'),
    ('Gabriela Andrea', 'Salazar Ortiz', 1, '44556677', '1992-05-09', 'F'),
    ('Fernando José', 'Medina Chávez', 1, '55667788', '1988-03-22', 'M'),
    ('Daniela Paola', 'Reyes Aguilar', 1, '66778899', '1997-11-11', 'F'),
    ('Andrés Felipe', 'Navarro Benítez', 1, '77889900', '1991-07-07', 'M'),
    ('Valentina María', 'Romero Delgado', 1, '88990011', '1989-09-19', 'F'),
    ('Diego Alejandro', 'Castro Jiménez', 1, '99001122', '1993-02-14', 'M'),
    ('Isabella Sofía', 'Moreno Ruiz', 1, '10111213', '1995-12-03', 'F');

-- Beneficiarios con Pasaporte - 10 ejemplos
INSERT INTO Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
VALUES 
    ('John Michael', 'Smith Anderson', 2, 'ABC123456', '1985-06-15', 'M'),
    ('Sarah Elizabeth', 'Johnson Williams', 2, 'DEF789012', '1990-03-22', 'F'),
    ('David James', 'Brown Davis', 2, 'GHI345678', '1988-11-08', 'M'),
    ('Emma Louise', 'Miller Wilson', 2, 'JKL901234', '1992-07-30', 'F'),
    ('Robert William', 'Moore Taylor', 2, 'MNO567890', '1987-02-18', 'M'),
    ('Olivia Grace', 'Anderson Thomas', 2, 'PQR123456', '1994-09-25', 'F'),
    ('James Alexander', 'Jackson White', 2, 'STU789012', '1991-05-12', 'M'),
    ('Sophia Marie', 'Harris Martin', 2, 'VWX345678', '1989-12-07', 'F'),
    ('William Henry', 'Thompson Garcia', 2, 'YZA901234', '1993-08-20', 'M'),
    ('Ava Charlotte', 'Martinez Robinson', 2, 'BCD567890', '1996-04-15', 'F');

-- Beneficiarios con Cédula Ecuador - 10 ejemplos
INSERT INTO Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
VALUES 
    ('Carlos Andrés', 'Quito Morales', 3, '1234567890', '1990-01-15', 'M'),
    ('María Fernanda', 'Guayaquil Torres', 3, '2345678901', '1988-06-20', 'F'),
    ('José Luis', 'Cuenca Vásquez', 3, '3456789012', '1992-09-10', 'M'),
    ('Ana Patricia', 'Loja Ramírez', 3, '4567890123', '1987-03-25', 'F'),
    ('Diego Fernando', 'Ambato Sánchez', 3, '5678901234', '1995-11-30', 'M'),
    ('Gabriela Cristina', 'Riobamba Flores', 3, '6789012345', '1991-07-18', 'F'),
    ('Andrés Sebastián', 'Machala Herrera', 3, '7890123456', '1989-02-08', 'M'),
    ('Valentina Andrea', 'Portoviejo Castro', 3, '8901234567', '1994-12-22', 'F'),
    ('Santiago José', 'Esmeraldas Díaz', 3, '9012345678', '1993-05-14', 'M'),
    ('Camila Alejandra', 'Manta González', 3, '0123456789', '1990-08-28', 'F');

-- Beneficiarios con RUT Chile - 5 ejemplos
INSERT INTO Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
VALUES 
    ('Sebastián Ignacio', 'Lagos Piñera', 4, '12345678K', '1988-04-12', 'M'),
    ('Francisca Antonia', 'Bachelet Allende', 4, '23456789K', '1992-09-18', 'F'),
    ('Matías Benjamín', 'Boric Frei', 4, '34567890K', '1990-11-25', 'M'),
    ('Isidora Constanza', 'Matthei Aylwin', 4, '45678901K', '1987-06-30', 'F'),
    ('Joaquín Andrés', 'Kast Pinochet', 4, '56789012K', '1995-02-14', 'M');

-- Beneficiarios con Cédula Colombia - 5 ejemplos
INSERT INTO Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
VALUES 
    ('Camilo Andrés', 'Bogotá Medellín', 5, '1234567890', '1991-03-20', 'M'),
    ('Laura Valentina', 'Cali Barranquilla', 5, '2345678901', '1989-07-15', 'F'),
    ('Santiago David', 'Cartagena Bucaramanga', 5, '3456789012', '1993-10-08', 'M'),
    ('María Camila', 'Pereira Manizales', 5, '4567890123', '1990-12-25', 'F'),
    ('Juan Sebastián', 'Cúcuta Ibagué', 5, '5678901234', '1988-05-30', 'M');

GO

-- Verificar beneficiarios insertados
SELECT 
    b.Id,
    b.Nombres,
    b.Apellidos,
    d.Abreviatura AS TipoDocumento,
    b.NumeroDocumento,
    CONVERT(VARCHAR(10), b.FechaNacimiento, 103) AS FechaNacimiento,
    CASE WHEN b.Sexo = 'M' THEN 'Masculino' ELSE 'Femenino' END AS Sexo,
    DATEDIFF(YEAR, b.FechaNacimiento, GETDATE()) AS Edad
FROM Beneficiario b
INNER JOIN DocumentoIdentidad d ON b.DocumentoIdentidadId = d.Id
ORDER BY b.Id;

PRINT '';
PRINT 'Beneficiarios de ejemplo insertados exitosamente.';
PRINT 'Total de beneficiarios: ' + CAST(@@ROWCOUNT AS VARCHAR(10));
GO
