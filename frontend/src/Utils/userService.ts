import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

/* Register User */
async function registerUser(username: any, email: any, password: any) {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { username, email, password });
    const user = response.data;
    console.log('User registered successfully:', user);
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

async function loginUser(email: any, password: any) {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
    console.log('API Response:', response); // Log the entire response
    // Extract the token from the response and store it securely
    const token = response.data.token;
    // Store the token in localStorage, sessionStorage, or a state management solution
    localStorage.setItem('token', token);

    const user = response.data.user;
    console.log('User logged in successfully:', user);
    window.location.href = '/';
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/* Get User by id*/
async function getUserById(userId: any) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    }
}

/* Logout Function */
function logoutUser(): void {
  localStorage.removeItem('token');

  axios.post('/api/logout')
    .then(response => {
      console.log('User logged out successfully');
    })
    .catch(error => {
      console.error('Logout error:', error);
    });

  window.location.reload()
}



const userService = {
    loginUser,
    registerUser,
    getUserById,
    logoutUser,
  };

export default userService;