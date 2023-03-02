import axios from "axios";

const instance = axios.create({
    // baseURL: "http://103.77.206.78:2023/api/dev"
    baseURL: "https://apinavicampus.pipmakassar.ac.id/api/live"
})

export default instance