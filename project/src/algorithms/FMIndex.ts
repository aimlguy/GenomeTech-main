import { SearchResult } from '../types';
import { performanceMonitor } from '../utils/performance';

export class FMIndex {
  private text: string;
  private bwt: string;
  private sa: number[];
  private cTable: Map<string, number>;
  private occTable: Map<string, number[]>;

  constructor(text: string) {
    this.text = text + "$";
    const { bwt, sa } = this.buildBwtSa();
    this.bwt = bwt;
    this.sa = sa;
    this.cTable = this.buildCTable();
    this.occTable = this.buildOccTable();
  }

  private buildBwtSa(): { bwt: string; sa: number[] } {
    const rotations: Array<{ rotation: string; pos: number }> = [];
    
    for (let i = 0; i < this.text.length; i++) {
      rotations.push({
        rotation: this.text.slice(i) + this.text.slice(0, i),
        pos: i
      });
    }
    
    rotations.sort((a, b) => a.rotation.localeCompare(b.rotation));
    
    const bwt = rotations.map(r => r.rotation[r.rotation.length - 1]).join('');
    const sa = rotations.map(r => r.pos);
    
    return { bwt, sa };
  }

  private buildCTable(): Map<string, number> {
    const counts = new Map<string, number>();
    
    for (const ch of this.bwt) {
      counts.set(ch, (counts.get(ch) || 0) + 1);
    }
    
    const sortedChars = Array.from(counts.keys()).sort();
    const cTable = new Map<string, number>();
    let total = 0;
    
    for (const ch of sortedChars) {
      cTable.set(ch, total);
      total += counts.get(ch)!;
    }
    
    return cTable;
  }

  private buildOccTable(): Map<string, number[]> {
    const chars = Array.from(new Set(this.bwt)).sort();
    const occ = new Map<string, number[]>();
    
    for (const ch of chars) {
      occ.set(ch, new Array(this.bwt.length + 1).fill(0));
    }
    
    for (let i = 0; i < this.bwt.length; i++) {
      const ch = this.bwt[i];
      for (const c of chars) {
        const prev = occ.get(c)![i];
        occ.get(c)![i + 1] = prev + (c === ch ? 1 : 0);
      }
    }
    
    return occ;
  }

  private occ(ch: string, pos: number): number {
    const table = this.occTable.get(ch);
    return table ? table[pos] : 0;
  }

  public search(pattern: string): SearchResult {
    performanceMonitor.startMonitoring('fm');
    
    const t0 = performance.now();
    let first = 0;
    let last = this.bwt.length - 1;
    let iters = 0;
    let charComp = 0;

    for (let i = pattern.length - 1; i >= 0; i--) {
      const ch = pattern[i];
      iters++;
      
      if (!this.cTable.has(ch)) {
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
      
      first = this.cTable.get(ch)! + this.occ(ch, first);
      last = this.cTable.get(ch)! + this.occ(ch, last + 1) - 1;
      charComp++;
      
      if (first > last) {
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
    }

    const positions = this.sa.slice(first, last + 1).sort((a, b) => a - b);
    const dt = performance.now() - t0;
    const metrics = performanceMonitor.stopMonitoring();
    
    return {
      positions,
      time_ms: Math.round(dt * 1000) / 1000,
      iters,
      char_comp: charComp,
      memory_usage: metrics.length > 0 ? metrics[metrics.length - 1].memoryUsage : 0,
      cpu_usage: metrics.length > 0 ? metrics[metrics.length - 1].cpuUsage : 0
    };
  }
}