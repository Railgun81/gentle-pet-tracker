
import { Pet } from '../types/Pet';

const STORAGE_KEY = 'pet-manager-pets';

export const getPetsFromStorage = (): Pet[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const savePetsToStorage = (pets: Pet[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const clearPetsFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};
