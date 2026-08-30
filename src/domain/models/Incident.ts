export type IncidentType = 'Nuevo Abandono' | 'Emergencia Médica' | 'Vandalismo/Comida Contaminada';

export interface Incident {
  id: string;
  type: IncidentType;
  description: string;
  photoUrl?: string; // Obligatoria según requerimientos
  reportedAt: string; // ISO Date String
  status: 'Pendiente' | 'Resuelto';
}
