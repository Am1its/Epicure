import { useState, useEffect } from 'react';
import type { SearchResults } from '@org/shared-types';
import { fetchSearch } from '../lib/api';

export function useSearch(query: string): SearchResults {
  const [results, setResults] = useState<SearchResults>({ restaurants: [], chefs: [] });

  useEffect(() => {
    setResults({ restaurants: [], chefs: [] });
    if (!query.trim()) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      fetchSearch(query.trim())
        .then(data => { if (!cancelled) setResults(data); })
        .catch(() => { if (!cancelled) setResults({ restaurants: [], chefs: [] }); });
    }, 300);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [query]);

  return results;
}
