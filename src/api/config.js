import axios from "axios";

const instance = axios.create({
    // baseURL: "http://localhost:2224/api/dev"
    // baseURL: "http://103.77.206.78:2224/api/dev"
    baseURL: "https://apinavicampus.pipmakassar.ac.id/api/live"
})

export default instance