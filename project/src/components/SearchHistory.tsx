import React from 'react';
import { History, Play, Download, Trash2, Clock } from 'lucide-react';
import { SearchHistoryItem } from '../types';
import { exportToCSV, exportToJSON, generateReport, downloadFile } from '../utils/exportUtils';

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onReplay: (item: SearchHistoryItem) => void;
  onClear: () => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ 
  history, 
  onReplay, 
  onClear 
}) => {
  const handleExport = (format: 'csv' | 'json' | 'report') => {
    if (history.length === 0) return;
    
    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'csv':
        downloadFile(
          exportToCSV(history),
          `genome-search-results-${timestamp}.csv`,
          'text/csv'
        );
        break;
      case 'json':
        downloadFile(
          exportToJSON(history),
          `genome-search-results-${timestamp}.json`,
          'application/json'
        );
        break;
      case 'report':
        downloadFile(
          generateReport(history),
          `genome-analysis-report-${timestamp}.md`,
          'text/markdown'
        );
        break;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <History className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">Search History</h2>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-sm">
            {history.length} searches
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleExport('csv')}
              disabled={history.length === 0}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              CSV
            </button>
            <button
              onClick={() => handleExport('json')}
              disabled={history.length === 0}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              JSON
            </button>
            <button
              onClick={() => handleExport('report')}
              disabled={history.length === 0}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Report
            </button>
          </div>
          
          <button
            onClick={onClear}
            disabled={history.length === 0}
            className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <History className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p>No search history yet</p>
          <p className="text-sm">Run some searches to see them here</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.slice().reverse().map((item) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {item.timestamp.toLocaleString()}
                    </span>
                    {item.sequenceName && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {item.sequenceName}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Pattern:</strong> <code className="bg-gray-100 px-1 rounded">{item.pattern}</code></p>
                      <p><strong>Sequence Length:</strong> {item.sequence.length}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-blue-50 rounded">
                        <p className="font-medium text-blue-800">Suffix Array</p>
                        <p>{item.suffixResult.time_ms}ms</p>
                        <p>{item.suffixResult.positions.length} matches</p>
                      </div>
                      <div className="p-2 bg-purple-50 rounded">
                        <p className="font-medium text-purple-800">FM-Index</p>
                        <p>{item.fmResult.time_ms}ms</p>
                        <p>{item.fmResult.positions.length} matches</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => onReplay(item)}
                  className="ml-4 px-3 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors flex items-center space-x-1"
                >
                  <Play className="w-4 h-4" />
                  <span>Replay</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};