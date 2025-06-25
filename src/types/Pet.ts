
export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  color: string;
  nextVaccination?: string;
  notes?: string;
  imageUrl?: string;
}
