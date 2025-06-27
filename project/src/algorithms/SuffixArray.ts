import { SearchResult } from '../types';
import { performanceMonitor } from '../utils/performance';

export class SuffixArray {
  private text: string;
  private n: number;
  private suffixArray: number[];

  constructor(text: string) {
    this.text = text;
    this.n = text.length;
    this.suffixArray = this.buildSuffixArray();
  }

  private buildSuffixArray(): number[] {
    // O(n log n) sort of suffixes
    return Array.from({ length: this.n }, (_, i) => i)
      .sort((a, b) => this.text.slice(a).localeCompare(this.text.slice(b)));
  }

  public search(pattern: string): SearchResult {
    performanceMonitor.startMonitoring('suffix');
    
    const m = pattern.length;
    const t0 = performance.now();
    let iters = 0;
    let charComp = 0;

    // Find leftmost match
    let lo = 0;
    let hi = this.n;
    
    while (lo < hi) {
      iters++;
      const mid = Math.floor((lo + hi) / 2);
      const start = this.suffixArray[mid];
      const compLen = Math.min(m, this.n - start);
      charComp += compLen;
      
      if (this.text.slice(start, start + m) >= pattern) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }

    // No match?
    if (lo === this.n || this.text.slice(this.suffixArray[lo], this.suffixArray[lo] + m) !== pattern) {
      const dt = performance.now() - t0;
      const metrics = performanceMonitor.stopMonitoring();
      return {
        positions: [],
        time_ms: Math.round(dt * 1000) / 1000,
        iters,
        char_comp: charComp,
        memory_usage: metrics.length > 0 ? metrics[metrics.length - 1].memoryUsage : 0,
        cpu_usage: metrics.length > 0 ? metrics[metrics.length - 1].cpuUsage : 0
      };
    }

    const left = lo;

    // Find rightmost (exclusive)
    hi = this.n;
    while (lo < hi) {
      iters++;
      const mid = Math.floor((lo + hi) / 2);
      const start = this.suffixArray[mid];
      const compLen = Math.min(m, this.n - start);
      charComp += compLen;
      
      if (this.text.slice(start, start + m) > pattern) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }

    const right = hi;
    const dt = performance.now() - t0;
    const metrics = performanceMonitor.stopMonitoring();
    
    return {
      positions: this.suffixArray.slice(left, right).sort((a, b) => a - b),
      time_ms: Math.round(dt * 1000) / 1000,
      iters,
      char_comp: charComp,
      memory_usage: metrics.length > 0 ? metrics[metrics.length - 1].memoryUsage : 0,
      cpu_usage: metrics.length > 0 ? metrics[metrics.length - 1].cpuUsage : 0
    };
  }
}