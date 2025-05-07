import { DonationItem, NewDonationItem } from '../interfaces/donation';
import { API_ENDPOINTS, API_HEADERS } from '../constants/api';

export const donationService = {
  async getAllDonations(): Promise<DonationItem[]> {
    console.log('API Call: Getting all donations');
    const response = await fetch(API_ENDPOINTS.DONATIONS.ALL, {
      method: 'GET',
      headers: API_HEADERS,
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response - All donations:', data);
    return data;
  },

  async createDonation(donation: NewDonationItem): Promise<DonationItem> {
    try {
      // Transform the data to match the API schema
      const requestData = {
        name: donation.name,
        location: donation.location,
        theme: donation.theme,
        price: {
          currencyCode: donation.price.currencyCode,
          amount: donation.price.amount,
        },
      };

      console.log(
        'API Call: Creating donation with transformed data:',
        JSON.stringify(requestData, null, 2)
      );
      console.log('Request URL:', API_ENDPOINTS.DONATIONS.CREATE);
      console.log('Request Headers:', API_HEADERS);

      const response = await fetch(API_ENDPOINTS.DONATIONS.CREATE, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(requestData),
        mode: 'cors',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(
          `Failed to create donation: ${response.status} ${response.statusText}`
        );
      }

      const createdDonation = await response.json();
      console.log(
        'API Response - Created donation:',
        JSON.stringify(createdDonation, null, 2)
      );
      return createdDonation;
    } catch (error) {
      console.error('Error in createDonation:', error);
      throw error;
    }
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
