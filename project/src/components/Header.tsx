import React from 'react';
import { Dna, Search, BarChart3 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-teal-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Dna className="w-8 h-8 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                GenomeSearch
              </h1>
              <p className="text-blue-200 text-sm">Advanced Pattern Recognition in Genomic Sequences</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-cyan-300" />
              <span className="text-sm">Pattern Search</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-purple-300" />
              <span className="text-sm">Performance Analysis</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
          <p className="text-sm text-blue-100 leading-relaxed">
            Compare FM-Index and Suffix Array algorithms for efficient pattern matching in genome sequences. 
            Analyze performance metrics, time complexity, and character comparisons in real-time.
          </p>
        </div>
      </div>
    </header>
  );
};