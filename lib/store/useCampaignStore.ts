import { create } from "zustand";

export interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "ended" | "draft";
  budget: number;
  dailyBudget: number;
  startDate: string;
  endDate?: string;
  objective: string;
  targetAudience: string[];
  adGroups: string[];
  performance?: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    ctr: number;
    cpc: number;
    conversionRate: number;
  };
}

export interface AdGroup {
  id: string;
  campaignId: string;
  name: string;
  status: "active" | "paused" | "ended" | "draft";
  ads: string[];
  keywords: string[];
  targeting: {
    locations: string[];
    devices: string[];
    demographics: {
      ageRanges: string[];
      genders: string[];
    };
  };
  cpc: {
    current: number;
    previous: number;
    trend: 'up' | 'down' | 'stable';
    category: 'high' | 'medium' | 'low';
  };
  keywordDetails: Array<{
    keyword: string;
    cpc: number;
    quality_score: number;
    impressions: number;
    clicks: number;
  }>;
}

interface CampaignState {
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  adGroups: AdGroup[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCampaigns: () => Promise<void>;
  fetchCampaign: (id: string) => Promise<void>;
  fetchAdGroups: (campaignId: string) => Promise<void>;
  createCampaign: (campaign: Omit<Campaign, "id">) => Promise<Campaign>;
  updateCampaign: (id: string, data: Partial<Campaign>) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
  selectCampaign: (campaign: Campaign | null) => void;
  clearError: () => void;
}

// Mock data
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "夏季セールキャンペーン",
    status: "active",
    budget: 500000,
    dailyBudget: 10000,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    objective: "sales",
    targetAudience: ["existing_customers", "similar_audiences"],
    adGroups: ["1", "2"],
    performance: {
      impressions: 125430,
      clicks: 3842,
      conversions: 187,
      cost: 350000,
      ctr: 3.06,
      cpc: 91.1,
      conversionRate: 4.87,
    },
  },
  {
    id: "2",
    name: "新商品プロモーション",
    status: "active",
    budget: 300000,
    dailyBudget: 5000,
    startDate: "2024-05-15",
    objective: "awareness",
    targetAudience: ["new_customers"],
    adGroups: ["3"],
    performance: {
      impressions: 85240,
      clicks: 2105,
      conversions: 42,
      cost: 120000,
      ctr: 2.47,
      cpc: 57.0,
      conversionRate: 2.0,
    },
  },
  {
    id: "3",
    name: "ブランド認知度向上",
    status: "paused",
    budget: 200000,
    dailyBudget: 3000,
    startDate: "2024-04-01",
    endDate: "2024-05-31",
    objective: "brand_awareness",
    targetAudience: ["all_audiences"],
    adGroups: ["4", "5"],
    performance: {
      impressions: 95120,
      clicks: 1850,
      conversions: 15,
      cost: 98000,
      ctr: 1.94,
      cpc: 53.0,
      conversionRate: 0.81,
    },
  },
];

const mockAdGroups: AdGroup[] = [
  {
    id: "1",
    campaignId: "1",
    name: "夏季セール - モバイル",
    status: "active",
    ads: ["1", "2", "3"],
    keywords: ["夏季セール", "サマーセール", "夏物商品"],
    targeting: {
      locations: ["東京", "大阪", "名古屋"],
      devices: ["mobile", "tablet"],
      demographics: {
        ageRanges: ["25-34", "35-44"],
        genders: ["male", "female"],
      },
    },
    cpc: {
      current: 95.2,
      previous: 87.8,
      trend: 'up',
      category: 'medium',
    },
    keywordDetails: [
      { keyword: "夏季セール", cpc: 102.5, quality_score: 8, impressions: 12500, clicks: 420 },
      { keyword: "サマーセール", cpc: 87.9, quality_score: 7, impressions: 8900, clicks: 295 },
      { keyword: "夏物商品", cpc: 95.2, quality_score: 9, impressions: 15200, clicks: 510 },
    ],
  },
  {
    id: "2",
    campaignId: "1",
    name: "夏季セール - デスクトップ",
    status: "active",
    ads: ["4", "5"],
    keywords: ["夏季セール", "サマーセール", "夏物商品"],
    targeting: {
      locations: ["東京", "大阪", "名古屋"],
      devices: ["desktop"],
      demographics: {
        ageRanges: ["25-34", "35-44", "45-54"],
        genders: ["male", "female"],
      },
    },
    cpc: {
      current: 86.7,
      previous: 82.3,
      trend: 'up',
      category: 'low',
    },
    keywordDetails: [
      { keyword: "夏季セール", cpc: 78.5, quality_score: 9, impressions: 18200, clicks: 682 },
      { keyword: "サマーセール", cpc: 92.1, quality_score: 8, impressions: 14800, clicks: 485 },
      { keyword: "夏物商品", cpc: 89.5, quality_score: 8, impressions: 16900, clicks: 548 },
    ],
  },
];

export const useCampaignStore = create<CampaignState>()((set, get) => ({
  campaigns: [],
  selectedCampaign: null,
  adGroups: [],
  isLoading: false,
  error: null,

  fetchCampaigns: async () => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set({ campaigns: mockCampaigns, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "キャンペーンの取得に失敗しました",
        isLoading: false,
      });
    }
  },

  fetchCampaign: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 500));

      const campaign = mockCampaigns.find((c) => c.id === id) || null;
      set({ selectedCampaign: campaign, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "キャンペーンの取得に失敗しました",
        isLoading: false,
      });
    }
  },

  fetchAdGroups: async (campaignId: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 500));

      const adGroups = mockAdGroups.filter(
        (ag) => ag.campaignId === campaignId
      );
      set({ adGroups, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "広告グループの取得に失敗しました",
        isLoading: false,
      });
    }
  },

  createCampaign: async (campaign) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a new campaign with a mock ID
      const newCampaign: Campaign = {
        ...campaign,
        id: `new-${Date.now()}`,
        adGroups: [],
      };

      set((state) => ({
        campaigns: [...state.campaigns, newCampaign],
        isLoading: false,
      }));

      return newCampaign;
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "キャンペーンの作成に失敗しました",
        isLoading: false,
      });
      throw error;
    }
  },

  updateCampaign: async (id: string, data: Partial<Campaign>) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set((state) => ({
        campaigns: state.campaigns.map((c) =>
          c.id === id ? { ...c, ...data } : c
        ),
        selectedCampaign:
          state.selectedCampaign?.id === id
            ? { ...state.selectedCampaign, ...data }
            : state.selectedCampaign,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "キャンペーンの更新に失敗しました",
        isLoading: false,
      });
    }
  },

  deleteCampaign: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set((state) => ({
        campaigns: state.campaigns.filter((c) => c.id !== id),
        selectedCampaign:
          state.selectedCampaign?.id === id ? null : state.selectedCampaign,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "キャンペーンの削除に失敗しました",
        isLoading: false,
      });
    }
  },

  selectCampaign: (campaign) => {
    set({ selectedCampaign: campaign });
  },

  clearError: () => {
    set({ error: null });
  },
}));
