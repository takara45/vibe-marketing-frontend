"use client";

import { useState } from "react";
import { RefreshCwIcon, UploadIcon } from "lucide-react";
import { optimizeAdImage } from "@/lib/imagen-api";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ImageOptimizerProps {
  imageUrl?: string;
  onOptimized?: (optimizedImageUrl: string) => void;
}

export function ImageOptimizer({ imageUrl, onOptimized }: ImageOptimizerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    imageUrl || null
  );
  const [optimizedImage, setOptimizedImage] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationError, setOptimizationError] = useState<string | null>(
    null
  );
  const [optimizationType, setOptimizationType] = useState<
    "resize" | "enhance" | "crop"
  >("enhance");
  const [targetWidth, setTargetWidth] = useState<number>(1080);
  const [targetHeight, setTargetHeight] = useState<number>(1080);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        // Extract base64 part from data URL
        const base64 = result.split(",")[1];
        setSelectedImage(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleOptimize = async () => {
    if (!selectedImage) return;

    setIsOptimizing(true);
    setOptimizationError(null);

    try {
      const optimized = await optimizeAdImage(
        selectedImage,
        optimizationType,
        targetWidth,
        targetHeight
      );

      setOptimizedImage(optimized);

      if (onOptimized) {
        onOptimized(optimized);
      }
    } catch (error) {
      console.error("Image optimization error:", error);
      setOptimizationError(
        "画像の最適化中にエラーが発生しました。後でもう一度お試しください。"
      );
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">画像の最適化</p>
        <p className="text-sm text-muted-foreground">
          広告用に画像を最適化します。サイズ変更、画質向上、クロップなどが可能です。
        </p>
      </div>

      {!selectedImage && (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">クリックしてアップロード</span>
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF (最大 10MB)</p>
            </div>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      )}

      {selectedImage && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">元の画像</p>
              <div className="rounded-md border overflow-hidden">
                <img
                  src={
                    selectedImage.startsWith("data:")
                      ? selectedImage
                      : `data:image/png;base64,${selectedImage}`
                  }
                  alt="Original image"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">最適化された画像</p>
              <div
                className="rounded-md border overflow-hidden bg-gray-50 flex items-center justify-center"
                style={{ minHeight: "200px" }}
              >
                {optimizedImage ? (
                  <img
                    src={
                      optimizedImage.startsWith("data:")
                        ? optimizedImage
                        : `data:image/png;base64,${optimizedImage}`
                    }
                    alt="Optimized image"
                    className="w-full h-auto"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    最適化すると、ここに結果が表示されます
                  </p>
                )}
              </div>
            </div>
          </div>

          <Tabs
            defaultValue="enhance"
            onValueChange={(value) => setOptimizationType(value as any)}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="enhance">画質向上</TabsTrigger>
              <TabsTrigger value="resize">サイズ変更</TabsTrigger>
              <TabsTrigger value="crop">クロップ</TabsTrigger>
            </TabsList>

            <TabsContent value="enhance" className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">
                AIを使用して画像の品質を向上させます。ノイズ除去、シャープネス向上、色補正などが行われます。
              </p>
            </TabsContent>

            <TabsContent value="resize" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    幅 (px): {targetWidth}
                  </label>
                  <Slider
                    value={[targetWidth]}
                    min={100}
                    max={2000}
                    step={10}
                    onValueChange={(value) => setTargetWidth(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    高さ (px): {targetHeight}
                  </label>
                  <Slider
                    value={[targetHeight]}
                    min={100}
                    max={2000}
                    step={10}
                    onValueChange={(value) => setTargetHeight(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">プリセット</label>
                  <Select
                    onValueChange={(value) => {
                      const [width, height] = value.split("x").map(Number);
                      setTargetWidth(width);
                      setTargetHeight(height);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="サイズを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1080x1080">
                        正方形 (1080x1080)
                      </SelectItem>
                      <SelectItem value="1200x628">
                        ランドスケープ (1200x628)
                      </SelectItem>
                      <SelectItem value="1080x1350">
                        ポートレート (1080x1350)
                      </SelectItem>
                      <SelectItem value="728x90">バナー (728x90)</SelectItem>
                      <SelectItem value="300x250">
                        レクタングル (300x250)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="crop" className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">
                AIが自動的に画像の重要な部分を検出し、最適なクロップを提案します。
              </p>

              <div className="space-y-2">
                <label className="text-sm font-medium">クロップ比率</label>
                <Select
                  onValueChange={(value) => {
                    const [width, height] = value.split(":").map(Number);
                    const newHeight = (targetWidth / width) * height;
                    setTargetHeight(Math.round(newHeight));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="比率を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1:1">1:1 (正方形)</SelectItem>
                    <SelectItem value="16:9">
                      16:9 (ワイドスクリーン)
                    </SelectItem>
                    <SelectItem value="4:3">4:3 (標準)</SelectItem>
                    <SelectItem value="3:2">3:2 (写真)</SelectItem>
                    <SelectItem value="9:16">9:16 (縦長)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          {optimizationError && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
              {optimizationError}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedImage(null);
                setOptimizedImage(null);
              }}
            >
              キャンセル
            </Button>
            <Button onClick={handleOptimize} disabled={isOptimizing}>
              {isOptimizing ? (
                <>
                  <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                  最適化中...
                </>
              ) : (
                "最適化"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
