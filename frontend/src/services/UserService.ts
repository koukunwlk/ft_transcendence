import { useAuthStore } from "../stores/authStore";
import axios from "axios";

export class UserService {
  private defaultToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1NDYxNWYwLWYyNTktNDc3ZC1hZmU1LTdlODRkZWY4OTQ2ZiIsIlVzZXJOYW1lIjoibWFtYXJvLWQiLCJpYXQiOjE3MTE5MzQ4MjZ9.GOO2uwgkMU5R2eXSVcHSs__qu5iJuqIibTrAKIH9ahE";

  private get token() {
    const token = document.cookie.split(";").find((cookie) => cookie.startsWith("token="))?.substring(6);
    return token || this.defaultToken;
  }

  me() {
    return axios.get("https://ft-transcendence-1.onrender.com/user/me", {
      headers: {
        Authorization: `Bearer ${this.token}`,
        token: this.token,
      },
    });
  }

  updateNickname(nickname: string) {
    const data = {
      nickname,
    };

    return axios.patch("https://ft-transcendence-1.onrender.com/user/nickname", data, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        token: this.token,
      },
    });
  }

  setAvatarPicture(bodyFormData: FormData) {
    return axios.patch(
      "https://ft-transcendence-1.onrender.com/user/avatar", bodyFormData,
      {
        url: "myurl",
        data: bodyFormData,
        headers: {
          Authorization: `Bearer ${this.token}`,
          token: this.token,
          "Content-Type": "multipart/form-data",
        },
      })
  }

  updateStatus(status: number) {
    return axios.patch(
      "https://ft-transcendence-1.onrender.com/user/status",
      { status },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          token: this.token,
        },
      }
    );
  }

  getUser(id: string) {
    return axios.get(`https://ft-transcendence-1.onrender.com/user/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        token: this.token,
      },
    });
  }

  getRanking() {
    console.log("getRanking");
    return axios.get("https://ft-transcendence-1.onrender.com/user/rankings", {
      headers: {
        Authorization: `Bearer ${this.token}`,
        token: this.token,
      },
    });
  }
}

export default new UserService();
