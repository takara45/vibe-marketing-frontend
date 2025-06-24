import { create } from "zustand";
import { DateRange } from "react-day-picker";

export interface PerformanceData {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  ctr: number;
  cpc: number;
  conversionRate: number;
}

export interface DeviceData {
  device: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
}

export interface LocationData {
  location: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  dateRange: DateRange;
  metrics: string[];
  dimensions: string[];
  filters: ReportFilter[];
  chartType: "bar" | "line" | "pie" | "table";
  createdAt: string;
  updatedAt: string;
}

export interface ReportFilter {
  id: string;
  dimension: string;
  operator: string;
  value: string;
}

export interface CPCAnalytics {
  overall: {
    average_cpc: number;
    cpc_trend: Array<{date: string, cpc: number}>;
  };
  by_device: Array<{device: string, cpc: number, share: number}>;
  by_location: Array<{location: string, cpc: number, volume: number}>;
  by_hour: Array<{hour: number, cpc: number, competition: 'low' | 'medium' | 'high'}>;
}

interface AnalyticsState {
  // Data
  performanceData: PerformanceData[];
  deviceData: DeviceData[];
  locationData: LocationData[];
  reports: Report[];
  selectedReport: Report | null;
  cpcAnalytics: CPCAnalytics | null;

  // Filters
  dateRange: DateRange;
  campaignIds: string[];

  // UI state
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchPerformanceData: (params?: {
    dateRange?: DateRange;
    campaignIds?: string[];
  }) => Promise<void>;
  fetchDeviceData: (params?: {
    dateRange?: DateRange;
    campaignIds?: string[];
  }) => Promise<void>;
  fetchLocationData: (params?: {
    dateRange?: DateRange;
    campaignIds?: string[];
  }) => Promise<void>;
  fetchCPCAnalytics: (params?: {
    dateRange?: DateRange;
    campaignIds?: string[];
  }) => Promise<void>;
  fetchReports: () => Promise<void>;
  fetchReport: (id: string) => Promise<void>;
  createReport: (
    report: Omit<Report, "id" | "createdAt" | "updatedAt">
  ) => Promise<Report>;
  updateReport: (id: string, data: Partial<Report>) => Promise<void>;
  deleteReport: (id: string) => Promise<void>;
  setDateRange: (dateRange: DateRange) => void;
  setCampaignIds: (campaignIds: string[]) => void;
  selectReport: (report: Report | null) => void;
  clearError: () => void;
}

// Mock data
const generateMockPerformanceData = (days: number): PerformanceData[] => {
  const data: PerformanceData[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const impressions = Math.floor(Math.random() * 5000) + 10000;
    const clicks = Math.floor(Math.random() * 500) + 300;
    const conversions = Math.floor(Math.random() * 30) + 10;
    const cost = Math.floor(Math.random() * 50000) + 30000;

    data.push({
      date: date.toISOString().split("T")[0],
      impressions,
      clicks,
      conversions,
      cost,
      ctr: parseFloat(((clicks / impressions) * 100).toFixed(2)),
      cpc: parseFloat((cost / clicks).toFixed(2)),
      conversionRate: parseFloat(((conversions / clicks) * 100).toFixed(2)),
    });
  }

  return data;
};

const mockDeviceData: DeviceData[] = [
  {
    device: "desktop",
    impressions: 65000,
    clicks: 2100,
    conversions: 105,
    cost: 180000,
  },
  {
    device: "mobile",
    impressions: 85000,
    clicks: 2800,
    conversions: 98,
    cost: 210000,
  },
  {
    device: "tablet",
    impressions: 15000,
    clicks: 450,
    conversions: 22,
    cost: 40000,
  },
];

const mockLocationData: LocationData[] = [
  {
    location: "東京",
    impressions: 75000,
    clicks: 2500,
    conversions: 120,
    cost: 190000,
  },
  {
    location: "大阪",
    impressions: 45000,
    clicks: 1500,
    conversions: 65,
    cost: 120000,
  },
  {
    location: "名古屋",
    impressions: 25000,
    clicks: 800,
    conversions: 35,
    cost: 70000,
  },
  {
    location: "福岡",
    impressions: 15000,
    clicks: 450,
    conversions: 18,
    cost: 40000,
  },
  {
    location: "その他",
    impressions: 30000,
    clicks: 900,
    conversions: 32,
    cost: 80000,
  },
];

const generateMockCPCTrend = (days: number): Array<{date: string, cpc: number}> => {
  const data: Array<{date: string, cpc: number}> = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const cpc = Math.floor(Math.random() * 50) + 70; // 70-120円の範囲
    
    data.push({
      date: date.toISOString().split("T")[0],
      cpc,
    });
  }
  
  return data;
};

const mockCPCAnalytics: CPCAnalytics = {
  overall: {
    average_cpc: 89.5,
    cpc_trend: generateMockCPCTrend(30),
  },
  by_device: [
    { device: "mobile", cpc: 95.2, share: 58 },
    { device: "desktop", cpc: 86.7, share: 35 },
    { device: "tablet", cpc: 92.1, share: 7 },
  ],
  by_location: [
    { location: "東京", cpc: 102.3, volume: 45000 },
    { location: "大阪", cpc: 87.9, volume: 28000 },
    { location: "名古屋", cpc: 79.5, volume: 18000 },
    { location: "福岡", cpc: 71.2, volume: 12000 },
    { location: "その他", cpc: 85.8, volume: 22000 },
  ],
  by_hour: [
    { hour: 0, cpc: 65.2, competition: 'low' },
    { hour: 1, cpc: 62.8, competition: 'low' },
    { hour: 2, cpc: 58.5, competition: 'low' },
    { hour: 3, cpc: 55.1, competition: 'low' },
    { hour: 4, cpc: 59.8, competition: 'low' },
    { hour: 5, cpc: 68.5, competition: 'low' },
    { hour: 6, cpc: 78.2, competition: 'medium' },
    { hour: 7, cpc: 89.5, competition: 'medium' },
    { hour: 8, cpc: 95.8, competition: 'medium' },
    { hour: 9, cpc: 102.3, competition: 'high' },
    { hour: 10, cpc: 108.7, competition: 'high' },
    { hour: 11, cpc: 112.5, competition: 'high' },
    { hour: 12, cpc: 115.2, competition: 'high' },
    { hour: 13, cpc: 118.9, competition: 'high' },
    { hour: 14, cpc: 121.5, competition: 'high' },
    { hour: 15, cpc: 118.2, competition: 'high' },
    { hour: 16, cpc: 115.8, competition: 'high' },
    { hour: 17, cpc: 112.3, competition: 'high' },
    { hour: 18, cpc: 108.5, competition: 'high' },
    { hour: 19, cpc: 105.2, competition: 'high' },
    { hour: 20, cpc: 98.7, competition: 'medium' },
    { hour: 21, cpc: 92.5, competition: 'medium' },
    { hour: 22, cpc: 85.8, competition: 'medium' },
    { hour: 23, cpc: 75.2, competition: 'low' },
  ],
};

const mockReports: Report[] = [
  {
    id: "1",
    name: "キャンペーン別パフォーマンス",
    description: "キャンペーン別のパフォーマンス指標",
    dateRange: {
      from: new Date("2024-03-01"),
      to: new Date("2024-03-31"),
    },
    metrics: ["impressions", "clicks", "conversions", "cost"],
    dimensions: ["campaign", "date"],
    filters: [],
    chartType: "bar",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-21T15:30:00Z",
  },
  {
    id: "2",
    name: "デバイス別コンバージョン",
    description: "デバイス別のコンバージョン指標",
    dateRange: {
      from: new Date("2024-03-01"),
      to: new Date("2024-03-31"),
    },
    metrics: ["conversions", "conversionRate", "cpa"],
    dimensions: ["device", "date"],
    filters: [],
    chartType: "pie",
    createdAt: "2024-03-10T09:15:00Z",
    updatedAt: "2024-03-20T14:20:00Z",
  },
  {
    id: "3",
    name: "地域別ROI分析",
    description: "地域別のROI指標",
    dateRange: {
      from: new Date("2024-03-01"),
      to: new Date("2024-03-31"),
    },
    metrics: ["cost", "conversions", "revenue", "roi"],
    dimensions: ["location"],
    filters: [
      {
        id: "filter-1",
        dimension: "cost",
        operator: "greaterThan",
        value: "10000",
      },
    ],
    chartType: "bar",
    createdAt: "2024-03-05T11:30:00Z",
    updatedAt: "2024-03-19T16:45:00Z",
  },
];

export const useAnalyticsStore = create<AnalyticsState>()((set, get) => ({
  performanceData: [],
  deviceData: [],
  locationData: [],
  reports: [],
  selectedReport: null,
  cpcAnalytics: null,

  dateRange: {
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  },
  campaignIds: [],

  isLoading: false,
  error: null,

  fetchPerformanceData: async (params) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const dateRange = params?.dateRange || get().dateRange;
      const days =
        dateRange.to && dateRange.from
          ? Math.ceil(
              (dateRange.to.getTime() - dateRange.from.getTime()) /
                (1000 * 60 * 60 * 24)
            ) + 1
          : 30;

      set({
        performanceData: generateMockPerformanceData(days),
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "パフォーマンスデータの取得に失敗しました",
        isLoading: false,
      });
    }
  },

  fetchDeviceData: async (params) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 800));

      set({ deviceData: mockDeviceData, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "デバイスデータの取得に失敗しました",
        isLoading: false,
      });
    }
  },

  fetchLocationData: async (params) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 800));

      set({ locationData: mockLocationData, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "地域データの取得に失敗しました",
        isLoading: false,
      });
    }
  },

  fetchCPCAnalytics: async (params) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 800));

      const dateRange = params?.dateRange || get().dateRange;
      const days =
        dateRange.to && dateRange.from
          ? Math.ceil(
              (dateRange.to.getTime() - dateRange.from.getTime()) /
                (1000 * 60 * 60 * 24)
            ) + 1
          : 30;

      set({
        cpcAnalytics: {
          ...mockCPCAnalytics,
          overall: {
            ...mockCPCAnalytics.overall,
            cpc_trend: generateMockCPCTrend(days),
          },
        },
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "CPCデータの取得に失敗しました",
        isLoading: false,
      });
    }
  },

  fetchReports: async () => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 800));

      set({ reports: mockReports, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "レポートの取得に失敗しました",
        isLoading: false,
      });
    }
  },

  fetchReport: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 500));

      const report = mockReports.find((r) => r.id === id) || null;
      set({ selectedReport: report, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "レポートの取得に失敗しました",
        isLoading: false,
      });
    }
  },

  createReport: async (report) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const now = new Date().toISOString();
      const newReport: Report = {
        ...report,
        id: `new-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
      };

      set((state) => ({
        reports: [...state.reports, newReport],
        isLoading: false,
      }));

      return newReport;
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "レポートの作成に失敗しました",
        isLoading: false,
      });
      throw error;
    }
  },

  updateReport: async (id: string, data: Partial<Report>) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const now = new Date().toISOString();

      set((state) => ({
        reports: state.reports.map((r) =>
          r.id === id ? { ...r, ...data, updatedAt: now } : r
        ),
        selectedReport:
          state.selectedReport?.id === id
            ? { ...state.selectedReport, ...data, updatedAt: now }
            : state.selectedReport,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "レポートの更新に失敗しました",
        isLoading: false,
      });
    }
  },

  deleteReport: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be an actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set((state) => ({
        reports: state.reports.filter((r) => r.id !== id),
        selectedReport:
          state.selectedReport?.id === id ? null : state.selectedReport,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "レポートの削除に失敗しました",
        isLoading: false,
      });
    }
  },

  setDateRange: (dateRange) => {
    set({ dateRange });
  },

  setCampaignIds: (campaignIds) => {
    set({ campaignIds });
  },

  selectReport: (report) => {
    set({ selectedReport: report });
  },

  clearError: () => {
    set({ error: null });
  },
}));
