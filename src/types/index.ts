export interface Url {
  id: number;
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  expiresAt: string;
  accessCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UrlResponse {
  data: Url[];
  meta: {
    totalItems: number;
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    pageSize: number;
    totalPages: number;
  };
}

export interface ShortenUrlRequest {
  originalUrl: string;
}

export interface ShortenUrlResponse {
  id: number;
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  expiresAt: string;
}

export interface DailyStat {
  date: string;
  accessCount: number;
}

export interface TopUrl {
  url: Url;
  totalAccesses: number;
}

export interface Stats {
  dailyStats: DailyStat[];
  topUrls: TopUrl[];
}

export interface PeakAccess {
  date: string;
  accessCount: number;
}

export type TabType = 'shorten' | 'list' | 'reports';
