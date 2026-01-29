import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave, FiX, FiUser } from 'react-icons/fi';
import type { DocumentoIdentidad, BeneficiarioFormData, Beneficiario } from '../types';
import { getDocumentosActivos } from '../services/api';

interface BeneficiarioFormProps {
    onSubmit: (data: BeneficiarioFormData) => Promise<void>;
    onCancel?: () => void;
    initialData?: Beneficiario;
    isEdit?: boolean;
}

export default function BeneficiarioForm({ onSubmit, onCancel, initialData, isEdit = false }: BeneficiarioFormProps) {
    const [documentos, setDocumentos] = useState<DocumentoIdentidad[]>([]);
    const [selectedDocumento, setSelectedDocumento] = useState<DocumentoIdentidad | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        reset,
    } = useForm<BeneficiarioFormData>({
        defaultValues: initialData || {
            nombres: '',
            apellidos: '',
            documentoIdentidadId: 0,
            numeroDocumento: '',
            fechaNacimiento: '',
            sexo: 'M',
        },
    });

    const documentoIdWatch = watch('documentoIdentidadId');
    const numeroDocumentoWatch = watch('numeroDocumento');

    useEffect(() => {
        loadDocumentos();
    }, []);

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    useEffect(() => {
        const doc = documentos.find(d => d.id === Number(documentoIdWatch));
        setSelectedDocumento(doc || null);
    }, [documentoIdWatch, documentos]);

    const loadDocumentos = async () => {
        try {
            const data = await getDocumentosActivos();
            setDocumentos(data);
        } catch (error) {
            console.error('Error cargando documentos:', error);
        }
    };

    const validateNumeroDocumento = (value: string): string | boolean => {
        if (!selectedDocumento) return 'Seleccione un tipo de documento';

        if (!value) return 'El número de documento es requerido';

        // Validar longitud
        if (value.length !== selectedDocumento.longitud) {
            return `Debe tener exactamente ${selectedDocumento.longitud} caracteres`;
        }

        // Validar solo números si es requerido
        if (selectedDocumento.soloNumeros && !/^\d+$/.test(value)) {
            return 'Solo se permiten números';
        }

        return true;
    };

    const onFormSubmit = async (data: BeneficiarioFormData) => {
        setLoading(true);
        try {
            await onSubmit(data);
            if (!isEdit) {
                reset();
            }
        } catch (error) {
            console.error('Error al guardar:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FiUser className="text-blue-600" />
                {isEdit ? 'Editar Beneficiario' : 'Nuevo Beneficiario'}
            </h2>
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nombres */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombres <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register('nombres', { required: 'Los nombres son requeridos' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ingrese los nombres"
                        />
                        {errors.nombres && (
                            <p className="text-red-500 text-sm mt-1">{errors.nombres.message}</p>
                        )}
                    </div>

                    {/* Apellidos */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Apellidos <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register('apellidos', { required: 'Los apellidos son requeridos' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ingrese los apellidos"
                        />
                        {errors.apellidos && (
                            <p className="text-red-500 text-sm mt-1">{errors.apellidos.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tipo de Documento */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Documento <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register('documentoIdentidadId', {
                                required: 'Seleccione un tipo de documento',
                                valueAsNumber: true,
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value={0}>Seleccione un documento</option>
                            {documentos.map(doc => (
                                <option key={doc.id} value={doc.id}>
                                    {doc.nombre} ({doc.abreviatura}) - {doc.pais}
                                </option>
                            ))}
                        </select>
                        {errors.documentoIdentidadId && (
                            <p className="text-red-500 text-sm mt-1">{errors.documentoIdentidadId.message}</p>
                        )}
                    </div>

                    {/* Número de Documento con validación condicional */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Documento <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register('numeroDocumento', {
                                validate: validateNumeroDocumento,
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder={
                                selectedDocumento
                                    ? `${selectedDocumento.longitud} caracteres${selectedDocumento.soloNumeros ? ' (solo números)' : ''}`
                                    : 'Seleccione primero un tipo de documento'
                            }
                            disabled={!selectedDocumento}
                            maxLength={selectedDocumento?.longitud || undefined}
                        />
                        {errors.numeroDocumento && (
                            <p className="text-red-500 text-sm mt-1">{errors.numeroDocumento.message}</p>
                        )}
                        {selectedDocumento && (
                            <p className="text-gray-500 text-xs mt-1">
                                Formato: {selectedDocumento.longitud} caracteres
                                {selectedDocumento.soloNumeros ? ' (solo números)' : ' (alfanumérico)'}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Fecha de Nacimiento */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Nacimiento <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            {...register('fechaNacimiento', { required: 'La fecha de nacimiento es requerida' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            max={new Date().toISOString().split('T')[0]}
                        />
                        {errors.fechaNacimiento && (
                            <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento.message}</p>
                        )}
                    </div>

                    {/* Sexo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sexo <span className="text-red-500">*</span>
                        </label>
                        <select {...register('sexo', { required: 'Seleccione el sexo' })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                        {errors.sexo && (
                            <p className="text-red-500 text-sm mt-1">{errors.sexo.message}</p>
                        )}
                    </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                    <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50">
                        <FiSave />
                        {loading ? 'Guardando...' : isEdit ? 'Actualizar Beneficiario' : 'Guardar Beneficiario'}
                    </button>
                    {onCancel && (
                        <button type="button" onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors">
                            <FiX />
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
