import { Incident } from '../../domain/models/Incident';
import { IIncidentRepository } from '../../domain/repositories/IIncidentRepository';

export class MockIncidentRepository implements IIncidentRepository {
  private mockIncidents: Incident[] = [];

  async getIncidents(): Promise<Incident[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...this.mockIncidents]), 500));
  }

  async reportIncident(incident: Omit<Incident, 'id' | 'reportedAt' | 'status'>): Promise<Incident> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newIncident: Incident = {
          ...incident,
          id: Math.random().toString(36).substring(7),
          reportedAt: new Date().toISOString(),
          status: 'Pendiente',
        };
        this.mockIncidents.push(newIncident);
        console.log('Incident reported internally (mock):', newIncident);
        resolve(newIncident);
      }, 500);
    });
  }
}
