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
  private authStore;
  private token: string | undefined;
  constructor() {
    this.token = document.cookie.split(";").find((cookie) => cookie.startsWith("token="))?.substring(6);
    this.authStore = useAuthStore();
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
        if (cookie.startsWith("token=")) {
          this.saveToken(cookie);
        }
      });
  }
  async getMyMatches(): Promise<MatchResponse[]> {
    const response = await axios.get("https://ft-transcendence-1.onrender.com/match-history/me", {
      headers: {
        Authorization: `Bearer ${this.token}`,
        token: this.token,
      },
    });
    return response.data;
  }

  async getMatchesByUserId(userId: string): Promise<MatchResponse> {
    const response = await axios.get(`https://ft-transcendence-1.onrender.com/match-history/matches/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        token: this.token,
      },
    });
    return response.data;
  }

  private saveToken(tokenCookie: string) {
    const token = tokenCookie.substring(6);
    this.token = token;
    this.authStore.setToken(token);
  }
}