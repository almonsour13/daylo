import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/db/schema/index.ts",
    out: "./src/db/migrations",
    dialect: "sqlite",
    driver: "expo",
    dbCredentials: {
        url: "db.db",
    },
    verbose: true,
    strict: true,
});
