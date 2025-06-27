import React from 'react';
import { TrendingUp, Database, Clock, FileText } from 'lucide-react';

export const ComplexityAnalysis: React.FC = () => {
  const complexityData = [
    {
      algorithm: 'Suffix Array',
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      timeConstruction: 'O(n² log n)',
      spaceComplexity: 'O(n)',
      searchTime: 'O(m log n)',
      description: 'Simple but effective for multiple searches on the same text',
      color: 'blue'
    },
    {
      algorithm: 'FM-Index',
      icon: <Database className="w-6 h-6 text-purple-500" />,
      timeConstruction: 'O(n)',
      spaceComplexity: 'O(n)',
      searchTime: 'O(m)',
      description: 'Memory efficient with compressed representation',
      color: 'purple'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Time Complexity Analysis</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {complexityData.map((algo, idx) => (
          <div key={idx} className={`p-6 rounded-lg border-2 border-${algo.color}-200 bg-${algo.color}-50`}>
            <div className="flex items-center space-x-3 mb-4">
              {algo.icon}
              <h3 className={`text-xl font-bold text-${algo.color}-800`}>{algo.algorithm}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Construction:</span>
                <code className={`px-2 py-1 bg-${algo.color}-100 text-${algo.color}-800 rounded font-mono text-sm`}>
                  {algo.timeConstruction}
                </code>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Search Time:</span>
                <code className={`px-2 py-1 bg-${algo.color}-100 text-${algo.color}-800 rounded font-mono text-sm`}>
                  {algo.searchTime}
                </code>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Space:</span>
                <code className={`px-2 py-1 bg-${algo.color}-100 text-${algo.color}-800 rounded font-mono text-sm`}>
                  {algo.spaceComplexity}
                </code>
              </div>

              <p className={`text-sm text-${algo.color}-700 mt-3 p-3 bg-${algo.color}-100 rounded`}>
                {algo.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Key Variables</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700">n:</span>
            <span className="text-gray-600">Length of the text/sequence</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700">m:</span>
            <span className="text-gray-600">Length of the search pattern</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700">σ:</span>
            <span className="text-gray-600">Alphabet size (4 for DNA)</span>
          </div>
        </div>
      </div>
    </div>
  );
};