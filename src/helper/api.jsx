import axios from "axios";

const baseUrl = "https://quickapplybackend.herokuapp.com/"
// const baseUrl = "http://localhost:8000"


//and interceptor comes here
const platformApi = axios.create({
    baseURL: baseUrl,
    headers: {
        "content-Type": "application/json"
    }
});


export { platformApi };
