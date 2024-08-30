import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://Axda-Web:aLMYj3JKODe4@ep-divine-unit-a2dgmufy.eu-central-1.aws.neon.tech/db_movix?sslmode=require',
  },
  verbose: true,
  strict: true,
});
