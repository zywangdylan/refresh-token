import { getAuthToken } from './localStorage'
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

// Update User Information
const updateUser = async (updates) => {
  try {
    const authToken = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/user/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
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
  updateUser
}
