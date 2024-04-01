import { useAuthStore } from "../stores/authStore";
import axios from "axios";

const authStore = useAuthStore();

export default {
  me() {
    const token = authStore.getToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1NDYxNWYwLWYyNTktNDc3ZC1hZmU1LTdlODRkZWY4OTQ2ZiIsIlVzZXJOYW1lIjoibWFtYXJvLWQiLCJpYXQiOjE3MTE5MzQ4MjZ9.GOO2uwgkMU5R2eXSVcHSs__qu5iJuqIibTrAKIH9ahE"

    return axios.get("https://ft-transcendence-1.onrender.com/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  },
  updateNickname(nickname: string) {
    const token = authStore.getToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1NDYxNWYwLWYyNTktNDc3ZC1hZmU1LTdlODRkZWY4OTQ2ZiIsIlVzZXJOYW1lIjoibWFtYXJvLWQiLCJpYXQiOjE3MTE5MzQ4MjZ9.GOO2uwgkMU5R2eXSVcHSs__qu5iJuqIibTrAKIH9ahE"

    const data = {
      nickname,
    };

    return axios.patch("https://ft-transcendence-1.onrender.com/user/nickname", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  },
  setAvatarPicture(bodyFormData: FormData) {
    const token = authStore.getToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1NDYxNWYwLWYyNTktNDc3ZC1hZmU1LTdlODRkZWY4OTQ2ZiIsIlVzZXJOYW1lIjoibWFtYXJvLWQiLCJpYXQiOjE3MTE5MzQ4MjZ9.GOO2uwgkMU5R2eXSVcHSs__qu5iJuqIibTrAKIH9ahE"

    return axios.patch(
      "https://ft-transcendence-1.onrender.com/user/avatar", bodyFormData,
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
    const token = authStore.getToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1NDYxNWYwLWYyNTktNDc3ZC1hZmU1LTdlODRkZWY4OTQ2ZiIsIlVzZXJOYW1lIjoibWFtYXJvLWQiLCJpYXQiOjE3MTE5MzQ4MjZ9.GOO2uwgkMU5R2eXSVcHSs__qu5iJuqIibTrAKIH9ahE";

    return axios.patch(
      "https://ft-transcendence-1.onrender.com/user/status",
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

    return axios.get(`https://ft-transcendence-1.onrender.com/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  },

  getRanking() {
    const token = authStore.getToken;
    console.log("getRanking");
    return axios.get("https://ft-transcendence-1.onrender.com/user/rankings", {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  }
};
