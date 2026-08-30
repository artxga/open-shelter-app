import { Incident } from '../models/Incident';

export interface IIncidentRepository {
  getIncidents(): Promise<Incident[]>;
  reportIncident(incident: Omit<Incident, 'id' | 'reportedAt' | 'status'>): Promise<Incident>;
}
