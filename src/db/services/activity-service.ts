// services/activity-service.ts
import {
    activityRepository,
    Activity,
    CreateActivityInput,
    UpdateActivityInput,
} from "../repositories/activity-respositories";

export const activityService = {
    async getActivities(): Promise<Activity[]> {
        return activityRepository.getAll();
    },
    async getActivity(id: number): Promise<Activity | undefined> {
        return activityRepository.get(id);
    },
    async createActivity(data: CreateActivityInput): Promise<Activity> {
        return activityRepository.create(data);
    },
    async updateActivity(
        id: number,
        data: UpdateActivityInput,
    ): Promise<Activity | undefined> {
        return activityRepository.update(id, data);
    },
    async deleteActivity(id: number): Promise<boolean> {
        return activityRepository.delete(id);
    },
};
