import { createClient } from "contentful";

const space = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN!;
const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";

export const contentful = createClient({
  space,
  accessToken,
  environment,
});