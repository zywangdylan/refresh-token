// Helper function to get stored auth token
const getAuthToken = () => localStorage.getItem('authToken');


// Store Auth Token
const setAuthToken = (token) => {
  try {
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
}

export {
  getAuthToken,
  setAuthToken 
}
