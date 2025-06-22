import { z } from "zod";
import { GenerateImagesResponse, GoogleGenAI } from "@google/genai";

// Imagen API configuration from environment variables
const IMAGEN_API_KEY =
  process.env.NEXT_PUBLIC_IMAGEN_API_KEY || "DUMMY_API_KEY";
const IMAGEN_API_URL =
  process.env.NEXT_PUBLIC_IMAGEN_API_URL ||
  "https://generativelanguage.googleapis.com/v1beta/models";
const IMAGEN_MODEL =
  process.env.NEXT_PUBLIC_IMAGEN_MODEL || "imagen-3.0-generate-002";

const ai = new GoogleGenAI({ apiKey: IMAGEN_API_KEY });

// Schema for Imagen API request based on Imagen 3.0 documentation
const imagenRequestSchema = z.object({
  contents: z.array(
    z.object({
      role: z.string(),
      parts: z.array(
        z.object({
          text: z.string(),
        })
      ),
    })
  ),
  generationConfig: z
    .object({
      sampleCount: z.number().optional(),
      sampleImageSize: z
        .object({
          width: z.number(),
          height: z.number(),
        })
        .optional(),
    })
    .optional(),
});

// Schema for Imagen API response based on Imagen 3.0 documentation
const imagenResponseSchema = z.object({
  candidates: z.array(
    z.object({
      content: z.object({
        parts: z.array(
          z.object({
            inlineData: z.object({
              mimeType: z.string(),
              data: z.string(), // Base64 encoded image data
            }),
          })
        ),
      }),
    })
  ),
});

// Type definitions
export type ImagenRequest = z.infer<typeof imagenRequestSchema>;
export type ImagenResponse = z.infer<typeof imagenResponseSchema>;

/**
 * Base function to make requests to the Imagen API
 */
export async function callImagenAPI(
  prompt: string,
  options?: {
    sampleCount?: number;
    width?: number;
    height?: number;
  }
): Promise<any> {
  try {
    console.log("Calling Imagen API with:", {
      model: IMAGEN_MODEL,
      prompt: prompt.substring(0, 100),
      options,
      apiKey: IMAGEN_API_KEY ? "Set" : "Not set",
    });

    if (!IMAGEN_API_KEY || IMAGEN_API_KEY === "DUMMY_API_KEY") {
      throw new Error("Imagen API key is not properly configured");
    }

    // Use the correct API method for image generation according to official docs
    const response = await ai.models.generateImages({
      model: IMAGEN_MODEL,
      prompt: prompt,
      config: {
        numberOfImages: 1,
        includeRaiReason: true,
        includeSafetyAttributes: true,
      },
    });

    console.log("Imagen API response:", response);
    return response;
  } catch (error) {
    console.error("Imagen API error:", error);
    console.error("Imagen API request parameters:", {
      prompt: prompt.substring(0, 200),
      model: IMAGEN_MODEL,
      options: options ? JSON.stringify(options) : "undefined",
      apiKeyStatus: IMAGEN_API_KEY ? "Set" : "Not set",
    });
    throw error;
  }
}

export async function generateAdImage(
  productInfo: string,
  targetAudience: string,
  adSize: "square" | "landscape" | "portrait" | "banner" = "square",
  style?: string
): Promise<string[]> {
  // Define dimensions based on ad size
  let width = 1024;
  let height = 1024;

  switch (adSize) {
    case "landscape":
      width = 1200;
      height = 628; // Facebook/social media ad size
      break;
    case "portrait":
      width = 1080;
      height = 1350; // Instagram portrait size
      break;
    case "banner":
      width = 728;
      height = 90; // Standard banner ad
      break;
    case "square":
    default:
      width = 1080;
      height = 1080; // Square format
      break;
  }

  let prompt = `Create a professional advertising image for the following product/service:
Product/Service: ${productInfo}
Target Audience: ${targetAudience}
`;

  if (style) {
    prompt += `Style: ${style}\n`;
  }

  prompt += `\nThe image should be visually appealing, professional, and clearly communicate the value proposition. It should be suitable for digital advertising.`;

  const response = await callImagenAPI(prompt, {
    width,
    height,
    sampleCount: 2,
  });

  // Extract image data from the response according to official Imagen 3.0 API format
  const imageDataArray: string[] = [];

  if (response.generatedImages) {
    for (const generatedImage of response.generatedImages) {
      if (generatedImage.image?.imageBytes) {
        imageDataArray.push(generatedImage.image.imageBytes);
      }
    }
  }

  return imageDataArray;
}

/**
 * Optimize an existing image for advertising
 */
export async function optimizeAdImage(
  imageBase64: string,
  optimizationType: "resize" | "enhance" | "crop" = "enhance",
  targetWidth?: number,
  targetHeight?: number
): Promise<string> {
  // In a real implementation, this would send the image to the Imagen API
  // for optimization. For now, we'll just return the original image.
  // This is a placeholder for the actual implementation.

  // Mock implementation - in reality, this would call the Imagen API
  // with the appropriate parameters for the requested optimization
  return imageBase64;
}
