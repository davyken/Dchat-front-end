import axios from "axios";

const BASE_URL = "https://d-chat-backend.onrender.com";

const fetchParticularUser = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/users/user-profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile", {
      message: error.message,
      config: error.config,
      request: error.request,
      response: error.response,
    });

    throw error;
  }
};

export { fetchParticularUser };
