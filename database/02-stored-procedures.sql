-- =============================================
-- Script: Stored Procedures para Sistema de Beneficiarios
-- Descripción: Procedimientos almacenados para operaciones CRUD
-- =============================================

USE BeneficiariosDB;
GO

-- =============================================
-- SP: Obtener todos los beneficiarios
-- =============================================
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_GetBeneficiarios')
    DROP PROCEDURE sp_GetBeneficiarios;
GO

CREATE PROCEDURE sp_GetBeneficiarios
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        b.Id,
        b.Nombres,
        b.Apellidos,
        b.DocumentoIdentidadId,
        b.NumeroDocumento,
        b.FechaNacimiento,
        b.Sexo,
        d.Nombre AS DocumentoNombre,
        d.Abreviatura AS DocumentoAbreviatura,
        d.Pais AS DocumentoPais
    FROM Beneficiario b
    INNER JOIN DocumentoIdentidad d ON b.DocumentoIdentidadId = d.Id
    ORDER BY b.FechaCreacion DESC;
END
GO

-- =============================================
-- SP: Obtener beneficiario por ID
-- =============================================
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_GetBeneficiarioById')
    DROP PROCEDURE sp_GetBeneficiarioById;
GO

CREATE PROCEDURE sp_GetBeneficiarioById
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        b.Id,
        b.Nombres,
        b.Apellidos,
        b.DocumentoIdentidadId,
        b.NumeroDocumento,
        b.FechaNacimiento,
        b.Sexo,
        d.Nombre AS DocumentoNombre,
        d.Abreviatura AS DocumentoAbreviatura
    FROM Beneficiario b
    INNER JOIN DocumentoIdentidad d ON b.DocumentoIdentidadId = d.Id
    WHERE b.Id = @Id;
END
GO

-- =============================================
-- SP: Crear beneficiario
-- =============================================
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_CreateBeneficiario')
    DROP PROCEDURE sp_CreateBeneficiario;
GO

CREATE PROCEDURE sp_CreateBeneficiario
    @Nombres VARCHAR(100),
    @Apellidos VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento VARCHAR(20),
    @FechaNacimiento DATE,
    @Sexo CHAR(1)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        INSERT INTO Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
        VALUES (@Nombres, @Apellidos, @DocumentoIdentidadId, @NumeroDocumento, @FechaNacimiento, @Sexo);
        
        SELECT SCOPE_IDENTITY() AS Id;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

-- =============================================
-- SP: Actualizar beneficiario
-- =============================================
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_UpdateBeneficiario')
    DROP PROCEDURE sp_UpdateBeneficiario;
GO

CREATE PROCEDURE sp_UpdateBeneficiario
    @Id INT,
    @Nombres VARCHAR(100),
    @Apellidos VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento VARCHAR(20),
    @FechaNacimiento DATE,
    @Sexo CHAR(1)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        UPDATE Beneficiario
        SET 
            Nombres = @Nombres,
            Apellidos = @Apellidos,
            DocumentoIdentidadId = @DocumentoIdentidadId,
            NumeroDocumento = @NumeroDocumento,
            FechaNacimiento = @FechaNacimiento,
            Sexo = @Sexo,
            FechaModificacion = GETDATE()
        WHERE Id = @Id;
        
        SELECT @@ROWCOUNT AS RowsAffected;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

-- =============================================
-- SP: Eliminar beneficiario
-- =============================================
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_DeleteBeneficiario')
    DROP PROCEDURE sp_DeleteBeneficiario;
GO

CREATE PROCEDURE sp_DeleteBeneficiario
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DELETE FROM Beneficiario WHERE Id = @Id;
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

-- =============================================
-- SP: Obtener documentos de identidad activos
-- =============================================
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_GetDocumentosActivos')
    DROP PROCEDURE sp_GetDocumentosActivos;
GO

CREATE PROCEDURE sp_GetDocumentosActivos
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        Id,
        Nombre,
        Abreviatura,
        Pais,
        Longitud,
        SoloNumeros,
        Activo
    FROM DocumentoIdentidad
    WHERE Activo = 1
    ORDER BY Pais, Nombre;
END
GO

PRINT 'Stored Procedures creados exitosamente.';
GO
