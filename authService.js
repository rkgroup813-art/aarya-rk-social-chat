// authService.js

const authService = {
  signup: async (username, password) => {
    // Implement signup logic here
    console.log(`User signed up with username: ${username}`);
  },

  login: async (username, password) => {
    // Implement login logic here
    console.log(`User logged in with username: ${username}`);
  },

  logout: () => {
    // Implement logout logic here
    console.log(`User logged out`);
  }
};

export default authService;