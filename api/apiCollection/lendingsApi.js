import AsyncStorage from '@react-native-async-storage/async-storage';
import client, { BaseUrl } from "../apiService";

class LendingsApi {
    async GetLendings() {
        const endpoint = "lendings/";

        try {
            // Retrieve the token from AsyncStorage
            const token = await AsyncStorage.getItem('Token');

            // Check if the token exists
            if (!token) {
                console.error('No token found in AsyncStorage');
                throw new Error('Token is missing. Please log in again.');
            }

            // API request
            const response = await client.get(
                `${BaseUrl}${endpoint}`,
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NTAyMTI2LCJpYXQiOjE3MzM5MTAxMjYsImp0aSI6IjhhYjAzYTE1ODMzNTRjNmVhMWY5MzY4ZDI2NWQzYjhlIiwidXNlcl9pZCI6MX0.Jq1pa8VPLhIPF5msKTeS6Fv123z3UPJRHaa2LAtiWzY`, // Correct Authorization format
                    },
                }
            );

            return response.data; // Successful response data
        } catch (error) {
            console.error("API Error:", error.message);
            throw error; // Re-throw error for further handling
        }
    }
    async GetLendingsId(id) {
        const endpoint = `lendings/${id}`;

        try {
            // Retrieve the token from AsyncStorage
            const token = await AsyncStorage.getItem('Token');

            // Check if the token exists
            if (!token) {
                console.error('No token found in AsyncStorage');
                throw new Error('Token is missing. Please log in again.');
            }

            // API request
            const response = await client.get(
                `${BaseUrl}${endpoint}`,
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NTAyMTI2LCJpYXQiOjE3MzM5MTAxMjYsImp0aSI6IjhhYjAzYTE1ODMzNTRjNmVhMWY5MzY4ZDI2NWQzYjhlIiwidXNlcl9pZCI6MX0.Jq1pa8VPLhIPF5msKTeS6Fv123z3UPJRHaa2LAtiWzY`, // Correct Authorization format
                    },
                }
            );

            return response.data; // Successful response data
        } catch (error) {
            console.error("API Error:", error.message);
            throw error; // Re-throw error for further handling
        }
    }
    async PostLendingsIdReturn(id) {
        const endpoint = `lendings/${id}/return_product/`;

        try {
            // Retrieve the token from AsyncStorage
            const token = await AsyncStorage.getItem('Token');

            // Check if the token exists
            if (!token) {
                console.error('No token found in AsyncStorage');
                throw new Error('Token is missing. Please log in again.');
            }

            // API request
            const response = await client.post(
                `${BaseUrl}${endpoint}`,
                {}, // Request body (empty object if no data is needed)
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NTAyMTI2LCJpYXQiOjE3MzM5MTAxMjYsImp0aSI6IjhhYjAzYTE1ODMzNTRjNmVhMWY5MzY4ZDI2NWQzYjhlIiwidXNlcl9pZCI6MX0.Jq1pa8VPLhIPF5msKTeS6Fv123z3UPJRHaa2LAtiWzY`, // Use the token retrieved from AsyncStorage
                    },
                }
            );

            return response.data; // Successful response data
        } catch (error) {
            // Handle 401 Unauthorized error
            if (error.response && error.response.status === 401) {
                Alert.alert('Authentication Error', 'Token is invalid or expired. Please log in again.');
            }

            throw error; // Re-throw error for further handling
        }
    }

    async AddLendings(formData) {
        const endpoint = "lendings/";
        try {
            // Tokenni AsyncStorage dan olish
            const token = await AsyncStorage.getItem('Token');
            if (!token) {
                console.error('Token topilmadi.');
                throw new Error('Token mavjud emas. Iltimos, qayta tizimga kiring.');
            }

            // FormData yaratish

            // API so'rovni yuborish
            const response = await client.post(
                `${BaseUrl}${endpoint}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NTAyMTI2LCJpYXQiOjE3MzM5MTAxMjYsImp0aSI6IjhhYjAzYTE1ODMzNTRjNmVhMWY5MzY4ZDI2NWQzYjhlIiwidXNlcl9pZCI6MX0.Jq1pa8VPLhIPF5msKTeS6Fv123z3UPJRHaa2LAtiWzY`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error("API Error:", error.message);
            throw error; // Xatolikni qayta uzatish
        }
    }
}

export default new LendingsApi();