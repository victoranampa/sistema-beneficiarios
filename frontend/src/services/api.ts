import axios from 'axios';
import type { Beneficiario, DocumentoIdentidad, BeneficiarioFormData } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Documentos de Identidad
export const getDocumentosActivos = async (): Promise<DocumentoIdentidad[]> => {
    const response = await api.get<DocumentoIdentidad[]>('/documentos');
    return response.data;
};

// Beneficiarios
export const getBeneficiarios = async (): Promise<Beneficiario[]> => {
    const response = await api.get<Beneficiario[]>('/beneficiarios');
    return response.data;
};

export const getBeneficiarioById = async (id: number): Promise<Beneficiario> => {
    const response = await api.get<Beneficiario>(`/beneficiarios/${id}`);
    return response.data;
};

export const createBeneficiario = async (data: BeneficiarioFormData): Promise<Beneficiario> => {
    const response = await api.post<Beneficiario>('/beneficiarios', data);
    return response.data;
};

export const updateBeneficiario = async (id: number, data: BeneficiarioFormData): Promise<Beneficiario> => {
    const response = await api.put<Beneficiario>(`/beneficiarios/${id}`, data);
    return response.data;
};

export const deleteBeneficiario = async (id: number): Promise<void> => {
    await api.delete(`/beneficiarios/${id}`);
};

export default api;
