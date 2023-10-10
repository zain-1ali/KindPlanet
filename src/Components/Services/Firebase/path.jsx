import axios from "axios";

export default axios.create(
    {
        baseURL: "https://sapid-e3df5-default-rtdb.firebaseio.com/"
    }
)