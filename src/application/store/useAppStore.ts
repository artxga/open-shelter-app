import { create } from 'zustand';
import { FeedingPoint, FeedingRecord } from '../../domain/models/FeedingPoint';
import { Incident } from '../../domain/models/Incident';
import { MockFeedingRepository } from '../../infrastructure/api/MockFeedingRepository';
import { MockIncidentRepository } from '../../infrastructure/api/MockIncidentRepository';

const feedingRepo = new MockFeedingRepository();
const incidentRepo = new MockIncidentRepository();

interface AppState {
  // Feeding State
  feedingPoints: FeedingPoint[];
  feedingRecords: FeedingRecord[];
  isLoadingPoints: boolean;
  loadFeedingPoints: () => Promise<void>;
  saveFeedingRecord: (record: Omit<FeedingRecord, 'id' | 'recordedAt'>) => Promise<void>;

  // Incident State
  incidents: Incident[];
  isReportingIncident: boolean;
  loadIncidents: () => Promise<void>;
  reportIncident: (incident: Omit<Incident, 'id' | 'reportedAt' | 'status'>) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  feedingPoints: [],
  feedingRecords: [],
  isLoadingPoints: false,

  loadFeedingPoints: async () => {
    set({ isLoadingPoints: true });
    try {
      const points = await feedingRepo.getFeedingPoints();
      set({ feedingPoints: points, isLoadingPoints: false });
    } catch (error) {
      console.error(error);
      set({ isLoadingPoints: false });
    }
  },

  saveFeedingRecord: async (record) => {
    try {
      const newRecord = await feedingRepo.saveFeedingRecord(record);
      set((state) => ({ feedingRecords: [...state.feedingRecords, newRecord] }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  incidents: [],
  isReportingIncident: false,

  loadIncidents: async () => {
    try {
      const incidents = await incidentRepo.getIncidents();
      set({ incidents });
    } catch (error) {
      console.error(error);
    }
  },

  reportIncident: async (incident) => {
    set({ isReportingIncident: true });
    try {
      const newIncident = await incidentRepo.reportIncident(incident);
      set((state) => ({ 
        incidents: [...state.incidents, newIncident],
        isReportingIncident: false 
      }));
    } catch (error) {
      console.error(error);
      set({ isReportingIncident: false });
      throw error;
    }
  }
}));
