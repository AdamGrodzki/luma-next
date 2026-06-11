import { createClient, ContentfulClientApi } from "contentful";

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";

if (!space || !accessToken) {
  throw new Error(
    "Missing Contentful environment variables. Please set CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN."
  );
}

export const contentful: ContentfulClientApi<undefined> = createClient({
  space,
  accessToken,
  environment,
});

/**
 * Custom error class for Contentful API errors
 */
export class ContentfulError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = "ContentfulError";
  }
}

/**
 * Wraps a Contentful API call with error handling
 */
export async function withContentfulErrorHandling<T>(
  operation: () => Promise<T>,
  context: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    const statusCode = (error as any)?.sys?.id === "NotFound" ? 404 : undefined;
    
    console.error(`[Contentful] Error in ${context}:`, error);
    
    throw new ContentfulError(
      `Failed to ${context}`,
      statusCode,
      error
    );
  }
}