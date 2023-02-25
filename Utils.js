export default class Utils {
    static async getToken() {
        return localStorage.getItem("token");
    }
}
