import { PerformanceMetrics } from '../types';

export class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private isMonitoring = false;
  private intervalId: number | null = null;

  startMonitoring(algorithm: 'suffix' | 'fm') {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.metrics = [];
    
    this.intervalId = window.setInterval(() => {
      const metric: PerformanceMetrics = {
        timestamp: Date.now(),
        memoryUsage: this.getMemoryUsage(),
        cpuUsage: this.getCPUUsage(),
        algorithm
      };
      this.metrics.push(metric);
      
      // Keep only last 100 measurements
      if (this.metrics.length > 100) {
        this.metrics.shift();
      }
    }, 50); // Sample every 50ms
  }

  stopMonitoring(): PerformanceMetrics[] {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isMonitoring = false;
    return [...this.metrics];
  }

  private getMemoryUsage(): number {
    // Simulate memory usage (in real app, use performance.memory if available)
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
    }
    // Fallback simulation
    return Math.random() * 50 + 10;
  }

  private getCPUUsage(): number {
    // Simulate CPU usage (in real app, would need Web Workers or server-side monitoring)
    const start = performance.now();
    let iterations = 0;
    while (performance.now() - start < 1) {
      iterations++;
    }
    return Math.min(iterations / 10000 * 100, 100);
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }
}

export const performanceMonitor = new PerformanceMonitor();