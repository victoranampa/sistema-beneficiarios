import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiUser } from 'react-icons/fi';
import type { Beneficiario } from '../types';

interface BeneficiarioListProps {
    beneficiarios: Beneficiario[];
    onEdit: (beneficiario: Beneficiario) => void;
    onDelete: (id: number) => void;
    loading?: boolean;
}

export default function BeneficiarioList({ beneficiarios, onEdit, onDelete, loading = false }: BeneficiarioListProps) {
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleDeleteClick = (id: number) => {
        setConfirmDelete(id);
    };

    const handleConfirmDelete = async () => {
        if (confirmDelete) {
            setDeletingId(confirmDelete);
            try {
                await onDelete(confirmDelete);
            } finally {
                setDeletingId(null);
                setConfirmDelete(null);
            }
        }
    };

    const handleCancelDelete = () => {
        setConfirmDelete(null);
    };

    // Filtrar beneficiarios según el término de búsqueda
    const filteredBeneficiarios = beneficiarios.filter(beneficiario => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();
        const nombreCompleto = `${beneficiario.nombres} ${beneficiario.apellidos}`.toLowerCase();
        const numeroDoc = beneficiario.numeroDocumento.toLowerCase();

        return nombreCompleto.includes(searchLower) || numeroDoc.includes(searchLower);
    });

    // Calcular paginación
    const totalPages = Math.ceil(filteredBeneficiarios.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBeneficiarios = filteredBeneficiarios.slice(startIndex, endIndex);

    // Resetear a página 1 cuando cambia la búsqueda o items por página
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const calculateAge = (dateString: string) => {
        const birthDate = new Date(dateString);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    if (loading) {
        return (
            <div className="card">
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            </div>
        );
    }

    if (beneficiarios.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center py-12">
                    <FiUser className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No hay beneficiarios</h3>
                    <p className="mt-1 text-sm text-gray-500">Comience agregando un nuevo beneficiario.</p>
                </div>
            </div>
        );
    }

    // Mensaje cuando hay búsqueda pero no hay resultados
    if (filteredBeneficiarios.length === 0 && searchTerm) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <FiUser className="text-blue-600" />
                        Lista de Beneficiarios ({beneficiarios.length})
                    </h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <div className="text-center py-12">
                    <FiUser className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No se encontraron resultados</h3>
                    <p className="mt-1 text-sm text-gray-500">No hay beneficiarios que coincidan con "{searchTerm}"</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FiUser className="text-blue-600" />
                    Lista de Beneficiarios ({filteredBeneficiarios.length})
                </h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Beneficiario
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Documento
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fecha Nacimiento
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sexo
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedBeneficiarios.map((beneficiario) => (
                            <tr key={beneficiario.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                                            <FiUser className="h-5 w-5 text-primary-600" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {beneficiario.nombres} {beneficiario.apellidos}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {calculateAge(beneficiario.fechaNacimiento)} años
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {beneficiario.documentoAbreviatura || 'N/A'}
                                    </div>
                                    <div className="text-sm text-gray-500">{beneficiario.numeroDocumento}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {formatDate(beneficiario.fechaNacimiento)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${beneficiario.sexo === 'M'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-pink-100 text-pink-700'
                                        }`}>
                                        {beneficiario.sexo === 'M' ? 'Masculino' : 'Femenino'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(beneficiario)}
                                        className="text-blue-600 hover:text-blue-800 mr-4 inline-flex items-center gap-1 font-medium"
                                        title="Editar"
                                    >
                                        <FiEdit2 className="h-4 w-4" />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => beneficiario.id && handleDeleteClick(beneficiario.id)}
                                        disabled={deletingId === beneficiario.id}
                                        className="text-red-600 hover:text-red-800 inline-flex items-center gap-1 disabled:opacity-50 font-medium"
                                        title="Eliminar"
                                    >
                                        <FiTrash2 className="h-4 w-4" />
                                        {deletingId === beneficiario.id ? 'Eliminando...' : 'Eliminar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Controles de Paginación */}
            {filteredBeneficiarios.length > 0 && (
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4">
                    {/* Items por página */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">Mostrar:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                            className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span className="text-sm text-gray-700">
                            de {filteredBeneficiarios.length} registros
                        </span>
                    </div>

                    {/* Navegación de páginas */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                            Anterior
                        </button>

                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                // Mostrar solo algunas páginas alrededor de la actual
                                if (
                                    page === 1 ||
                                    page === totalPages ||
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium ${currentPage === page
                                                    ? 'bg-blue-600 text-white'
                                                    : 'border border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                } else if (
                                    page === currentPage - 2 ||
                                    page === currentPage + 2
                                ) {
                                    return <span key={page} className="px-2 text-gray-500">...</span>;
                                }
                                return null;
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                            Siguiente
                        </button>
                    </div>

                    {/* Información de página */}
                    <div className="text-sm text-gray-700">
                        Página {currentPage} de {totalPages}
                    </div>
                </div>
            )}

            {/* Modal de Confirmación */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Confirmar Eliminación
                        </h3>
                        <p className="text-gray-600 mb-6">
                            ¿Está seguro de que desea eliminar este beneficiario? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
