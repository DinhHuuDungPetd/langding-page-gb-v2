'use client';

import { useState, useEffect, useCallback } from 'react';

const cache = new Map();

export const useOptimizedData = (key, fetchFn) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      // Check cache first
      if (cache.has(key)) {
        setData(cache.get(key));
        setLoading(false);
        return;
      }

      // Fetch new data
      const result = await fetchFn();
      
      // Cache the result
      cache.set(key, result);
      
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [key, fetchFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to manually refresh data
  const refresh = useCallback(() => {
    setLoading(true);
    cache.delete(key);
    fetchData();
  }, [key, fetchData]);

  return {
    data,
    loading,
    error,
    refresh
  };
};

// Helper function to clear entire cache
export const clearCache = () => {
  cache.clear();
};

export default useOptimizedData; 