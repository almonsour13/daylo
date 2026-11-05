// features/calendar/utils/build-calendar-weeks.ts
import { addDays, isSameMonth, startOfMonth, startOfWeek } from "date-fns";

export const WEEKS = 6; // always 6 rows so the height never jumps

export type CalendarCell = { date: Date; isCurrentMonth: boolean };

export function buildCalendarWeeks(month: Date): CalendarCell[][] {
    // Weeks start on Sunday, matching DAY_LABELS[0]
    const start = startOfWeek(startOfMonth(month));
    return Array.from({ length: WEEKS }, (_, w) =>
        Array.from({ length: 7 }, (_, d) => {
            const date = addDays(start, w * 7 + d);
            return { date, isCurrentMonth: isSameMonth(date, month) };
        }),
    );
}
