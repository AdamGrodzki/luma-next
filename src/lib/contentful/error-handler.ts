/**
 * Error handling utilities for Contentful API calls
 */

export class ContentfulError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'ContentfulError';
  }
}

/**
 * Retry wrapper for Contentful API calls
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries) {
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, attempt)));
        continue;
      }
    }
  }

  throw new ContentfulError(
    `Failed after ${maxRetries + 1} attempts`,
    lastError
  );
}

/**
 * Safe wrapper for Contentful API calls with error handling
 */
export async function safeContentfulCall<T>(
  fn: () => Promise<T>,
  fallback: T,
  errorContext?: string
): Promise<T> {
  try {
    return await withRetry(fn);
  } catch (error) {
    // Only log detailed errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `[Contentful Error]${errorContext ? ` ${errorContext}:` : ''}`,
        error instanceof Error ? error.message : String(error)
      );
    } else {
      // In production, log minimal info
      console.error('[Contentful Error]', errorContext || 'Unknown operation failed');
    }
    return fallback;
  }
}
