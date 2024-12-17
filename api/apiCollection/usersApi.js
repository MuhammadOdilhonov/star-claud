import AsyncStorage from '@react-native-async-storage/async-storage';
import client, { BaseUrl } from "../apiService";

class usersApi {
    async getUsers() {
        const endpoint = "users/";

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
    async postUsers(userData, img) {
        const endpoint = "signup/";

        try {
            // Retrieve the token from AsyncStorage
            const token = await AsyncStorage.getItem('Token');

            // Check if the token exists
            if (!token) {
                console.error('No token found in AsyncStorage');
                throw new Error('Token is missing. Please log in again.');
            }

            // Create form data
            const formData = new FormData();
            if (userData.firstName) formData.append('first_name', userData.firstName);
            if (userData.role) formData.append('role', userData.role);
            if (userData.age) formData.append('age', userData.age);
            if (userData.gender) formData.append('gender', userData.gender);
            if (userData.workStartTime) formData.append('work_start_time', userData.workStartTime);
            if (userData.workEndTime) formData.append('work_end_time', userData.workEndTime);
            if (userData.AD) formData.append('AD', userData.AD);
            if (userData.JSHSHR) formData.append('JSHSHR', userData.JSHSHR);
            if (userData.phone) formData.append('phone', userData.phone);
            if (userData.city) formData.append('city', userData.city);
            if (userData.district) formData.append('district', userData.district);
            if (userData.neighborhood) formData.append('neighborhood', userData.neighborhood);
            if (userData.street) formData.append('street', userData.street);
            if (userData.salary) formData.append('salary', userData.salary);
            if (userData.KPI) formData.append('KPI', userData.KPI);
            if (userData.username) formData.append('username', userData.username);
            if (userData.password) formData.append('password', userData.password);
            if (img) {
                formData.append('img', {
                    uri: img,
                    name: 'profile_image.jpg', // File name
                    type: 'image/jpeg', // File type
                });
            }

            // Send POST request to the API
            const response = await client.post(BaseUrl + endpoint, formData, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2MDcyOTkxLCJpYXQiOjE3MzM0ODA5OTEsImp0aSI6IjNiYjY1MjI2ODdiNzQwNzM4M2ZhMDA1ZTNlOWU0YzFiIiwidXNlcl9pZCI6MX0.FYYrf9inY6yyuFcKMqAO8W1HeRIMbTpo0A-vWSfzM_Q`, // Use the retrieved token
                    'Content-Type': 'multipart/form-data', // Ensure correct content type
                },
            });

            // Return the successful response data
            return response.data;
        } catch (err) {
            // Enhanced error logging
            if (err.response) {
                console.error('Error posting user data:', err.response.data);
                console.error('Status code:', err.response.status);
                console.error('Headers:', err.response.headers);
            } else if (err.request) {
                console.error('No response received:', err.request);
            } else {
                console.error('Error setting up request:', err.message);
            }
            throw err;
        }
    }
    async getUserId(id) {
        const endpoint = `user/${id}/`;

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

export default new usersApi();
