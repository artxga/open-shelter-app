import { FeedingPoint, FeedingRecord } from '../../domain/models/FeedingPoint';
import { IFeedingRepository } from '../../domain/repositories/IFeedingRepository';

const MOCK_POINTS: FeedingPoint[] = [
  { id: '1', name: 'Plato Principal Anfiteatro', sector: 'Anfiteatro' },
  { id: '2', name: 'Escondite Virgen', sector: 'Virgen Milagrosa' },
  { id: '3', name: 'Juegos Norte', sector: 'Juegos' },
  { id: '4', name: 'Óvalo Central', sector: 'Óvalo' },
];

export class MockFeedingRepository implements IFeedingRepository {
  async getFeedingPoints(): Promise<FeedingPoint[]> {
    // Simulate network delay
    return new Promise((resolve) => setTimeout(() => resolve([...MOCK_POINTS]), 500));
  }

  async saveFeedingRecord(record: Omit<FeedingRecord, 'id' | 'recordedAt'>): Promise<FeedingRecord> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRecord: FeedingRecord = {
          ...record,
          id: Math.random().toString(36).substring(7),
          recordedAt: new Date().toISOString(),
        };
        console.log('Record saved internally (mock):', newRecord);
        resolve(newRecord);
      }, 500);
    });
  }
}
