// import axios from 'axios'

// const api = axios.create({
//   baseURL: "http://localhost:8000"
// })
// export default api

import axios from 'axios';

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: "http://localhost:3000"
});

// Export the Axios instance
export default api;