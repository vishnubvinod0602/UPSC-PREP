export interface GoogleSheetConfig {
  spreadsheetId: string;

  sheets: {
    subjects: string;
    resources: string;
    pyqs: string;
    currentAffairs: string;
    tests: string;
  };
}

export const GOOGLE_SHEETS: GoogleSheetConfig = {
  spreadsheetId:
    process.env.NEXT_PUBLIC_UPSC_SHEET_ID ?? "",

  sheets: {
    subjects: "Subjects",
    resources: "Resources",
    pyqs: "PYQs",
    currentAffairs: "Current Affairs",
    tests: "Tests",
  },
};

/**
 * Returns true if a spreadsheet ID is configured.
 */
export function hasGoogleSheet(): boolean {
  return GOOGLE_SHEETS.spreadsheetId.length > 0;
}

/**
 * Get spreadsheet ID.
 */
export function getSpreadsheetId(): string {
  return GOOGLE_SHEETS.spreadsheetId;
}

/**
 * Get a sheet/tab name.
 */
export function getSheetName(
  sheet: keyof GoogleSheetConfig["sheets"],
): string {
  return GOOGLE_SHEETS.sheets[sheet];
}

/**
 * Build a Google Sheets URL.
 */
export function getSpreadsheetUrl(): string {
  if (!hasGoogleSheet()) {
    return "";
  }

  return `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS.spreadsheetId}`;
}