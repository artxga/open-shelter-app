export type Sector = 'Anfiteatro' | 'Virgen Milagrosa' | 'Juegos' | 'Óvalo';

export type FoodType = 'Seco' | 'Húmedo/Medicado';

export interface FeedingPoint {
  id: string;
  name: string;
  sector: Sector;
  location?: { lat: number; lng: number };
}

export interface FeedingRecord {
  id: string;
  feedingPointId: string;
  waterRefilled: boolean;
  foodRefilled: boolean;
  foodTypes: FoodType[];
  photoUrl?: string;
  recordedAt: string; // ISO Date String
}
