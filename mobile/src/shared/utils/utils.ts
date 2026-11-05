import { parse } from "date-fns";

export const generateId = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

export const toDateTime = (date: string, time: string): Date => {
    if (!date || !time) return new Date(NaN);
    return parse(`${date} ${time}`, "yyyy-MM-dd HH:mm", new Date());
};
export function getDurationLabel(
    date: string,
    startTime: string,
    endTime: string,
): string {
    const start = toDateTime(date, startTime).getTime();
    const end = toDateTime(date, endTime).getTime();
    const durationMs = end - start;

    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
}

export function isUpcomingDate(dateStr: string): boolean {
    const today = new Date();
    const date = new Date(dateStr);
    return date.getDate() > today.getDate();
}
