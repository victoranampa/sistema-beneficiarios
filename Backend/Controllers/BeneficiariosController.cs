using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BeneficiariosController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<BeneficiariosController> _logger;

    public BeneficiariosController(ApplicationDbContext context, ILogger<BeneficiariosController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/beneficiarios
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetBeneficiarios()
    {
        try
        {
            var beneficiarios = await _context.Beneficiarios
                .Include(b => b.DocumentoIdentidad)
                .Select(b => new
                {
                    b.Id,
                    b.Nombres,
                    b.Apellidos,
                    b.DocumentoIdentidadId,
                    b.NumeroDocumento,
                    b.FechaNacimiento,
                    b.Sexo,
                    DocumentoNombre = b.DocumentoIdentidad!.Nombre,
                    DocumentoAbreviatura = b.DocumentoIdentidad.Abreviatura,
                    DocumentoPais = b.DocumentoIdentidad.Pais
                })
                .OrderByDescending(b => b.Id)
                .ToListAsync();

            return Ok(beneficiarios);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener beneficiarios");
            return StatusCode(500, new { message = "Error al obtener beneficiarios" });
        }
    }

    // GET: api/beneficiarios/5
    [HttpGet("{id}")]
    public async Task<ActionResult<object>> GetBeneficiario(int id)
    {
        try
        {
            var beneficiario = await _context.Beneficiarios
                .Include(b => b.DocumentoIdentidad)
                .Where(b => b.Id == id)
                .Select(b => new
                {
                    b.Id,
                    b.Nombres,
                    b.Apellidos,
                    b.DocumentoIdentidadId,
                    b.NumeroDocumento,
                    b.FechaNacimiento,
                    b.Sexo,
                    DocumentoNombre = b.DocumentoIdentidad!.Nombre,
                    DocumentoAbreviatura = b.DocumentoIdentidad.Abreviatura
                })
                .FirstOrDefaultAsync();

            if (beneficiario == null)
            {
                return NotFound(new { message = "Beneficiario no encontrado" });
            }

            return Ok(beneficiario);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener beneficiario {Id}", id);
            return StatusCode(500, new { message = "Error al obtener beneficiario" });
        }
    }

    // POST: api/beneficiarios
    [HttpPost]
    public async Task<ActionResult<Beneficiario>> CreateBeneficiario(Beneficiario beneficiario)
    {
        try
        {
            // Validar que el documento de identidad existe
            var documento = await _context.DocumentosIdentidad.FindAsync(beneficiario.DocumentoIdentidadId);
            if (documento == null)
            {
                return BadRequest(new { message = "Tipo de documento no válido" });
            }

            // Validar formato del número de documento
            if (documento.SoloNumeros && !beneficiario.NumeroDocumento.All(char.IsDigit))
            {
                return BadRequest(new { message = "El número de documento solo debe contener números" });
            }

            if (beneficiario.NumeroDocumento.Length != documento.Longitud)
            {
                return BadRequest(new { message = $"El número de documento debe tener {documento.Longitud} caracteres" });
            }

            // Validar que no exista un beneficiario con el mismo documento
            var existente = await _context.Beneficiarios
                .AnyAsync(b => b.DocumentoIdentidadId == beneficiario.DocumentoIdentidadId 
                            && b.NumeroDocumento == beneficiario.NumeroDocumento);

            if (existente)
            {
                return BadRequest(new { message = "Ya existe un beneficiario con este número de documento" });
            }

            // Validar sexo
            if (beneficiario.Sexo != "M" && beneficiario.Sexo != "F")
            {
                return BadRequest(new { message = "El sexo debe ser 'M' o 'F'" });
            }

            beneficiario.FechaCreacion = DateTime.Now;
            beneficiario.FechaModificacion = DateTime.Now;

            _context.Beneficiarios.Add(beneficiario);
            await _context.SaveChangesAsync();

            // Recargar el beneficiario con los datos del documento para evitar ciclos de referencia
            var beneficiarioCreado = await _context.Beneficiarios
                .Include(b => b.DocumentoIdentidad)
                .Where(b => b.Id == beneficiario.Id)
                .Select(b => new
                {
                    b.Id,
                    b.Nombres,
                    b.Apellidos,
                    b.DocumentoIdentidadId,
                    b.NumeroDocumento,
                    b.FechaNacimiento,
                    b.Sexo,
                    DocumentoNombre = b.DocumentoIdentidad!.Nombre,
                    DocumentoAbreviatura = b.DocumentoIdentidad.Abreviatura,
                    DocumentoPais = b.DocumentoIdentidad.Pais
                })
                .FirstOrDefaultAsync();

            return CreatedAtAction(nameof(GetBeneficiario), new { id = beneficiario.Id }, beneficiarioCreado);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al crear beneficiario");
            return StatusCode(500, new { message = "Error al crear beneficiario" });
        }
    }

    // PUT: api/beneficiarios/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBeneficiario(int id, Beneficiario beneficiario)
    {
        if (id != beneficiario.Id)
        {
            return BadRequest(new { message = "El ID no coincide" });
        }

        try
        {
            var existingBeneficiario = await _context.Beneficiarios.FindAsync(id);
            if (existingBeneficiario == null)
            {
                return NotFound(new { message = "Beneficiario no encontrado" });
            }

            // Validar que el documento de identidad existe
            var documento = await _context.DocumentosIdentidad.FindAsync(beneficiario.DocumentoIdentidadId);
            if (documento == null)
            {
                return BadRequest(new { message = "Tipo de documento no válido" });
            }

            // Validar formato del número de documento
            if (documento.SoloNumeros && !beneficiario.NumeroDocumento.All(char.IsDigit))
            {
                return BadRequest(new { message = "El número de documento solo debe contener números" });
            }

            if (beneficiario.NumeroDocumento.Length != documento.Longitud)
            {
                return BadRequest(new { message = $"El número de documento debe tener {documento.Longitud} caracteres" });
            }

            // Validar que no exista otro beneficiario con el mismo documento
            var duplicado = await _context.Beneficiarios
                .AnyAsync(b => b.Id != id 
                            && b.DocumentoIdentidadId == beneficiario.DocumentoIdentidadId 
                            && b.NumeroDocumento == beneficiario.NumeroDocumento);

            if (duplicado)
            {
                return BadRequest(new { message = "Ya existe otro beneficiario con este número de documento" });
            }

            // Validar sexo
            if (beneficiario.Sexo != "M" && beneficiario.Sexo != "F")
            {
                return BadRequest(new { message = "El sexo debe ser 'M' o 'F'" });
            }

            existingBeneficiario.Nombres = beneficiario.Nombres;
            existingBeneficiario.Apellidos = beneficiario.Apellidos;
            existingBeneficiario.DocumentoIdentidadId = beneficiario.DocumentoIdentidadId;
            existingBeneficiario.NumeroDocumento = beneficiario.NumeroDocumento;
            existingBeneficiario.FechaNacimiento = beneficiario.FechaNacimiento;
            existingBeneficiario.Sexo = beneficiario.Sexo;
            existingBeneficiario.FechaModificacion = DateTime.Now;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al actualizar beneficiario {Id}", id);
            return StatusCode(500, new { message = "Error al actualizar beneficiario" });
        }
    }

    // DELETE: api/beneficiarios/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBeneficiario(int id)
    {
        try
        {
            var beneficiario = await _context.Beneficiarios.FindAsync(id);
            if (beneficiario == null)
            {
                return NotFound(new { message = "Beneficiario no encontrado" });
            }

            _context.Beneficiarios.Remove(beneficiario);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al eliminar beneficiario {Id}", id);
            return StatusCode(500, new { message = "Error al eliminar beneficiario" });
        }
    }
}
