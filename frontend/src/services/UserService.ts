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
  setAvatarPicture(bodyFormData: FormData) {
    const token = authStore.getToken;

    return axios.patch(
      "http://localhost:3000/user/avatar", bodyFormData,
      {
        url: "myurl",
        data: bodyFormData,
        headers: {
          Authorization: `Bearer ${token}`,
          token: token,
          "Content-Type": "multipart/form-data",
        },
      })
  },
  updateStatus(status: number) {
    const token = authStore.getToken;

    return axios.patch(
      "http://localhost:3000/user/status",
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          token: token,
        },
      }
    );
  },

  getUser(id: string) {
    const token = authStore.getToken;

    return axios.get(`http://localhost:3000/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  },

  getRanking() {
    const token = authStore.getToken;
    return axios.get("http://localhost:3000/user/rankings", {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  }
};
