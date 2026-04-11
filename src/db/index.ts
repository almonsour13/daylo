import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import * as schema from "./schema";

const customLogger = {
    logQuery(query: string, params: unknown[]) {
        console.log("[DB] Query:", query);
        console.log("[DB] Params:", params);
    },
};

console.log("[DB] Opening database...");
export const expoDb = SQLite.openDatabaseSync("db.db");
console.log("[DB] Database opened successfully");

export const db = drizzle(expoDb, { schema, logger: customLogger });
console.log("[DB] Drizzle initialized");
