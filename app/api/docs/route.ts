import { NextRequest, NextResponse } from "next/server";

/**
 * OpenAPI specification for the Advertising Management API
 */
const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Advertising Management API",
    description:
      "API for managing advertising campaigns, analytics, and settings",
    version: "1.0.0",
    contact: {
      name: "API Support",
      email: "support@example.com",
    },
  },
  servers: [
    {
      url: "/api",
      description: "API server",
    },
  ],
  components: {
    securitySchemes: {
      apiKey: {
        type: "apiKey",
        in: "header",
        name: "x-api-key",
        description: "API key for authentication",
      },
    },
    schemas: {
      Campaign: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the campaign",
          },
          name: {
            type: "string",
            description: "Name of the campaign",
          },
          status: {
            type: "string",
            enum: ["draft", "active", "paused", "completed"],
            description: "Current status of the campaign",
          },
          budget: {
            type: "number",
            description: "Total budget for the campaign",
          },
          dailyBudget: {
            type: "number",
            description: "Daily budget for the campaign",
          },
          startDate: {
            type: "string",
            format: "date",
            description: "Start date of the campaign",
          },
          endDate: {
            type: "string",
            format: "date",
            description: "End date of the campaign",
          },
          platform: {
            type: "string",
            description: "Advertising platform",
          },
          objective: {
            type: "string",
            description: "Campaign objective",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Creation timestamp",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Last update timestamp",
          },
        },
        required: [
          "name",
          "budget",
          "dailyBudget",
          "startDate",
          "platform",
          "objective",
        ],
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            description: "Error message",
          },
        },
      },
    },
  },
  security: [
    {
      apiKey: [],
    },
  ],
  paths: {
    "/": {
      get: {
        summary: "API Information",
        description: "Returns basic API information and available endpoints",
        responses: {
          "200": {
            description: "API information",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    version: { type: "string" },
                    status: { type: "string" },
                    documentation: { type: "string" },
                    endpoints: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/campaigns": {
      get: {
        summary: "List Campaigns",
        description: "Returns a list of campaigns with optional filtering",
        parameters: [
          {
            name: "status",
            in: "query",
            description: "Filter by campaign status",
            schema: {
              type: "string",
              enum: ["draft", "active", "paused", "completed"],
            },
          },
          {
            name: "platform",
            in: "query",
            description: "Filter by advertising platform",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "List of campaigns",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Campaign",
                      },
                    },
                    meta: {
                      type: "object",
                      properties: {
                        total: { type: "number" },
                        page: { type: "number" },
                        limit: { type: "number" },
                      },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "429": {
            description: "Rate limit exceeded",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create Campaign",
        description: "Creates a new campaign",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Campaign",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Campaign created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      $ref: "#/components/schemas/Campaign",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "429": {
            description: "Rate limit exceeded",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/campaigns/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Campaign ID",
          schema: {
            type: "string",
          },
        },
      ],
      get: {
        summary: "Get Campaign",
        description: "Returns a campaign by ID",
        responses: {
          "200": {
            description: "Campaign details",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      $ref: "#/components/schemas/Campaign",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "404": {
            description: "Campaign not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "429": {
            description: "Rate limit exceeded",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update Campaign",
        description: "Updates a campaign by ID",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Campaign",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Campaign updated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      $ref: "#/components/schemas/Campaign",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "404": {
            description: "Campaign not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "429": {
            description: "Rate limit exceeded",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete Campaign",
        description: "Deletes a campaign by ID",
        responses: {
          "200": {
            description: "Campaign deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      $ref: "#/components/schemas/Campaign",
                    },
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "404": {
            description: "Campaign not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "429": {
            description: "Rate limit exceeded",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/ws": {
      get: {
        summary: "WebSocket Connection",
        description: "Establishes a WebSocket connection for real-time updates",
        responses: {
          "101": {
            description: "WebSocket connection established",
          },
          "426": {
            description: "Upgrade required",
            content: {
              "text/plain": {
                schema: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

/**
 * GET handler for API documentation
 * Returns the OpenAPI specification
 */
export async function GET(request: NextRequest) {
  return NextResponse.json(openApiSpec);
}
