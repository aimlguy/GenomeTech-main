export interface SearchResult {
  positions: number[];
  time_ms: number;
  iters: number;
  char_comp: number;
  memory_usage?: number;
  cpu_usage?: number;
}

export interface SearchHistoryItem {
  id: string;
  timestamp: Date;
  sequence: string;
  pattern: string;
  suffixResult: SearchResult;
  fmResult: SearchResult;
  sequenceName?: string;
}

export interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  nucleotides: {
    A: string;
    T: string;
    G: string;
    C: string;
  };
}

export interface PerformanceMetrics {
  timestamp: number;
  memoryUsage: number;
  cpuUsage: number;
  algorithm: 'suffix' | 'fm';
}