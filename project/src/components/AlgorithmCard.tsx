import React from 'react';
import { Clock, Hash, Activity, MapPin, Search } from 'lucide-react';

interface AlgorithmResult {
  positions: number[];
  time_ms: number;
  iters: number;
  char_comp: number;
}

interface AlgorithmCardProps {
  title: string;
  algorithm: 'suffix' | 'fm';
  result: AlgorithmResult | null;
  isLoading: boolean;
  complexity: {
    time: string;
    space: string;
  };
}

export const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ 
  title, 
  algorithm, 
  result, 
  isLoading, 
  complexity 
}) => {
  const cardColors = {
    suffix: 'from-blue-500 to-cyan-500',
    fm: 'from-purple-500 to-pink-500'
  };

  const bgColors = {
    suffix: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    fm: 'bg-gradient-to-br from-purple-50 to-pink-50'
  };

  return (
    <div className={`${bgColors[algorithm]} rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}>
      <div className={`bg-gradient-to-r ${cardColors[algorithm]} p-4`}>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-white/20 rounded-md text-xs text-white">
            Time: {complexity.time}
          </span>
          <span className="px-2 py-1 bg-white/20 rounded-md text-xs text-white">
            Space: {complexity.space}
          </span>
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Processing...</span>
            </div>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Execution Time</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{result.time_ms}ms</p>
              </div>
              
              <div className="bg-white p-3 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Iterations</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{result.iters}</p>
              </div>
              
              <div className="bg-white p-3 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Hash className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-700">Char Comparisons</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{result.char_comp}</p>
              </div>
              
              <div className="bg-white p-3 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-gray-700">Matches Found</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{result.positions.length}</p>
              </div>
            </div>

            {result.positions.length > 0 && (
              <div className="bg-white p-3 rounded-lg border">
                <h4 className="font-medium text-gray-700 mb-2">Match Positions:</h4>
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                  {result.positions.slice(0, 20).map((pos, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">
                      {pos}
                    </span>
                  ))}
                  {result.positions.length > 20 && (
                    <span className="px-2 py-1 bg-gray-200 rounded text-sm text-gray-500">
                      +{result.positions.length - 20} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p>Run a search to see results</p>
          </div>
        )}
      </div>
    </div>
  );
};