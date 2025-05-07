import { useState, useCallback } from 'react';
import { donationService } from '../services/donationService';

interface Option {
  id: string;
  name: string;
}

export const useOptions = () => {
  const [locations, setLocations] = useState<Option[]>([]);
  const [themes, setThemes] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await donationService.getLocations();
      setLocations(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch locations'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchThemes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await donationService.getThemes();
      setThemes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch themes');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllOptions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await Promise.all([fetchLocations(), fetchThemes()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch options');
    } finally {
      setLoading(false);
    }
  }, [fetchLocations, fetchThemes]);

  return {
    locations,
    themes,
    loading,
    error,
    fetchLocations,
    fetchThemes,
    fetchAllOptions,
  };
};
