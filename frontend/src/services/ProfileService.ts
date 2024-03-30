import { useAuthStore } from "../stores/authStore";
import axios from "axios";

export class ProfileService {
    private authStore = useAuthStore();
    private token: string;
    constructor() {
        const cookies = document.cookie.split(";");
        cookies.forEach((cookie) => {
            if (cookie.startsWith("token=")) {
            this.saveToken(cookie);
            }
        });
        this.token = this.authStore.token;
  }

  me() {
    return axios.get("http://10.0.0.173:3000/user/me", {
      headers: {
        Authorization: `Bearer ${this.token}`,
        token: this.token,
      },
    });
  }

  updateStatus(status: number) {
    return axios.patch(
      "http://localhost:3000/user/status",
      { status },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          token: this.token,
        },
      }
    );
  }

  private saveToken(tokenCookie: string) {
    const token = tokenCookie.substring(6);
    this.authStore.setToken(token);
  }
}