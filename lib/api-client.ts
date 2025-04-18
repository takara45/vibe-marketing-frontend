/**
 * API Client for making requests to the backend
 * This is a wrapper around fetch that adds authentication, error handling, and other common functionality
 */

// Base URL for API requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Types
export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  signal?: AbortSignal;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Helper function to build URL with query parameters
const buildUrl = (path: string, params?: Record<string, string>): string => {
  const url = new URL(`${API_BASE_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }

  return url.toString();
};

// Main request function
export async function request<T = any>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = "GET",
    headers = {},
    body,
    params,
    cache = "default",
    credentials = "same-origin",
    signal,
  } = options;

  // Build request URL with query parameters
  const url = buildUrl(path, params);

  // Prepare headers
  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
  };

  // Get auth token from localStorage (if available)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth-token");
    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  // Prepare request options
  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    cache,
    credentials,
    signal,
  };

  // Add body for non-GET requests
  if (method !== "GET" && body !== undefined) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    // Make the request
    const response = await fetch(url, requestOptions);

    // Parse response data
    let data: T;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      // Handle non-JSON responses
      const text = await response.text();
      data = text as unknown as T;
    }

    // Handle error responses
    if (!response.ok) {
      throw new ApiError(
        `API request failed with status ${response.status}`,
        response.status,
        data
      );
    }

    // Return successful response
    return {
      data,
      status: response.status,
      headers: response.headers,
    };
  } catch (error) {
    // Re-throw ApiError instances
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle fetch errors (network issues, etc.)
    if (error instanceof Error) {
      throw new ApiError(
        `API request failed: ${error.message}`,
        0, // Use 0 for network errors
        null
      );
    }

    // Handle unknown errors
    throw new ApiError("Unknown API error", 0, null);
  }
}

// Convenience methods for common HTTP methods
export const api = {
  get: <T = any>(
    path: string,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(path, { ...options, method: "GET" }),

  post: <T = any>(
    path: string,
    body?: any,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(path, { ...options, method: "POST", body }),

  put: <T = any>(
    path: string,
    body?: any,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(path, { ...options, method: "PUT", body }),

  patch: <T = any>(
    path: string,
    body?: any,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<T>(path, { ...options, method: "PATCH", body }),

  delete: <T = any>(path: string, options?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...options, method: "DELETE" }),
};

export default api;
