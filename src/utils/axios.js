import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

let token;

const getToken1 = async () => {
	try {
		let data = await localStorage.getItem("persist:myartstock");
		let token = await JSON.parse(data).token.replace(/"/g, "");

		return token;
	} catch (err) {
		console.log(err.message);
	}
};

const instance = axios.create({
	baseURL: "https://api.myartstocks.com",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		Accept: "application/json",
		// Authorization: `Bearer ${token}`,
	},
	crossDomain: true,
	withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
	try {
		token = await getToken1();
		if (config.headers) {
		 config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	} catch (err) {
		toast.error(err);
	}
});

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => {
		toast.error(err.message);
		if (typeof err.response === "undefined") {
			toast.error(err.message);
			return;
		}

		if (err.response && err.response.status == 403) {
			// redirect to login page
			return (window.location.href = "/");
		}

		if (err.response.status == 401 && window.location.pathname !== "/login") {
			// window.location.href = "/";
		}
		return;
	}
);

export default instance;
