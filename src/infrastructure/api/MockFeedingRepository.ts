import { FeedingPoint, FeedingRecord } from '../../domain/models/FeedingPoint';
import { IFeedingRepository } from '../../domain/repositories/IFeedingRepository';

const MOCK_POINTS: FeedingPoint[] = [
  { id: '1', name: 'Plato Principal Anfiteatro', sector: 'Anfiteatro', location: { lat: -12.1211, lng: -77.0302 } },
  { id: '2', name: 'Escondite Virgen', sector: 'Virgen Milagrosa', location: { lat: -12.1218, lng: -77.0298 } },
  { id: '3', name: 'Juegos Norte', sector: 'Juegos', location: { lat: -12.1205, lng: -77.0308 } },
  { id: '4', name: 'Óvalo Central', sector: 'Óvalo', location: { lat: -12.1220, lng: -77.0305 } },
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
