import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/api/`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

// axiosClient.interceptors.request.use(async (config) => {
//     // Handle token here ...
//     const worker = localStorage.getItem("worker");
//     const { isLogged = false, access_token = "" } = JSON.parse(worker) || {};

//     if (isLogged) {
//       config.headers = {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'AUTH_TOKEN': access_token,
//       }
//     }
//     return config;
//   });

export default axiosClient;