export interface CalendarService {
  syncCalendar(): Promise<void>;
}

export const calendarService: CalendarService = {
  async syncCalendar() {
    // TODO: Apple Calendar integration
  },
};