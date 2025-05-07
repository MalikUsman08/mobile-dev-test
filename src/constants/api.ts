export const API_BASE_URL =
  'https://n3o-coding-task-react.azurewebsites.net/api/v1';

export const API_ENDPOINTS = {
  DONATIONS: {
    ALL: `${API_BASE_URL}/donationItems/all`,
    RESET: `${API_BASE_URL}/donationItems/reset`,
    LOCATIONS: `${API_BASE_URL}/donationItems/locations`,
    THEMES: `${API_BASE_URL}/donationItems/themes`,
    CREATE: `${API_BASE_URL}/donationItems`,
    DELETE: (id: string) => `${API_BASE_URL}/donationItems/${id}`,
  },
};

export const API_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
