import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Cpu, HardDrive } from 'lucide-react';
import { PerformanceMetrics } from '../types';

interface PerformanceProfilerProps {
  metrics: PerformanceMetrics[];
  isActive: boolean;
}

export const PerformanceProfiler: React.FC<PerformanceProfilerProps> = ({ metrics, isActive }) => {
  const [displayMetrics, setDisplayMetrics] = useState<PerformanceMetrics[]>([]);

  useEffect(() => {
    if (metrics.length > 0) {
      // Normalize timestamps to start from 0
      const startTime = metrics[0].timestamp;
      const normalizedMetrics = metrics.map(metric => ({
        ...metric,
        timestamp: metric.timestamp - startTime
      }));
      setDisplayMetrics(normalizedMetrics);
    }
  }, [metrics]);

  const currentMemory = displayMetrics.length > 0 ? displayMetrics[displayMetrics.length - 1].memoryUsage : 0;
  const currentCPU = displayMetrics.length > 0 ? displayMetrics[displayMetrics.length - 1].cpuUsage : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Real-time Performance Profiling</h2>
        {isActive && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Monitoring Active</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <HardDrive className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">Memory Usage</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">
            {currentMemory.toFixed(1)} MB
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(currentMemory / 100 * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-2 mb-2">
            <Cpu className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-800">CPU Usage</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            {currentCPU.toFixed(1)}%
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${currentCPU}%` }}
            ></div>
          </div>
        </div>
      </div>

      {displayMetrics.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={displayMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}s`}
              />
              <YAxis yAxisId="memory" orientation="left" />
              <YAxis yAxisId="cpu" orientation="right" />
              <Tooltip 
                labelFormatter={(value) => `Time: ${(value / 1000).toFixed(1)}s`}
                formatter={(value: number, name: string) => [
                  name === 'Memory Usage' ? `${value.toFixed(1)} MB` : `${value.toFixed(1)}%`,
                  name
                ]}
              />
              <Legend />
              <Line 
                yAxisId="memory"
                type="monotone" 
                dataKey="memoryUsage" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Memory Usage"
                dot={false}
              />
              <Line 
                yAxisId="cpu"
                type="monotone" 
                dataKey="cpuUsage" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                name="CPU Usage"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500">
          <p>Start a search to see real-time performance metrics</p>
        </div>
      )}
    </div>
  );
};