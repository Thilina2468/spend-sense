export interface CloudflareEnv {
  DB: any;
  JWT_SECRET: string;
}

// User types are exported from schema.ts via Drizzle
export type { User, NewUser } from '../../schema';
