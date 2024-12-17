import client, { BaseUrl } from "../apiService";

class loginApi {
    async login(props) {
        
        const loginEndpoint = "login/";
        try {
            const response = await client.post(BaseUrl + loginEndpoint, {
                username: props.username,
                password: props.password,
            });
            return response; // Foydali ma'lumot qaytaramiz
        } catch (err) {
            // console.error("Login xatosi:", err);
            return err; // Xatoni tashlaymiz
        }
    }
}

export default new loginApi();
