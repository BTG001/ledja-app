import axios from "axios";

export default class Utils {
    static async getHeaders() {
        return {
            Authorization: `Bearer 7|J1qaoIMteqBZ1D901WQY4ba437Pm127WV98YNfxD`,
        };
    }

    static async postForm(url, data) {
        return axios.postForm(url, data, Utils.getHeaders());
    }

    static async get(url) {
        return axios.get(url, Utils.getHeaders());
    }
}
