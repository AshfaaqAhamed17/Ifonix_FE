// api.js

import axios from "axios";

// Create an Axios instance with the base URL
const instance = axios.create({
  baseURL: "http://13.127.206.58:1100/api/v1", // Replace with your base URL
});

export default instance;
