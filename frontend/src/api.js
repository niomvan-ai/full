import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: "https://cautious-space-garbanzo-pxrrvjv9g67hvg6-8000.app.github.dev/api/",
});

api.interceptors.request.use(
	(config) => {

		const token = localStorage.getItem(ACCESS_TOKEN);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	
	(error) => {
		return Promise.reject(error);
	}
);

export default api;
