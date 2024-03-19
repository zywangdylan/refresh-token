import { getAuthToken, setAuthToken } from './localStorage';
const API_BASE_URL = 'http://localhost:3000'; // Adjust according to your server's address

async function refreshToken() {
  // Assuming the refresh token is stored in localStorage
  const refreshToken = getAuthToken('refreshToken');
  try {
    const response = await fetch(`${API_BASE_URL}/api/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Could not refresh token');

    // Update localStorage with the new tokens
    setAuthToken('accessToken', data.accessToken);
    setAuthToken('refreshToken', data.refreshToken);

    return data.accessToken;
  } catch (error) {
    console.error('Refresh Token Error:', error);
    throw error;
  }
}

async function authFetch(url, options) {
  let res = await fetch(url, options);

  // Check if the token is expired
  if (response.status === 409) {
    try {
      const newAccessToken = await refreshToken();
      // Update the Authorization header with the new token
      options.headers['Authorization'] = `Bearer ${newAccessToken}`;
      // Retry the fetch with the new token
      response = await fetch(url, options);
    } catch (refreshError) {
      console.error('Error refreshing token:', refreshError);
      throw refreshError;
    }
  }

  return response;
}

export default authFetch;
