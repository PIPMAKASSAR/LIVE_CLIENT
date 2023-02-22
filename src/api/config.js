import axios from "axios";

const instance = axios.create({
    baseURL: "https://apinavicampus.pipmakassar.ac.id/api/live"
   
})

export default instance