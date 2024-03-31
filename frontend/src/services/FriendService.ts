import { useAuthStore } from "../stores/authStore";
import axios, { AxiosInstance } from "axios";

export class FriendService {
  private authStore = useAuthStore();
  private token: string;
  private friendListClient: AxiosInstance;
  constructor() {
    this.friendListClient = axios.create({
      baseURL: "http://10.0.0.173:3000/friend-controller/",
      headers: {
        Authorization: `Bearer ${this.authStore.token}`,
        token: this.authStore.token,
      },
    });
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      if (cookie.startsWith("token=")) {
        this.saveToken(cookie);
      }
    });
    this.token = this.authStore.token;
  }

  getReceivedFriendRequests() {
    return this.friendListClient.get("received-friend-requests/");
  }

  getSendedFriendRequests() {
    return this.friendListClient.get("sended-friend-requests/");
  }

  getFriendList() {
    return this.friendListClient.get("friend-list/");
  }

  sendFriendRequest(receiverNickname: string) {
    return this.friendListClient.post("send-friend-request", {
      receiverNickname,
    });
  }

  handleFriendRequest(friendId: string, status: string) {
    return this.friendListClient.post("handle-friend-request/", {
      friendId,
      status,
    });
  }

  private saveToken(tokenCookie: string) {
    const token = tokenCookie.substring(6);
    this.authStore.setToken(token);
  }
}
