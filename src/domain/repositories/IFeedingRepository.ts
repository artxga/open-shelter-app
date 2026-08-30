import { FeedingPoint, FeedingRecord } from '../models/FeedingPoint';

export interface IFeedingRepository {
  getFeedingPoints(): Promise<FeedingPoint[]>;
  saveFeedingRecord(record: Omit<FeedingRecord, 'id' | 'recordedAt'>): Promise<FeedingRecord>;
}
