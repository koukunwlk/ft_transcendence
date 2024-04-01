import { useAuthStore } from "../stores/authStore";
import axios, { AxiosInstance } from "axios";

export enum FriendListStatusEnum {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    BLOCKED = "BLOCKED",
    CANCELLED = "CANCELLED",
}


export class FriendService {
	private authStore;
	private token: string | undefined;
	private friendListClient: AxiosInstance
	constructor() {
		this.authStore = useAuthStore();
		this.token = document.cookie.split(";").find((cookie) => cookie.startsWith("token="))?.substring(6);
		this.friendListClient = axios.create({
			baseURL: "https://ft-transcendence-1.onrender.com/friend-controller/",
			headers: {
				Authorization: `Bearer ${this.token}`,
				token: this.token,
			},
		});
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
		this.token = token;
		this.authStore.setToken(token);
	}
}