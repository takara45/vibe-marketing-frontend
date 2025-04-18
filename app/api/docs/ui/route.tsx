import { NextRequest } from "next/server";

/**
 * GET handler for API documentation UI
 * Returns an HTML page with Swagger UI
 */
export async function GET(request: NextRequest) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advertising Management API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui.css" />
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .swagger-ui .topbar {
      background-color: #333;
      padding: 10px 0;
    }
    .swagger-ui .topbar .wrapper {
      padding: 0 20px;
    }
    .swagger-ui .topbar .download-url-wrapper {
      display: flex;
      align-items: center;
    }
    .swagger-ui .topbar .download-url-wrapper .select-label {
      color: white;
    }
    .swagger-ui .info {
      margin: 20px 0;
    }
    .swagger-ui .info .title {
      font-size: 36px;
      margin: 0;
      color: #333;
    }
    .swagger-ui .info .description {
      font-size: 16px;
      margin: 10px 0;
    }
    .swagger-ui .scheme-container {
      margin: 0;
      padding: 20px 0;
      background-color: #f8f8f8;
    }
    .swagger-ui .opblock {
      margin: 0 0 15px;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .swagger-ui .opblock .opblock-summary {
      padding: 10px;
    }
    .swagger-ui .opblock .opblock-summary-method {
      border-radius: 3px;
      font-size: 14px;
      font-weight: bold;
      min-width: 80px;
      text-align: center;
    }
    .swagger-ui .opblock .opblock-summary-path {
      font-size: 16px;
      font-weight: normal;
    }
    .swagger-ui .opblock .opblock-summary-description {
      font-size: 13px;
      color: #666;
    }
    .swagger-ui .opblock-tag {
      font-size: 24px;
      margin: 20px 0 10px;
    }
    .swagger-ui .response-col_status {
      font-size: 14px;
    }
    .swagger-ui .response-col_description {
      font-size: 14px;
    }
    .swagger-ui .parameters-col_name {
      font-size: 14px;
    }
    .swagger-ui .parameters-col_description {
      font-size: 14px;
    }
    .swagger-ui .btn {
      border-radius: 4px;
    }
    .swagger-ui .btn.execute {
      background-color: #4990e2;
    }
    .swagger-ui .btn.cancel {
      background-color: #f44336;
    }
    .swagger-ui .btn.authorize {
      background-color: #49cc90;
    }
    .swagger-ui section.models {
      margin: 20px 0;
    }
    .swagger-ui section.models .model-container {
      margin: 0 0 15px;
    }
    .swagger-ui section.models .model-box {
      padding: 10px;
    }
    .swagger-ui .model {
      font-size: 14px;
    }
    .swagger-ui .model-title {
      font-size: 16px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: "/api/docs",
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "BaseLayout",
        defaultModelsExpandDepth: 1,
        defaultModelExpandDepth: 1,
        defaultModelRendering: 'model',
        displayRequestDuration: true,
        docExpansion: 'list',
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        syntaxHighlight: {
          activate: true,
          theme: "agate"
        }
      });
      
      window.ui = ui;
    };
  </script>
</body>
</html>
  `;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
