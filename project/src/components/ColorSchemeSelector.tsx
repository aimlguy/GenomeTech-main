import React from 'react';
import { Palette, Check } from 'lucide-react';
import { ColorScheme } from '../types';
import { colorSchemes } from '../utils/colorSchemes';

interface ColorSchemeSelectorProps {
  currentScheme: ColorScheme;
  onSchemeChange: (scheme: ColorScheme) => void;
}

export const ColorSchemeSelector: React.FC<ColorSchemeSelectorProps> = ({
  currentScheme,
  onSchemeChange
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-6">
        <Palette className="w-6 h-6 text-pink-600" />
        <h2 className="text-2xl font-bold text-gray-800">Color Schemes</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {colorSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
              currentScheme.id === scheme.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSchemeChange(scheme)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-800">{scheme.name}</h3>
              {currentScheme.id === scheme.id && (
                <Check className="w-5 h-5 text-blue-600" />
              )}
            </div>

            {/* Color preview */}
            <div className="space-y-2">
              <div className="flex space-x-1">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: scheme.primary }}
                  title="Primary"
                ></div>
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: scheme.secondary }}
                  title="Secondary"
                ></div>
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: scheme.accent }}
                  title="Accent"
                ></div>
              </div>

              {/* Nucleotide colors */}
              <div className="flex space-x-1">
                {Object.entries(scheme.nucleotides).map(([nucleotide, color]) => (
                  <div
                    key={nucleotide}
                    className="w-4 h-4 rounded text-xs flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: color }}
                    title={`${nucleotide}: ${color}`}
                  >
                    {nucleotide}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Current Scheme: {currentScheme.name}</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: currentScheme.nucleotides.A }}></div>
            <span>A (Adenine)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: currentScheme.nucleotides.T }}></div>
            <span>T (Thymine)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: currentScheme.nucleotides.G }}></div>
            <span>G (Guanine)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: currentScheme.nucleotides.C }}></div>
            <span>C (Cytosine)</span>
          </div>
        </div>
      </div>
    </div>
  );
};