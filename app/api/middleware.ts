import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

/**
 * API key validation
 * Checks if the provided API key is valid
 */
export function validateApiKey(apiKey: string): boolean {
  // In a real implementation, this would check against stored API keys in a database
  const validKeys = [
    "sk_live_51NxXXXXXXXXXXXXXXXXXXXXXX",
    "sk_test_51NxXXXXXXXXXXXXXXXXXXXXXX",
  ];

  return validKeys.includes(apiKey);
}

/**
 * Rate limiting implementation
 * Uses a simple in-memory store for demonstration purposes
 * In production, use Redis or another distributed cache
 */
const rateLimit = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 requests per minute
  store: new Map<string, { count: number; resetTime: number }>(),

  check(ip: string): {
    limited: boolean;
    remaining: number;
    resetTime: number;
  } {
    const now = Date.now();
    const resetTime = now + this.windowMs;

    if (!this.store.has(ip)) {
      this.store.set(ip, { count: 1, resetTime });
      return { limited: false, remaining: this.maxRequests - 1, resetTime };
    }

    const record = this.store.get(ip)!;

    // Reset if window has passed
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = resetTime;
      return { limited: false, remaining: this.maxRequests - 1, resetTime };
    }

    // Increment and check
    record.count += 1;
    const remaining = Math.max(0, this.maxRequests - record.count);
    const limited = record.count > this.maxRequests;

    return { limited, remaining, resetTime: record.resetTime };
  },

  // Clean up expired entries periodically
  cleanup() {
    const now = Date.now();
    for (const [ip, record] of this.store.entries()) {
      if (now > record.resetTime) {
        this.store.delete(ip);
      }
    }
  },
};

// Start cleanup interval
setInterval(() => rateLimit.cleanup(), 60 * 1000);

/**
 * API middleware
 * Handles authentication, rate limiting, and logging for all API routes
 */
export async function apiMiddleware(req: NextRequest) {
  const start = Date.now();
  // Get IP from headers or connection
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  const method = req.method;
  const url = req.url;

  // Log request
  console.log(`[API] ${method} ${url} - IP: ${ip}`);

  // Check API key
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || !validateApiKey(apiKey)) {
    return NextResponse.json(
      { error: "Invalid or missing API key" },
      { status: 401 }
    );
  }

  // Check rate limit
  const { limited, remaining, resetTime } = rateLimit.check(ip);
  if (limited) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": rateLimit.maxRequests.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": Math.floor(resetTime / 1000).toString(),
        },
      }
    );
  }

  // Continue to the actual route handler
  const response = NextResponse.next();

  // Add rate limit headers
  response.headers.set("X-RateLimit-Limit", rateLimit.maxRequests.toString());
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  response.headers.set(
    "X-RateLimit-Reset",
    Math.floor(resetTime / 1000).toString()
  );

  // Log response time
  const duration = Date.now() - start;
  console.log(`[API] ${method} ${url} - Completed in ${duration}ms`);

  return response;
}
