import axios from "axios";
import Config from "../Config";
import Utils from "../Utils";

export default class UserRequests {
    static URL = `${Config.BASE_URL}/users`;

    static async login(data) {
        const LOGIN_URL = `${Config.BASE_URL}/login`;
        // Default options are marked with *
        // const response = await fetch(LOGIN_URL, {
        //     method: "POST", // *GET, POST, PUT, DELETE, etc.
        //     mode: "cors", // no-cors, *cors, same-origin
        //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: "same-origin", // include, *same-origin, omit
        //     headers: {
        //         // "Content-Type": "application/json",
        //         "Content-Type": "application/x-www-form-urlencoded",
        //     },
        //     redirect: "follow", // manual, *follow, error
        //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //     body: data, // body data type must match "Content-Type" header
        // });

        // return response.json(); // parses JSON response into native JavaScript objects

        // return axios.post(LOGIN_URL, data);

        // axios.create({
        //     withCredentials: true,
        //     baseURL: UserRequests.URL,
        // });

        return axios.post(LOGIN_URL, data);
    }

    static async register(data) {
        const REGISTER_URL = `${Config.BASE_URL}/register`;
        // Default options are marked with *
        const response = await fetch(REGISTER_URL, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                // "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data, // body data type must match "Content-Type" header
        });

        return response.json(); // parses JSON response into native JavaScript objects
    }

    static async getOneUser(id) {
        // Default options are marked with *
        const response = await fetch(`${UserRequests.URL}/${id}`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                Authorization: `Bearer 7|J1qaoIMteqBZ1D901WQY4ba437Pm127WV98YNfxD`,
                // "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body: JSON.stringify(), // body data type must match "Content-Type" header
        });

        console.log("response: ", response);

        if (!response.ok) {
            return {
                success: false,
            };
        }
        return response.json(); // parses JSON response into native JavaScript objects
    }
}
