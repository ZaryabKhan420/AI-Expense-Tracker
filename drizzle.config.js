import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:LTn7Cq9ukUdj@ep-noisy-violet-a5iaaalo.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
});
