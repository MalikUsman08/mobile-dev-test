import { DonationItem, NewDonationItem } from '../interfaces/donation';
import { API_ENDPOINTS, API_HEADERS } from '../constants/api';

export const donationService = {
  async getAllDonations(): Promise<DonationItem[]> {
    const response = await fetch(API_ENDPOINTS.DONATIONS.ALL, {
      method: 'GET',
      headers: API_HEADERS,
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  async createDonation(donation: NewDonationItem): Promise<DonationItem> {
    const response = await fetch(API_ENDPOINTS.DONATIONS.CREATE, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(donation),
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error('Failed to create donation');
    }

    return response.json();
  },

  async deleteDonation(id: string): Promise<void> {
    const response = await fetch(API_ENDPOINTS.DONATIONS.DELETE(id), {
      method: 'DELETE',
      headers: API_HEADERS,
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error('Failed to delete donation');
    }
  },

  async resetDonations(): Promise<void> {
    const response = await fetch(API_ENDPOINTS.DONATIONS.RESET, {
      method: 'POST',
      headers: API_HEADERS,
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error('Failed to reset donations');
    }
  },

  async getLocations(): Promise<{ id: string; name: string }[]> {
    const response = await fetch(API_ENDPOINTS.DONATIONS.LOCATIONS, {
      method: 'GET',
      headers: API_HEADERS,
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }

    return response.json();
  },

  async getThemes(): Promise<{ id: string; name: string }[]> {
    const response = await fetch(API_ENDPOINTS.DONATIONS.THEMES, {
      method: 'GET',
      headers: API_HEADERS,
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch themes');
    }

    return response.json();
  },
};
