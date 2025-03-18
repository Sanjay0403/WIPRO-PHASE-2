import axios from "axios";

const API_URL = "https://localhost:7153/api/batch"; // Adjust the URL if needed

const BatchService = {
  getBatches: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      throw new Error("Unauthorized: No token provided");
    }

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching batches:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default BatchService;
