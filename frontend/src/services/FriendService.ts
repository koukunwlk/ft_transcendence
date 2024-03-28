import { useAuthStore } from "../stores/authStore";
import axios from "axios";

export class FriendService {
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
		return axios.get("http://localhost:3000/user/me", {
			headers: {
				Authorization: `Bearer ${this.token}`,
				token: this.token,
			},
		});
	}

	getUserToAddId(username: string) {
		return axios.get(
			"http://localhost:3000/user/" + username,
			{
				headers: {
					Authorization: `Bearer ${this.token}`,
					token: this.token,
				},
			}
		);
	}

	addFriend(username: string) {
		userToAdd: string;

		userToAddId = getUserToAddId(username);
		return axios.get("http://localhost:3000/received-friend-requests/" + userToAddId, {
			headers: {
				Authorization: `Bearer ${this.token}`,
				token: this.token,
			},
		});
	}

	private saveToken(tokenCookie: string) {
		const token = tokenCookie.substring(6);
		this.authStore.setToken(token);
	}
}
