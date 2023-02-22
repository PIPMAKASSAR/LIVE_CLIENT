import axios from "axios";

const instance = axios.create({
    baseURL: "https://apinavicmapus.pipmakassar.ac.id/api/live"
    // baseURL: "https://genius-im.com/api/live"
})

export default instance