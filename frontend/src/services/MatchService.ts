import { useAuthStore } from "../stores/authStore";
import axios from "axios";

export interface Player {
    id: string;
    nickname: string | null;
    token: string;
    status: number | null;
    validCode: boolean | null;
    userId: string | null;
    email: string;
    username: string;
    tfaSecret: string | null;
}

export interface MatchResponse {
    id: string;
    playerOneGoalsCount: number;
    playerTwoGoalsCount: number;
    matchType: string;
    matchDuration: string;
    createdAt: string;
    updatedAt: string;
    playerOne: Player;
    playerTwo: Player;
}


export class MatchService {
    private authStore = useAuthStore();
  constructor() {
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
        if (cookie.startsWith("token=")) {
          this.saveToken(cookie);
        }
      });
  }
  async getMyMatches(): Promise<MatchResponse[]> {
    const token = this.authStore.token;
    console.log("token", token);
    const response = await axios.get("http://10.0.0.173:3000/match-history/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
    return response.data;
  }

  private saveToken(tokenCookie: string) {
    const token = tokenCookie.substring(6);
    this.authStore.setToken(token);
  }
}