import { SearchResult, SearchHistoryItem } from '../types';

export const exportToCSV = (data: SearchHistoryItem[]): string => {
  const headers = [
    'Timestamp',
    'Sequence Name',
    'Pattern',
    'Sequence Length',
    'Suffix Array Time (ms)',
    'Suffix Array Iterations',
    'Suffix Array Char Comparisons',
    'Suffix Array Matches',
    'FM-Index Time (ms)',
    'FM-Index Iterations',
    'FM-Index Char Comparisons',
    'FM-Index Matches'
  ];

  const rows = data.map(item => [
    item.timestamp.toISOString(),
    item.sequenceName || 'Unnamed',
    item.pattern,
    item.sequence.length,
    item.suffixResult.time_ms,
    item.suffixResult.iters,
    item.suffixResult.char_comp,
    item.suffixResult.positions.length,
    item.fmResult.time_ms,
    item.fmResult.iters,
    item.fmResult.char_comp,
    item.fmResult.positions.length
  ]);

  return [headers, ...rows].map(row => row.join(',')).join('\n');
};

export const exportToJSON = (data: SearchHistoryItem[]): string => {
  return JSON.stringify(data, null, 2);
};

export const generateReport = (data: SearchHistoryItem[]): string => {
  const totalSearches = data.length;
  const avgSuffixTime = data.reduce((sum, item) => sum + item.suffixResult.time_ms, 0) / totalSearches;
  const avgFMTime = data.reduce((sum, item) => sum + item.fmResult.time_ms, 0) / totalSearches;
  
  return `
# Genome Pattern Recognition Analysis Report

## Summary
- Total Searches: ${totalSearches}
- Average Suffix Array Time: ${avgSuffixTime.toFixed(3)}ms
- Average FM-Index Time: ${avgFMTime.toFixed(3)}ms
- Performance Improvement: ${((avgSuffixTime - avgFMTime) / avgSuffixTime * 100).toFixed(1)}%

## Detailed Results

${data.map((item, index) => `
### Search ${index + 1}
- **Timestamp**: ${item.timestamp.toLocaleString()}
- **Pattern**: ${item.pattern}
- **Sequence Length**: ${item.sequence.length}

#### Suffix Array Results
- Time: ${item.suffixResult.time_ms}ms
- Iterations: ${item.suffixResult.iters}
- Character Comparisons: ${item.suffixResult.char_comp}
- Matches Found: ${item.suffixResult.positions.length}

#### FM-Index Results
- Time: ${item.fmResult.time_ms}ms
- Iterations: ${item.fmResult.iters}
- Character Comparisons: ${item.fmResult.char_comp}
- Matches Found: ${item.fmResult.positions.length}
`).join('\n')}
`;
};

export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};