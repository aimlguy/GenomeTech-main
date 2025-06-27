import React, { useState } from 'react';
import { Search, FileText, Zap, AlertCircle } from 'lucide-react';

interface SearchInterfaceProps {
  onSearch: (sequence: string, pattern: string) => void;
  isSearching: boolean;
}

export const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearch, isSearching }) => {
  const [sequence, setSequence] = useState('ACGTACGTTAGCTAGCGATCGATCGACGTACGTACGT');
  const [pattern, setPattern] = useState('ACGT');
  const [error, setError] = useState('');

  const sampleSequences = [
    {
      name: 'Short DNA Sample',
      sequence: 'ACGTACGTTAGCTAGCGATCGATCGACGTACGTACGT',
      description: 'Quick test sequence with repeating patterns'
    },
    {
      name: 'Gene Fragment',
      sequence: 'ATGCGATCGTAGCTAGCGATCGATCGTAGCTAGCGATCGATCGTAGCTAGCGATCGATCGTAGCTAGCGATCGATCGTAGC',
      description: 'Longer sequence simulating a gene fragment'
    },
    {
      name: 'Complex Pattern',
      sequence: 'AAATTTCCCGGGAAATTTCCCGGGTATATATGCGCGCAAATTTCCCGGGTATATATGCGCGC',
      description: 'Complex repeating patterns for advanced testing'
    }
  ];

  const validateInput = () => {
    if (!sequence.trim()) {
      setError('Please enter a DNA sequence');
      return false;
    }
    if (!pattern.trim()) {
      setError('Please enter a search pattern');
      return false;
    }
    if (!/^[ACGT]+$/i.test(sequence.trim())) {
      setError('DNA sequence must contain only A, C, G, T characters');
      return false;
    }
    if (!/^[ACGT]+$/i.test(pattern.trim())) {
      setError('Search pattern must contain only A, C, G, T characters');
      return false;
    }
    if (pattern.length > sequence.length) {
      setError('Pattern cannot be longer than the sequence');
      return false;
    }
    setError('');
    return true;
  };

  const handleSearch = () => {
    if (validateInput()) {
      onSearch(sequence.toUpperCase(), pattern.toUpperCase());
    }
  };

  const loadSample = (sampleSequence: string) => {
    setSequence(sampleSequence);
    setError('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Search Configuration</h2>
      </div>

      <div className="space-y-6">
        {/* Sample Data */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Sample Sequences</h3>
          <div className="grid gap-3">
            {sampleSequences.map((sample, idx) => (
              <div key={idx} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{sample.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{sample.description}</p>
                    <code className="text-xs text-gray-500 mt-2 block font-mono bg-gray-100 p-1 rounded">
                      {sample.sequence.length > 60 ? `${sample.sequence.slice(0, 60)}...` : sample.sequence}
                    </code>
                  </div>
                  <button
                    onClick={() => loadSample(sample.sequence)}
                    className="ml-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
                  >
                    Load
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DNA Sequence Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            DNA Sequence (A, C, G, T only)
          </label>
          <textarea
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"
            rows={4}
            placeholder="Enter DNA sequence..."
          />
          <p className="text-sm text-gray-500 mt-1">Length: {sequence.length} nucleotides</p>
        </div>

        {/* Pattern Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Pattern
          </label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
            placeholder="Enter pattern to search (e.g., ACGT)"
          />
          <p className="text-sm text-gray-500 mt-1">Pattern length: {pattern.length}</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSearching ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Searching...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Run Pattern Search</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Zap className="w-4 h-4" />
          <span>Both algorithms will run simultaneously for comparison</span>
        </div>
      </div>
    </div>
  );
};