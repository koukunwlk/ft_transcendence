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
  updateNickname(nickname: string) {
    const token = authStore.getToken;

    const data = {
      nickname,
    };

    return axios.patch("http://localhost:3000/user/nickname", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  },
};
