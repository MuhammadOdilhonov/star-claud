import AsyncStorage from '@react-native-async-storage/async-storage';
import client, { BaseUrl } from "../apiService";

class categoryApi {
    async AddCategory(props) {
        const endpoint = "categories/";


        try {
            // Retrieve the token from AsyncStorage
            const token = await AsyncStorage.getItem('Token');

            // Check if the token exists
            if (!token) {
                console.error('No token found in AsyncStorage');
                throw new Error('Token is missing. Please log in again.');
            }

            // Include token in the request headers
            const response = await client.post(`${BaseUrl}${endpoint}`, {
                name: props,
            },
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2MDcyOTkxLCJpYXQiOjE3MzM0ODA5OTEsImp0aSI6IjNiYjY1MjI2ODdiNzQwNzM4M2ZhMDA1ZTNlOWU0YzFiIiwidXNlcl9pZCI6MX0.FYYrf9inY6yyuFcKMqAO8W1HeRIMbTpo0A-vWSfzM_Q`, // Correct Authorization format
                    },
                });



            return response; // Return the successful response data
        } catch (err) {
            return err; // Throw the error for further handling
        }
    }
    async Category() {
        const endpoint = "categories/";

        try {
            // Retrieve the token from AsyncStorage
            const token = await AsyncStorage.getItem('Token');

            // Check if the token exists
            if (!token) {
                console.error('No token found in AsyncStorage');
                throw new Error('Token is missing. Please log in again.');
            }

            // Include token in the request headers
            const response = await client.get(BaseUrl + endpoint, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2MDcyOTkxLCJpYXQiOjE3MzM0ODA5OTEsImp0aSI6IjNiYjY1MjI2ODdiNzQwNzM4M2ZhMDA1ZTNlOWU0YzFiIiwidXNlcl9pZCI6MX0.FYYrf9inY6yyuFcKMqAO8W1HeRIMbTpo0A-vWSfzM_Q`, // Ensure proper Bearer token format
                },
            });



            return response; // Return the successful response data
        } catch (err) {
            return err; // Throw the error for further handling
        }
    }
}

export default new categoryApi();
