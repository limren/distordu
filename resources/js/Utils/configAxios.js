import axios from "axios";

// Each time an user is logged in, it creates a new instance with his token. We can use it through the whole app.
const instance = axios.create({
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
});

export default instance;
