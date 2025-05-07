import { useState, useCallback } from 'react';
import { DonationItem, NewDonationItem } from '../interfaces/donation';
import { donationService } from '../services/donationService';

type StatusFilter = 'all' | 'pending' | 'active' | 'rejected';

export const useDonations = () => {
  const [donations, setDonations] = useState<DonationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const fetchDonations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching all donations...');
      const data = await donationService.getAllDonations();
      console.log('Fetched donations:', data);
      setDonations(data);
    } catch (err) {
      console.error('Error fetching donations:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to fetch donations'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const createDonation = useCallback(async (donation: NewDonationItem) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Creating donation with data:', donation);
      const newDonation = await donationService.createDonation(donation);
      console.log('Donation created with response:', newDonation);
      setDonations((prev) => [...prev, newDonation]);
      return newDonation;
    } catch (err) {
      console.error('Error creating donation:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to create donation'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDonation = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await donationService.deleteDonation(id);
      setDonations((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete donation'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetDonations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await donationService.resetDonations();
      await fetchDonations();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to reset donations'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchDonations]);

  const filteredDonations = donations.filter(
    (donation) =>
      statusFilter === 'all' ||
      donation.status.name.toLowerCase() === statusFilter.toLowerCase()
  );

  return {
    donations: filteredDonations,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    fetchDonations,
    createDonation,
    deleteDonation,
    resetDonations,
  };
};
