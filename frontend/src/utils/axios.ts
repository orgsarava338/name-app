import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.APP_API_URL,
    withCredentials: true,
})

api.interceptors.request.use((config) => {

    const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN"))
        ?.split("=")[1];

    if (csrfToken) config.headers["X-CSRF-TOKEN"] = decodeURIComponent(csrfToken);  // Make sure to decode the token

    return config
})

export default api;