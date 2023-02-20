import axios from "axios";

const instance = axios.create({
    baseURL: "https://genius-im.com/api/live"
})

export default instance