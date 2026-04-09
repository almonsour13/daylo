export interface Activity {
    name: string;
    description: string;
    priority: number;
    date: Date;
    startTime: Date | null;
    endTime: Date | null;
    repeat: string[];
    notificationEnabled: number;
}
