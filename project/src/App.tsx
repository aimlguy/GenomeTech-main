import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchInterface } from './components/SearchInterface';
import { AlgorithmCard } from './components/AlgorithmCard';
import { PerformanceChart } from './components/PerformanceChart';
import { ComplexityAnalysis } from './components/ComplexityAnalysis';
import { SequenceVisualizer } from './components/SequenceVisualizer';
import { PerformanceProfiler } from './components/PerformanceProfiler';
import { DNAHelix3D } from './components/DNAHelix3D';
import { SearchHistory } from './components/SearchHistory';
import { ColorSchemeSelector } from './components/ColorSchemeSelector';
import { SuffixArray } from './algorithms/SuffixArray';
import { FMIndex } from './algorithms/FMIndex';
import { SearchResult, SearchHistoryItem, ColorScheme, PerformanceMetrics } from './types';
import { colorSchemes, getColorScheme } from './utils/colorSchemes';
import { performanceMonitor } from './utils/performance';

function App() {
  const [suffixResult, setSuffixResult] = useState<SearchResult | null>(null);
  const [fmResult, setFmResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentSequence, setCurrentSequence] = useState('');
  const [currentPattern, setCurrentPattern] = useState('');
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [currentColorScheme, setCurrentColorScheme] = useState<ColorScheme>(colorSchemes[0]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics[]>([]);

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('genomeSearchHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        const historyWithDates = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setSearchHistory(historyWithDates);
      } catch (error) {
        console.error('Failed to load search history:', error);
      }
    }

    const savedColorScheme = localStorage.getItem('genomeColorScheme');
    if (savedColorScheme) {
      const scheme = getColorScheme(savedColorScheme);
      setCurrentColorScheme(scheme);
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('genomeSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Save color scheme to localStorage
  useEffect(() => {
    localStorage.setItem('genomeColorScheme', currentColorScheme.id);
  }, [currentColorScheme]);

  const handleSearch = async (sequence: string, pattern: string) => {
    setIsSearching(true);
    setSuffixResult(null);
    setFmResult(null);
    setCurrentSequence(sequence);
    setCurrentPattern(pattern);
    setPerformanceMetrics([]);

    try {
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 100));

      // Run Suffix Array search
      const suffixArray = new SuffixArray(sequence);
      const suffixResult = suffixArray.search(pattern);
      setSuffixResult(suffixResult);

      // Run FM-Index search
      const fmIndex = new FMIndex(sequence);
      const fmResult = fmIndex.search(pattern);
      setFmResult(fmResult);

      // Add to search history
      const historyItem: SearchHistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date(),
        sequence,
        pattern,
        suffixResult,
        fmResult,
        sequenceName: `Search ${searchHistory.length + 1}`
      };

      setSearchHistory(prev => [...prev, historyItem]);

      // Collect performance metrics
      const metrics = performanceMonitor.getMetrics();
      setPerformanceMetrics(metrics);

    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleReplaySearch = (item: SearchHistoryItem) => {
    setCurrentSequence(item.sequence);
    setCurrentPattern(item.pattern);
    setSuffixResult(item.suffixResult);
    setFmResult(item.fmResult);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('genomeSearchHistory');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentColorScheme.background }}>
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Color Scheme Selector */}
        <ColorSchemeSelector
          currentScheme={currentColorScheme}
          onSchemeChange={setCurrentColorScheme}
        />

        {/* Search Interface */}
        <SearchInterface onSearch={handleSearch} isSearching={isSearching} />

        {/* Algorithm Results */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AlgorithmCard
            title="Suffix Array"
            algorithm="suffix"
            result={suffixResult}
            isLoading={isSearching}
            complexity={{
              time: "O(m log n)",
              space: "O(n)"
            }}
          />
          
          <AlgorithmCard
            title="FM-Index"
            algorithm="fm"
            result={fmResult}
            isLoading={isSearching}
            complexity={{
              time: "O(m)",
              space: "O(n)"
            }}
          />
        </div>

        {/* Performance Profiler */}
        <PerformanceProfiler 
          metrics={performanceMetrics} 
          isActive={isSearching}
        />

        {/* Performance Comparison */}
        <PerformanceChart suffixResult={suffixResult} fmResult={fmResult} />

        {/* 3D DNA Helix Visualization */}
        {suffixResult && suffixResult.positions.length > 0 && (
          <DNAHelix3D
            sequence={currentSequence}
            pattern={currentPattern}
            matchPositions={suffixResult.positions}
            colorScheme={currentColorScheme}
          />
        )}

        {/* Sequence Visualization */}
        {suffixResult && suffixResult.positions.length > 0 && (
          <SequenceVisualizer
            sequence={currentSequence}
            pattern={currentPattern}
            positions={suffixResult.positions}
          />
        )}

        {/* Search History */}
        <SearchHistory
          history={searchHistory}
          onReplay={handleReplaySearch}
          onClear={handleClearHistory}
        />

        {/* Complexity Analysis */}
        <ComplexityAnalysis />
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">
            Advanced pattern recognition algorithms for genomic sequence analysis
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Comparing Suffix Array and FM-Index performance with real-time profiling and 3D visualization
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;