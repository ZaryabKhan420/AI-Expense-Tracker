import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Conf } from "../src/Conf/Conf.js";
import * as schema from "./schema";
const sql = neon(Conf.VITE_DRIZZLE_DATABASE_URL);
export const db = drizzle(sql, { schema });
