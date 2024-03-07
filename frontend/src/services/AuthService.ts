import axios from "axios";

export default {
  login() {
    window.location.href = "http://localhost:3000/auth/42/callback";
    // return axios.get("http://localhost:3000/auth/42/callback");
  },
};
