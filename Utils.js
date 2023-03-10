import axios from "axios";
import Config from "./Config";

export default class Utils {
    static isLoggedIn() {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        const userTypeId = localStorage.getItem("user_type_id");
        const email = localStorage.getItem("email");

        if (token && userId && userTypeId && email) {
            return true;
        }

        return false;
    }
    static getHeaders() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
        };
    }

    static getAuthorization() {
        const token = localStorage.getItem("token");
        return `Bearer ${token}`;
    }

    static getLocalJobPost() {
        const jobPostTemplate = {
            user_id: localStorage.getItem("user_id"), // should be id of logged in user from local storage
            job_category_id: null,
            job_status: null,
            company_industry: null,
            company_sub_industry: null,
            title: null,
            location: null,
            description: null,
            type: null,
            no_of_hires: null,
            hiring_speed: null,
            own_completion: null,
            with_recommendation: null,
            with_resume: null,
            communication_preferences: null,
            skills_assessment: null,
            apply_method: null,
        };

        let jobPost = localStorage.getItem("job_post");

        if (!jobPost) {
            jobPost = jobPostTemplate;
        } else {
            jobPost = JSON.parse(jobPost);
        }

        return jobPost;
    }

    static async makeRequest(requestFunction) {
        axios.defaults.withCredentials = true;
        axios
            .get(`${Config.BASE_URL}/sanctum/csrf-cookie`)
            .then((data) => {
                console.log("CSRF Request: ", data);
                axios.defaults.withCredentials = true;
                requestFunction();
            })
            .catch((error) => {
                console.log("request error: ", error);
            });
    }

    static async makeFetchRequest(requestFunction) {
        fetch(`${Config.BASE_URL}/sanctum/csrf-cookie`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
        })
            .then((data) => {
                requestFunction();
            })
            .catch((error) => console.log("Fetch error: ", error));
    }

    static async postForm(url, data) {
        return axios.postForm(url, data, {
            headers: Utils.getHeaders(),
        });
    }

    static async putForm(url, data, params) {
        data.append("_method", "PUT");
        return axios.postForm(url, data, {
            headers: Utils.getHeaders(),
            params: params,
        });
    }
}
