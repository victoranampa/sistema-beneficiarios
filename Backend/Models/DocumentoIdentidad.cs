using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("DocumentoIdentidad")]
public class DocumentoIdentidad
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    [MaxLength(10)]
    public string Abreviatura { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Pais { get; set; } = string.Empty;

    [Required]
    public int Longitud { get; set; }

    [Required]
    public bool SoloNumeros { get; set; }

    [Required]
    public bool Activo { get; set; } = true;

    public DateTime FechaCreacion { get; set; } = DateTime.Now;
    public DateTime FechaModificacion { get; set; } = DateTime.Now;

    // Navigation property
    public ICollection<Beneficiario> Beneficiarios { get; set; } = new List<Beneficiario>();
}
