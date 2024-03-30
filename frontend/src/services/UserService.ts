import { useAuthStore } from "../stores/authStore";
import axios from "axios";

const authStore = useAuthStore();

export default {
  me() {
    const token = authStore.getToken;
    
    return axios.get("http://localhost:3000/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  },
};
