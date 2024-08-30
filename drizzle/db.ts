import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const client = neon(
  "postgresql://Axda-Web:aLMYj3JKODe4@ep-divine-unit-a2dgmufy.eu-central-1.aws.neon.tech/db_movix?sslmode=require"
);

const db = drizzle(client, { schema });

export default db;
