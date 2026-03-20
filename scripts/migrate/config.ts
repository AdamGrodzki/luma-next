// scripts/migrate/config.ts
import { createClient } from "contentful-management";

export const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
export const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";
export const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

export const client = createClient({
  accessToken: MANAGEMENT_TOKEN,
});

export async function getEnvironment() {
  const space = await client.getSpace(SPACE_ID);
  return space.getEnvironment(ENVIRONMENT_ID);
}