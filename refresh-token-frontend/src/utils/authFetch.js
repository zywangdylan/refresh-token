import { getAuthToken, setAuthToken } from './localStorage';

const API_BASE_URL = 'http://localhost:8080';
let isRefreshing = false;
let requests = [];

const processQueue = (error, token = null) => {
  requests.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  requests = [];
}

function delay(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

async function refresh() {
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
  let response = await fetch(url, options);

  if (response.ok) {
    return response;
  } else if (response.status === 409) {
    if (!isRefreshing) {
      isRefreshing = true;
      return refresh().then(newToken => {
        const authOptions = {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newToken}`, // Update the authorization header
          },
        };
        processQueue(null, newToken);
        return fetch(url, authOptions);
      }).catch(err => {
        processQueue(err, null); // Process the queue with error
        throw err; // Rethrow to be caught by the caller
      }).finally(() => {
        isRefreshing = false; // Reset the refreshing flag
      });
    } else {
      // If a refresh is already in progress, queue this request
      return new Promise((resolve, reject) => {
        requests.push({
          resolve: () => resolve(authFetch(url, options)),
          reject: () => reject,
        });
      });
    }
  } else {
    throw new Error('Failed to fetch');
  }
}

export default authFetch;
