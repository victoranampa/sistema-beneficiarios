-- =============================================
-- Script: Crear Tablas para Sistema de Beneficiarios
-- Descripción: Crea las tablas DocumentoIdentidad y Beneficiario
-- =============================================

USE master;
GO

-- Crear base de datos si no existe
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'BeneficiariosDB')
BEGIN
    CREATE DATABASE BeneficiariosDB;
END
GO

USE BeneficiariosDB;
GO

-- Tabla: DocumentoIdentidad
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'DocumentoIdentidad')
BEGIN
    CREATE TABLE DocumentoIdentidad (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Nombre VARCHAR(50) NOT NULL,
        Abreviatura VARCHAR(10) NOT NULL,
        Pais VARCHAR(50) NOT NULL,
        Longitud INT NOT NULL,
        SoloNumeros BIT NOT NULL DEFAULT 0,
        Activo BIT NOT NULL DEFAULT 1,
        FechaCreacion DATETIME DEFAULT GETDATE(),
        FechaModificacion DATETIME DEFAULT GETDATE()
    );
    
    PRINT 'Tabla DocumentoIdentidad creada exitosamente.';
END
ELSE
BEGIN
    PRINT 'Tabla DocumentoIdentidad ya existe.';
END
GO

-- Tabla: Beneficiario
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Beneficiario')
BEGIN
    CREATE TABLE Beneficiario (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Nombres VARCHAR(100) NOT NULL,
        Apellidos VARCHAR(100) NOT NULL,
        DocumentoIdentidadId INT NOT NULL,
        NumeroDocumento VARCHAR(20) NOT NULL,
        FechaNacimiento DATE NOT NULL,
        Sexo CHAR(1) NOT NULL CHECK (Sexo IN ('M', 'F')),
        FechaCreacion DATETIME DEFAULT GETDATE(),
        FechaModificacion DATETIME DEFAULT GETDATE(),
        
        -- Foreign Key
        CONSTRAINT FK_Beneficiario_DocumentoIdentidad 
            FOREIGN KEY (DocumentoIdentidadId) 
            REFERENCES DocumentoIdentidad(Id),
        
        -- Índice único para evitar duplicados
        CONSTRAINT UQ_Beneficiario_Documento 
            UNIQUE (DocumentoIdentidadId, NumeroDocumento)
    );
    
    PRINT 'Tabla Beneficiario creada exitosamente.';
END
ELSE
BEGIN
    PRINT 'Tabla Beneficiario ya existe.';
END
GO

-- Crear índices para mejorar rendimiento
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Beneficiario_DocumentoIdentidadId')
BEGIN
    CREATE INDEX IX_Beneficiario_DocumentoIdentidadId 
    ON Beneficiario(DocumentoIdentidadId);
    
    PRINT 'Índice IX_Beneficiario_DocumentoIdentidadId creado.';
END
GO

PRINT 'Script de creación de tablas completado.';
GO
