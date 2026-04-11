export interface Activity {
    name: string;
    description: string;
    priority: number;
    date: string; // ✅ "YYYY-MM-DD" string, not Date
    startTime: string;
    endTime: string;
    repeat: string;
    notificationEnabled: number;
}
