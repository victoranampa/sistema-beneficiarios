import { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import BeneficiarioForm from './components/BeneficiarioForm';
import BeneficiarioList from './components/BeneficiarioList';
import type { Beneficiario, BeneficiarioFormData } from './types';
import {
  getBeneficiarios,
  createBeneficiario,
  updateBeneficiario,
  deleteBeneficiario,
} from './services/api';
import './index.css';

function App() {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [editingBeneficiario, setEditingBeneficiario] = useState<Beneficiario | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadBeneficiarios();
  }, []);

  const loadBeneficiarios = async () => {
    setLoading(true);
    try {
      const data = await getBeneficiarios();
      setBeneficiarios(data);
    } catch (error) {
      showMessage('error', 'Error al cargar beneficiarios. Verifique que el backend esté corriendo.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleCreate = async (data: BeneficiarioFormData) => {
    try {
      await createBeneficiario(data);
      showMessage('success', 'Beneficiario creado exitosamente');
      await loadBeneficiarios();
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'Error al crear beneficiario');
      throw error;
    }
  };

  const handleUpdate = async (data: BeneficiarioFormData) => {
    if (!editingBeneficiario?.id) return;

    try {
      await updateBeneficiario(editingBeneficiario.id, data);
      showMessage('success', 'Beneficiario actualizado exitosamente');
      setEditingBeneficiario(null);
      await loadBeneficiarios();
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'Error al actualizar beneficiario');
      throw error;
    }
  };

  const handleEdit = (beneficiario: Beneficiario) => {
    setEditingBeneficiario(beneficiario);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBeneficiario(id);
      showMessage('success', 'Beneficiario eliminado exitosamente');
      await loadBeneficiarios();
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'Error al eliminar beneficiario');
    }
  };

  const handleCancelEdit = () => {
    setEditingBeneficiario(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sistema de Gestión de Beneficiarios
          </h1>
          <p className="text-gray-600">
            Programa Social Multi-País
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
              }`}
          >
            {message.text}
          </div>
        )}

        {/* Toggle Form Button */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) setEditingBeneficiario(null);
            }}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium"
          >
            {showForm ? '− Ocultar Formulario' : '+ Nuevo Beneficiario'}
          </button>
          <button
            onClick={loadBeneficiarios}
            disabled={loading}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2 font-medium"
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} />
            Actualizar
          </button>
        </div>

        <div className="space-y-6">
          {/* Form Section */}
          {showForm && (
            <BeneficiarioForm
              onSubmit={editingBeneficiario ? handleUpdate : handleCreate}
              onCancel={editingBeneficiario ? handleCancelEdit : undefined}
              initialData={editingBeneficiario || undefined}
              isEdit={!!editingBeneficiario}
            />
          )}

          {/* List Section */}
          <BeneficiarioList
            beneficiarios={beneficiarios}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>PowerIMas - Sistema de Gestión de Beneficiarios © 2026</p>
        </div>
      </div>
    </div>
  );
}

export default App;
