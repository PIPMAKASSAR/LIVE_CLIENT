import axios from "axios";

const instance = axios.create({
    baseURL: "https://apinavicmapus.pipmakassar.ac.id/api/live"
})

export default instance