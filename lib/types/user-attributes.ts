/**
 * ユーザー属性分析用の型定義
 */

// 年齢層
export type AgeGroup = 
  | '18-24'
  | '25-34'
  | '35-44'
  | '45-54'
  | '55-64'
  | '65+'

// 性別
export type Gender = 'male' | 'female' | 'unknown'

// デバイス
export type Device = 'desktop' | 'mobile' | 'tablet'

// 地域
export type Region = 
  | 'tokyo'
  | 'osaka'
  | 'nagoya'
  | 'kyushu'
  | 'hokkaido'
  | 'tohoku'
  | 'other'

// ユーザー属性データ
export interface UserAttribute {
  ageGroup: AgeGroup
  gender: Gender
  device: Device
  region: Region
}

// 属性別パフォーマンスデータ
export interface AttributePerformance {
  attribute: string
  attributeType: 'age' | 'gender' | 'device' | 'region'
  impressions: number
  clicks: number
  conversions: number
  cost: number
  ctr: number
  conversionRate: number
  cpc: number
  cpa: number
  roas: number
}

// 年齢層パフォーマンス
export interface AgeGroupPerformance extends AttributePerformance {
  attributeType: 'age'
  attribute: AgeGroup
}

// 性別パフォーマンス
export interface GenderPerformance extends AttributePerformance {
  attributeType: 'gender'
  attribute: Gender
}

// デバイス別パフォーマンス
export interface DevicePerformance extends AttributePerformance {
  attributeType: 'device'
  attribute: Device
}

// 地域別パフォーマンス
export interface RegionPerformance extends AttributePerformance {
  attributeType: 'region'
  attribute: Region
}

// クロス分析データ
export interface CrossAnalysisData {
  ageGroup: AgeGroup
  gender: Gender
  device: Device
  region: Region
  impressions: number
  clicks: number
  conversions: number
  cost: number
  ctr: number
  conversionRate: number
  cpc: number
  cpa: number
  roas: number
}

// 属性サマリー
export interface AttributeSummary {
  mostEffectiveAgeGroup: {
    ageGroup: AgeGroup
    conversionRate: number
  }
  mostEffectiveGender: {
    gender: Gender
    conversionRate: number
  }
  attributeCoverage: {
    ageGroups: number
    genders: number
    devices: number
    regions: number
  }
  totalReach: number
}

// 分析フィルター
export interface AnalysisFilter {
  dateRange: {
    start: Date
    end: Date
  }
  ageGroups?: AgeGroup[]
  genders?: Gender[]
  devices?: Device[]
  regions?: Region[]
}

// 表示用ラベル
export const AttributeLabels = {
  ageGroup: {
    '18-24': '18-24歳',
    '25-34': '25-34歳',
    '35-44': '35-44歳',
    '45-54': '45-54歳',
    '55-64': '55-64歳',
    '65+': '65歳以上'
  },
  gender: {
    male: '男性',
    female: '女性',
    unknown: '不明'
  },
  device: {
    desktop: 'デスクトップ',
    mobile: 'モバイル',
    tablet: 'タブレット'
  },
  region: {
    tokyo: '東京',
    osaka: '大阪',
    nagoya: '名古屋',
    kyushu: '九州',
    hokkaido: '北海道',
    tohoku: '東北',
    other: 'その他'
  }
} as const

// 属性カラーマップ
export const AttributeColors = {
  ageGroup: {
    '18-24': '#3b82f6',
    '25-34': '#06b6d4',
    '35-44': '#10b981',
    '45-54': '#f59e0b',
    '55-64': '#ef4444',
    '65+': '#8b5cf6'
  },
  gender: {
    male: '#3b82f6',
    female: '#ec4899',
    unknown: '#6b7280'
  },
  device: {
    desktop: '#3b82f6',
    mobile: '#10b981',
    tablet: '#f59e0b'
  },
  region: {
    tokyo: '#ef4444',
    osaka: '#f59e0b',
    nagoya: '#10b981',
    kyushu: '#3b82f6',
    hokkaido: '#06b6d4',
    tohoku: '#8b5cf6',
    other: '#6b7280'
  }
} as const