import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless";

const sql = neon(
  "postgresql://Axda-Web:aLMYj3JKODe4@ep-divine-unit-a2dgmufy.eu-central-1.aws.neon.tech/db_movix?sslmode=require"
);

const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "./drizzle/migrations",
    });
    console.log("Migration successful!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
