import { useAuthStore } from "../stores/authStore";
import axios from "axios";

const authStore = useAuthStore();

export default {
  login() {
    window.location.href = "https://ft-transcendence-1.onrender.com/auth/42/callback";
    // return axios.get("https://ft-transcendence-1.onrender.com/auth/42/callback");
  },
  logout() {
    const token = authStore.getToken;

    return axios.get("https://ft-transcendence-1.onrender.com/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  },
  generateTfa() {
    const token = authStore.getToken;

    return axios.post("https://ft-transcendence-1.onrender.com/auth/generate-2fa", null, {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  },
  disableTfa() {
    const token = authStore.getToken;

    return axios.post("https://ft-transcendence-1.onrender.com/auth/disable-2fa", null, {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  },
  verifyTfa(code: string) {
    const token = authStore.getToken;

    const data = {
      code,
    };

    return axios.post("https://ft-transcendence-1.onrender.com/auth/verify-2fa", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  },
};
