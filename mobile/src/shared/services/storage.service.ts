import { logger } from "@/shared/utils/logger";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PREFIX } from "../constants/constant";

export class StorageService<T = unknown> {
    constructor(private readonly key: string) {}

    async get(): Promise<T | null> {
        try {
            const value = await AsyncStorage.getItem(this.key);
            return value ? (JSON.parse(value) as T) : null;
        } catch (error) {
            logger.error(`Error getting ${this.key}:`, error);
            // Corrupt value: drop it so it doesn't fail on every read
            await AsyncStorage.removeItem(this.key).catch(() => {});
            return null;
        }
    }

    async set(data: T): Promise<void> {
        try {
            await AsyncStorage.setItem(this.key, JSON.stringify(data));
        } catch (error) {
            logger.error(`Error setting ${this.key}:`, error);
        }
    }

    async remove(): Promise<void> {
        try {
            await AsyncStorage.removeItem(this.key);
        } catch (error) {
            logger.error(`Error removing ${this.key}:`, error);
        }
    }

    /** Shallow-merges into the stored object. Only for object values. */
    async update(partial: Partial<T>): Promise<void> {
        try {
            const current = await this.get();
            const isObject =
                current !== null &&
                typeof current === "object" &&
                !Array.isArray(current);

            await this.set(
                isObject ? ({ ...current, ...partial } as T) : (partial as T),
            );
        } catch (error) {
            logger.error(`Error updating ${this.key}:`, error);
        }
    }

    /** Removes every key that starts with PREFIX. Throws so callers can react. */
    static async resetAll(): Promise<void> {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const appKeys = keys.filter((k) => k.startsWith(PREFIX));
            if (appKeys.length > 0) {
                await AsyncStorage.multiRemove(appKeys);
            }
        } catch (error) {
            logger.error("Error resetting all storage:", error);
            throw error;
        }
    }
}
