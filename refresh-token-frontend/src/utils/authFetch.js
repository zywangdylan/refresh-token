import { getAuthToken, setAuthToken } from './localStorage';

const API_BASE_URL = 'http://localhost:3000'; // Adjust according to your server's address
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
    // TODO: Redirect to login page
    throw error;
  } finally {
    isRefreshing = false;
  }
}

async function authFetch(url, options) {
  let res = await fetch(url, options);
  let accessToken = getAuthToken('accessToken');

  const executeFetch = async ()  => {
    const res = await fetch(url, {
      ...options,
      'Authorization': `Bearer ${accessToken}`,
    });
    return res;
  }

  const response = await executeFetch();
  const data = await response.json();

  if (response.ok) {
    return response;
  } else if (response.status === 409) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshToken.then(newToken => {
        processQueue(null, newToken)
      }).catch(err => {
        processQueue(error, null)
        return Promise.reject(error)
      })
    }

    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve: () => resolve(authFetch(url, options)),
        reject: () => reject(data),
      });
    });
  } else {
    // Directly reject for all other errors
    return Promise.reject(data);
  }

  return response;
}

export default authFetch;

// authFetch(API_URL + '/endpoint', {
//   method: 'GET',
//   // Additional options...
// })
// .then(data => {
//   // Handle successful response
// })
// .catch(error => {
//   // Handle error
// });
