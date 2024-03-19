import { getAuthToken } from '../utils/localStorage'
import authFetch from '../utils/authFetch';
const API_BASE_URL = 'http://localhost:8080'

// Log In
const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Could not complete login');
    return data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

// Signup
const signup = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Could not complete login');
    return data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

const getUserInfo = async () => {
  try {
    const url = `${API_BASE_URL}/api/userInfo`;
    const accessToken = getAuthToken('accessToken');

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    };

    const response = await authFetch(url, options);

    if (!response.ok) {
      const error = new Error('Failed to fetch user info');
      error.info = await response.json();
      error.status = response.status;
      throw error;
    }

    return response.json(); // Return the user info
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};

// Update User Information
const updateUser = async (updates) => {
  try {
    const accessToken = getAuthToken('accessToken');
    const response = await authFetch(`${API_BASE_URL}/api/userInfo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Could not update user information');
    return data;
  } catch (error) {
    console.error('Update User Error:', error);
    throw error;
  }
};

export {
  login,
  signup,
  getUserInfo,
  updateUser
}
