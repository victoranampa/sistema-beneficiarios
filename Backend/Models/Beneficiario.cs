using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("Beneficiario")]
public class Beneficiario
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nombres { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Apellidos { get; set; } = string.Empty;

    [Required]
    public int DocumentoIdentidadId { get; set; }

    [Required]
    [MaxLength(20)]
    public string NumeroDocumento { get; set; } = string.Empty;

    [Required]
    [Column(TypeName = "date")]
    public DateTime FechaNacimiento { get; set; }

    [Required]
    [MaxLength(1)]
    public string Sexo { get; set; } = string.Empty;

    public DateTime FechaCreacion { get; set; } = DateTime.Now;
    public DateTime FechaModificacion { get; set; } = DateTime.Now;

    // Navigation property
    [ForeignKey("DocumentoIdentidadId")]
    public DocumentoIdentidad? DocumentoIdentidad { get; set; }
}
