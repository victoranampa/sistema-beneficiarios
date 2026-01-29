export interface DocumentoIdentidad {
    id: number;
    nombre: string;
    abreviatura: string;
    pais: string;
    longitud: number;
    soloNumeros: boolean;
    activo: boolean;
}

export interface Beneficiario {
    id?: number;
    nombres: string;
    apellidos: string;
    documentoIdentidadId: number;
    numeroDocumento: string;
    fechaNacimiento: string;
    sexo: 'M' | 'F';
    documentoNombre?: string;
    documentoAbreviatura?: string;
    documentoPais?: string;
}

export interface BeneficiarioFormData {
    nombres: string;
    apellidos: string;
    documentoIdentidadId: number;
    numeroDocumento: string;
    fechaNacimiento: string;
    sexo: 'M' | 'F';
}
