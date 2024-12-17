import axios from "axios";

export const BaseUrl = "https://starclaud.pythonanywhere.com/api/"; // To'g'ri URLni tekshiring

const client = axios.create({
    BaseUrl: BaseUrl,
    headers: {
        "Content-Type": "application/json", // JSON yuborish uchun zarur header
    },
});

export default client;
