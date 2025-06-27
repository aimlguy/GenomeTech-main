import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AlgorithmResult {
  positions: number[];
  time_ms: number;
  iters: number;
  char_comp: number;
}

interface PerformanceChartProps {
  suffixResult: AlgorithmResult | null;
  fmResult: AlgorithmResult | null;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ suffixResult, fmResult }) => {
  if (!suffixResult || !fmResult) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Comparison</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>Run a search to see performance comparison</p>
        </div>
      </div>
    );
  }

  const data = [
    {
      metric: 'Time (ms)',
      'Suffix Array': suffixResult.time_ms,
      'FM-Index': fmResult.time_ms,
    },
    {
      metric: 'Iterations',
      'Suffix Array': suffixResult.iters,
      'FM-Index': fmResult.iters,
    },
    {
      metric: 'Char Comparisons',
      'Suffix Array': suffixResult.char_comp,
      'FM-Index': fmResult.char_comp,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Comparison</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Suffix Array" fill="#3B82F6" />
            <Bar dataKey="FM-Index" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Suffix Array Advantages</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Simple to implement and understand</li>
            <li>• Good for multiple pattern searches</li>
            <li>• Direct access to all suffixes</li>
          </ul>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">FM-Index Advantages</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Memory efficient (compressed)</li>
            <li>• Faster for long sequences</li>
            <li>• Used in modern aligners</li>
          </ul>
        </div>
      </div>
    </div>
  );
};