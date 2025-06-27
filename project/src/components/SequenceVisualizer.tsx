import React from 'react';
import { MapPin, Eye } from 'lucide-react';

interface SequenceVisualizerProps {
  sequence: string;
  pattern: string;
  positions: number[];
}

export const SequenceVisualizer: React.FC<SequenceVisualizerProps> = ({ 
  sequence, 
  pattern, 
  positions 
}) => {
  const renderSequence = () => {
    if (!sequence || !pattern || positions.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Eye className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p>No matches to visualize</p>
        </div>
      );
    }

    const result = [];
    let currentIndex = 0;

    // Sort positions to process them in order
    const sortedPositions = [...positions].sort((a, b) => a - b);
    
    for (const position of sortedPositions) {
      // Add non-matching sequence before this match
      if (currentIndex < position) {
        result.push(
          <span key={`normal-${currentIndex}`} className="text-gray-600 font-mono text-sm">
            {sequence.slice(currentIndex, position)}
          </span>
        );
      }

      // Add the highlighted match
      result.push(
        <span
          key={`match-${position}`}
          className="bg-yellow-200 text-yellow-800 font-mono text-sm font-bold px-1 rounded relative"
          title={`Match at position ${position}`}
        >
          {sequence.slice(position, position + pattern.length)}
          <span className="absolute -top-6 left-0 text-xs text-blue-600 font-normal">
            {position}
          </span>
        </span>
      );

      currentIndex = position + pattern.length;
    }

    // Add remaining sequence after last match
    if (currentIndex < sequence.length) {
      result.push(
        <span key={`normal-${currentIndex}`} className="text-gray-600 font-mono text-sm">
          {sequence.slice(currentIndex)}
        </span>
      );
    }

    return result;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-6">
        <MapPin className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Sequence Visualization</h2>
      </div>

      {positions.length > 0 && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>{positions.length}</strong> matches found for pattern "<strong>{pattern}</strong>"
          </p>
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
        <div className="whitespace-nowrap pb-6 relative">
          {renderSequence()}
        </div>
      </div>

      {positions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Match Positions:</h3>
          <div className="flex flex-wrap gap-2">
            {positions.slice(0, 15).map((pos, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-mono"
              >
                {pos}
              </span>
            ))}
            {positions.length > 15 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">
                +{positions.length - 15} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-1">Legend:</h4>
        <div className="flex flex-wrap gap-4 text-xs text-blue-700">
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-yellow-200 rounded"></span>
            <span>Pattern matches</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-gray-200 rounded"></span>
            <span>Regular sequence</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-blue-600 font-mono">123</span>
            <span>Position numbers</span>
          </div>
        </div>
      </div>
    </div>
  );
};