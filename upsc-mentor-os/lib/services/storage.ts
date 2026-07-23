export interface StorageService {
  initialize(): Promise<void>;
  clear(): Promise<void>;
}

export const storageService: StorageService = {
  async initialize() {
    // TODO: IndexedDB initialization
  },

  async clear() {
    // TODO: Clear local storage
  },
};