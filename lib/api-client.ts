/**
 * API Client for interacting with the Advertising Management API
 */

// API base URL
const API_BASE_URL = "/api";

// Default request options
const defaultOptions: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Get the API key from local storage
 */
function getApiKey(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("api_key");
}

/**
 * Set the API key in local storage
 */
export function setApiKey(apiKey: string): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("api_key", apiKey);
}

/**
 * Clear the API key from local storage
 */
export function clearApiKey(): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem("api_key");
}

/**
 * Add authentication headers to request options
 */
function withAuth(options: RequestInit = {}): RequestInit {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error("API key not found. Please set an API key first.");
  }

  return {
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
      "x-api-key": apiKey,
    },
  };
}

/**
 * Handle API response
 */
async function handleResponse<T>(response: Response): Promise<T> {
  // Check if the response is JSON
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  // Parse the response body
  const data = isJson ? await response.json() : await response.text();

  // Handle error responses
  if (!response.ok) {
    const error =
      isJson && data.error ? data.error : "An unknown error occurred";
    throw new Error(error);
  }

  return data as T;
}

/**
 * Make a GET request to the API
 */
export async function get<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...defaultOptions,
    ...withAuth(options),
    method: "GET",
  });

  return handleResponse<T>(response);
}

/**
 * Make a POST request to the API
 */
export async function post<T>(
  path: string,
  data: any,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...defaultOptions,
    ...withAuth(options),
    method: "POST",
    body: JSON.stringify(data),
  });

  return handleResponse<T>(response);
}

/**
 * Make a PUT request to the API
 */
export async function put<T>(
  path: string,
  data: any,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...defaultOptions,
    ...withAuth(options),
    method: "PUT",
    body: JSON.stringify(data),
  });

  return handleResponse<T>(response);
}

/**
 * Make a DELETE request to the API
 */
export async function del<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...defaultOptions,
    ...withAuth(options),
    method: "DELETE",
  });

  return handleResponse<T>(response);
}

/**
 * Connect to the WebSocket API
 */
export function connectWebSocket(
  onMessage: (data: any) => void,
  onOpen?: () => void,
  onClose?: () => void,
  onError?: (error: Event) => void
): WebSocket {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error("API key not found. Please set an API key first.");
  }

  // Create WebSocket connection
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const host = window.location.host;
  const ws = new WebSocket(`${protocol}//${host}/api/ws`);

  // Set up event handlers
  ws.onopen = (event) => {
    // Send authentication message
    ws.send(
      JSON.stringify({
        type: "auth",
        apiKey,
      })
    );

    if (onOpen) {
      onOpen();
    }
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  ws.onclose = (event) => {
    if (onClose) {
      onClose();
    }
  };

  ws.onerror = (event) => {
    if (onError) {
      onError(event);
    }
  };

  return ws;
}

/**
 * Subscribe to a WebSocket channel
 */
export function subscribeToChannel(ws: WebSocket, channel: string): void {
  ws.send(
    JSON.stringify({
      type: "subscribe",
      channel,
    })
  );
}

/**
 * Unsubscribe from a WebSocket channel
 */
export function unsubscribeFromChannel(ws: WebSocket, channel: string): void {
  ws.send(
    JSON.stringify({
      type: "unsubscribe",
      channel,
    })
  );
}

/**
 * API client object with all methods
 */
const apiClient = {
  setApiKey,
  clearApiKey,
  get,
  post,
  put,
  delete: del,
  connectWebSocket,
  subscribeToChannel,
  unsubscribeFromChannel,
};

export default apiClient;
