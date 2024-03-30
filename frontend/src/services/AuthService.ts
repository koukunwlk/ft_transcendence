import { useAuthStore } from "../stores/authStore";
import axios from "axios";

const authStore = useAuthStore();

export default {
  login() {
    window.location.href = "http://10.0.0.173:3000/auth/42/callback";
    // return axios.get("http://localhost:3000/auth/42/callback");
  },
  logout() {
    const token = authStore.getToken;

    return axios.get("http://10.0.0.173:3000/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  },
  generateTfa() {},
  verifyTfa(code: string) {
    const token = authStore.getToken;

    const data = {
      code,
    };

    return axios.post("http://10.0.0.173:3000/auth/verify-2fa", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  },
};
