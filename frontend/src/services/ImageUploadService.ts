import { useAuthStore } from "../stores/authStore";
import axios, { AxiosInstance } from "axios";

export class ImageUploadService {
	private authStore = useAuthStore();
	private token: string;

	constructor() {

	}


	private saveToken(tokenCookie: string) {
		const token = tokenCookie.substring(6);
		this.authStore.setToken(token);
	}
}
