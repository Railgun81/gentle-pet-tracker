
import React, { useState, useEffect } from 'react';
import { Pet } from '../types/Pet';
import { Plus, Edit, X } from 'lucide-react';

interface PetFormProps {
  onAddPet: (pet: Omit<Pet, 'id'>) => void;
  onUpdatePet: (pet: Pet) => void;
  editingPet: Pet | null;
  onCancelEdit: () => void;
}

export const PetForm: React.FC<PetFormProps> = ({
  onAddPet,
  onUpdatePet,
  editingPet,
  onCancelEdit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    color: '',
    nextVaccination: '',
    notes: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (editingPet) {
      setFormData({
        name: editingPet.name,
        species: editingPet.species,
        breed: editingPet.breed,
        age: editingPet.age.toString(),
        weight: editingPet.weight.toString(),
        color: editingPet.color,
        nextVaccination: editingPet.nextVaccination || '',
        notes: editingPet.notes || '',
        imageUrl: editingPet.imageUrl || '',
      });
    }
  }, [editingPet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.species || !formData.age) {
      alert('Por favor completa los campos obligatorios (nombre, especie y edad)');
      return;
    }

    const petData = {
      name: formData.name,
      species: formData.species,
      breed: formData.breed,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight) || 0,
      color: formData.color,
      nextVaccination: formData.nextVaccination || undefined,
      notes: formData.notes || undefined,
      imageUrl: formData.imageUrl || undefined,
    };

    if (editingPet) {
      onUpdatePet({ ...petData, id: editingPet.id });
    } else {
      onAddPet(petData);
    }

    setFormData({
      name: '',
      species: '',
      breed: '',
      age: '',
      weight: '',
      color: '',
      nextVaccination: '',
      notes: '',
      imageUrl: '',
    });
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      species: '',
      breed: '',
      age: '',
      weight: '',
      color: '',
      nextVaccination: '',
      notes: '',
      imageUrl: '',
    });
    onCancelEdit();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        {editingPet ? (
          <>
            <Edit className="text-blue-500 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Editar Mascota</h2>
          </>
        ) : (
          <>
            <Plus className="text-green-500 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Registrar Nueva Mascota</h2>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nombre de la mascota"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Especie *
            </label>
            <select
              value={formData.species}
              onChange={(e) => setFormData({ ...formData, species: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Seleccionar especie</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Ave">Ave</option>
              <option value="Pez">Pez</option>
              <option value="Conejo">Conejo</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Raza
            </label>
            <input
              type="text"
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Raza de la mascota"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Edad (años) *
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Edad"
              min="0"
              max="30"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Peso (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Peso en kg"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Color principal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Próxima Vacunación
            </label>
            <input
              type="date"
              value={formData.nextVaccination}
              onChange={(e) => setFormData({ ...formData, nextVaccination: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de Imagen
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notas
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Información adicional sobre la mascota"
            rows={3}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {editingPet ? 'Actualizar Mascota' : 'Registrar Mascota'}
          </button>
          
          {editingPet && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              <X size={16} className="mr-2" />
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
