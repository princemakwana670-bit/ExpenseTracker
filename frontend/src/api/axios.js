import axios from "axios";

// Use environment variable for baseURL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true, // REQUIRED for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= GLOBAL RESPONSE HANDLER ================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expired / not logged in
    if (error.response?.status === 401) {
      console.warn("Unauthorized - redirecting to login");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
