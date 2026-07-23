export interface GoogleDriveService {
  connect(): Promise<void>;
  sync(): Promise<void>;
}

export const googleDriveService: GoogleDriveService = {
  async connect() {
    // TODO: Google OAuth
  },

  async sync() {
    // TODO: Google Drive sync
  },
};