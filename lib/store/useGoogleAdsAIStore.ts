import { create } from "zustand";

export interface BiddingStrategy {
  type:
    | "maximize_conversions"
    | "target_cpa"
    | "maximize_conversion_value"
    | "target_roas"
    | "maximize_clicks";
  targetCPA?: number;
  targetROAS?: number;
  adjustments: {
    device: boolean;
    location: boolean;
    audience: boolean;
    time: boolean;
  };
}

export interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  status: "pending" | "applied" | "dismissed";
  appliedAt?: string;
}

export interface AudienceInsight {
  id: string;
  name: string;
  description: string;
  size: "small" | "medium" | "large";
  performance: "high" | "medium" | "low";
  status: "active" | "recommended" | "inactive";
  addedAt?: string;
}

export interface GoogleAdsAISettings {
  isAIBiddingEnabled: boolean;
  isAIOptimizationEnabled: boolean;
  isAIAudienceEnabled: boolean;
  biddingStrategy: BiddingStrategy;
  optimizationScore: number;
  autoApplyOptimizations: boolean;
  optimizationNotifications: boolean;
  weeklyReports: boolean;
}

interface GoogleAdsAIState {
  settings: GoogleAdsAISettings;
  optimizationSuggestions: OptimizationSuggestion[];
  audienceInsights: AudienceInsight[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchSettings: (campaignId: string) => Promise<void>;
  updateSettings: (settings: Partial<GoogleAdsAISettings>) => Promise<void>;
  fetchOptimizationSuggestions: (campaignId: string) => Promise<void>;
  applyOptimizationSuggestion: (suggestionId: string) => Promise<void>;
  dismissOptimizationSuggestion: (suggestionId: string) => Promise<void>;
  fetchAudienceInsights: (campaignId: string) => Promise<void>;
  addAudience: (audienceId: string) => Promise<void>;
  removeAudience: (audienceId: string) => Promise<void>;
  clearError: () => void;
}

// Default settings
const defaultSettings: GoogleAdsAISettings = {
  isAIBiddingEnabled: true,
  isAIOptimizationEnabled: true,
  isAIAudienceEnabled: true,
  biddingStrategy: {
    type: "maximize_conversions",
    adjustments: {
      device: false,
      location: false,
      audience: false,
      time: false,
    },
  },
  optimizationScore: 78,
  autoApplyOptimizations: false,
  optimizationNotifications: true,
  weeklyReports: true,
};

// Mock data
const mockOptimizationSuggestions: OptimizationSuggestion[] = [
  {
    id: "1",
    title: "入札単価の最適化",
    description: "コンバージョン率の高いキーワードの入札単価を10%引き上げる",
    impact: "high",
    status: "pending",
  },
  {
    id: "2",
    title: "予算配分の調整",
    description: "パフォーマンスの高い広告グループへの予算配分を増やす",
    impact: "medium",
    status: "applied",
    appliedAt: "2024-04-15T09:30:00Z",
  },
  {
    id: "3",
    title: "デバイス別入札調整",
    description: "モバイルデバイスの入札調整を+15%に設定",
    impact: "medium",
    status: "pending",
  },
  {
    id: "4",
    title: "曜日・時間帯別入札調整",
    description: "週末の入札調整を+20%に設定",
    impact: "low",
    status: "pending",
  },
];

const mockAudienceInsights: AudienceInsight[] = [
  {
    id: "1",
    name: "コンバージョン率の高いユーザー",
    description:
      "過去30日間にコンバージョンを行ったユーザーに類似した特性を持つオーディエンス",
    size: "medium",
    performance: "high",
    status: "active",
    addedAt: "2024-04-10T14:20:00Z",
  },
  {
    id: "2",
    name: "関心カテゴリ: テクノロジー愛好家",
    description: "テクノロジー関連のコンテンツに高い関心を示すユーザー",
    size: "large",
    performance: "medium",
    status: "active",
    addedAt: "2024-04-05T11:15:00Z",
  },
  {
    id: "3",
    name: "市場セグメント: 意思決定者",
    description: "企業の意思決定に関わる役職を持つユーザー",
    size: "small",
    performance: "high",
    status: "recommended",
  },
  {
    id: "4",
    name: "カスタムインテント: 製品比較",
    description: "製品比較や評価に関する検索を行ったユーザー",
    size: "medium",
    performance: "medium",
    status: "recommended",
  },
];

export const useGoogleAdsAIStore = create<GoogleAdsAIState>()((set, get) => ({
  settings: defaultSettings,
  optimizationSuggestions: [],
  audienceInsights: [],
  isLoading: false,
  error: null,

  fetchSettings: async (campaignId: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 500));

      set({ settings: defaultSettings, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Google広告AI設定の取得に失敗しました",
        isLoading: false,
      });
    }
  },

  updateSettings: async (settings: Partial<GoogleAdsAISettings>) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 500));

      set((state) => ({
        settings: { ...state.settings, ...settings },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Google広告AI設定の更新に失敗しました",
        isLoading: false,
      });
    }
  },

  fetchOptimizationSuggestions: async (campaignId: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 800));

      set({
        optimizationSuggestions: mockOptimizationSuggestions,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "最適化提案の取得に失敗しました",
        isLoading: false,
      });
    }
  },

  applyOptimizationSuggestion: async (suggestionId: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 800));

      set((state) => ({
        optimizationSuggestions: state.optimizationSuggestions.map(
          (suggestion) =>
            suggestion.id === suggestionId
              ? {
                  ...suggestion,
                  status: "applied",
                  appliedAt: new Date().toISOString(),
                }
              : suggestion
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "最適化提案の適用に失敗しました",
        isLoading: false,
      });
    }
  },

  dismissOptimizationSuggestion: async (suggestionId: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 500));

      set((state) => ({
        optimizationSuggestions: state.optimizationSuggestions.map(
          (suggestion) =>
            suggestion.id === suggestionId
              ? { ...suggestion, status: "dismissed" }
              : suggestion
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "最適化提案の却下に失敗しました",
        isLoading: false,
      });
    }
  },

  fetchAudienceInsights: async (campaignId: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 800));

      set({ audienceInsights: mockAudienceInsights, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "オーディエンスインサイトの取得に失敗しました",
        isLoading: false,
      });
    }
  },

  addAudience: async (audienceId: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 800));

      set((state) => ({
        audienceInsights: state.audienceInsights.map((audience) =>
          audience.id === audienceId
            ? {
                ...audience,
                status: "active",
                addedAt: new Date().toISOString(),
              }
            : audience
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "オーディエンスの追加に失敗しました",
        isLoading: false,
      });
    }
  },

  removeAudience: async (audienceId: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 500));

      set((state) => ({
        audienceInsights: state.audienceInsights.map((audience) =>
          audience.id === audienceId
            ? { ...audience, status: "inactive" }
            : audience
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "オーディエンスの削除に失敗しました",
        isLoading: false,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
