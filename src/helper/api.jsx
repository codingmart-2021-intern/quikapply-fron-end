import axios from "axios";

const baseUrl = "https://quickapplybackend.herokuapp.com/"

//and interceptor comes here
const platformApi = axios.create({
    baseURL: baseUrl,
    headers: {
        "content-Type": "application/json"
    }
});


export { platformApi };
