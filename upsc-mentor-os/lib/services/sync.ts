export interface SyncService {
  synchronize(): Promise<void>;
}

export const syncService: SyncService = {
  async synchronize() {
    // TODO: Cloud sync
  },
};