// Helper function to get stored auth token
const getAuthToken = (tokenName) => localStorage.getItem(tokenName);


// Store Auth Token
const setAuthToken = (tokenName, token) => {
  try {
    console.log('setAuthToken', token)
    localStorage.setItem(tokenName, token);
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
}

export {
  getAuthToken,
  setAuthToken
}
