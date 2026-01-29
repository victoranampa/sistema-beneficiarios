using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DocumentosController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<DocumentosController> _logger;

    public DocumentosController(ApplicationDbContext context, ILogger<DocumentosController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/documentos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DocumentoIdentidad>>> GetDocumentos()
    {
        try
        {
            var documentos = await _context.DocumentosIdentidad
                .Where(d => d.Activo)
                .OrderBy(d => d.Pais)
                .ThenBy(d => d.Nombre)
                .ToListAsync();

            return Ok(documentos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener documentos de identidad");
            return StatusCode(500, new { message = "Error al obtener documentos de identidad" });
        }
    }

    // GET: api/documentos/5
    [HttpGet("{id}")]
    public async Task<ActionResult<DocumentoIdentidad>> GetDocumento(int id)
    {
        try
        {
            var documento = await _context.DocumentosIdentidad.FindAsync(id);

            if (documento == null)
            {
                return NotFound(new { message = "Documento no encontrado" });
            }

            return Ok(documento);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener documento {Id}", id);
            return StatusCode(500, new { message = "Error al obtener documento" });
        }
    }
}
