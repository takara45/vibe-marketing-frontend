import { z } from "zod";
import { GoogleGenAI, Modality } from "@google/genai";

// Use Gemini API key for image generation
const GEMINI_API_KEY =
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || "DUMMY_API_KEY";
const GEMINI_IMAGE_MODEL = "gemini-2.0-flash-preview-image-generation";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

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
 * Generate images using Gemini 2.0 Flash image generation
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
    console.log("Generating image with Gemini:", {
      model: GEMINI_IMAGE_MODEL,
      prompt: prompt.substring(0, 100),
      options,
      apiKey: GEMINI_API_KEY ? "Set" : "Not set",
    });

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "DUMMY_API_KEY") {
      throw new Error("Gemini API key is not properly configured");
    }

    // Generate content with image generation capability
    const response = await ai.models.generateContent({
      model: GEMINI_IMAGE_MODEL,
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],

        // temperature: 0.7,
        // maxOutputTokens: 1024,
      },
    });

    console.log("Gemini image generation response:", response);

    // Extract generated images
    const generatedImages: string[] = [];

    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData && part.inlineData.data) {
            generatedImages.push(part.inlineData.data);
          }
        }
      }
    }

    return {
      generatedImages,
      dimensions: {
        width: options?.width || 1024,
        height: options?.height || 1024,
      },
      sampleCount: generatedImages.length,
    };
  } catch (error) {
    console.error("Gemini image generation error:", error);
    console.error("Gemini API request parameters:", {
      prompt: prompt.substring(0, 200),
      model: GEMINI_IMAGE_MODEL,
      options: options ? JSON.stringify(options) : "undefined",
      apiKeyStatus: GEMINI_API_KEY ? "Set" : "Not set",
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
Dimensions: ${width}x${height} (${adSize} format)
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

  // Return actual generated images
  return response.generatedImages || [];
}
