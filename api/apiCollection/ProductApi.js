import AsyncStorage from '@react-native-async-storage/async-storage';
import client, { BaseUrl } from "../apiService";

class ProductApi {
    async GetProduct() {
        const endpoint = "products/?status=AVAILABLE";

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
    async GetRentedProduct() {
        const endpoint = "products/?status=LENT_OUT";

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
    async GetProductId(id) {
        const endpoint = `products/${id}/`;

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
    async DeleteProduct(id) {
        const endpoint = `products/${id}/`;

        try {
            // Retrieve the token from AsyncStorage
            const token = await AsyncStorage.getItem('Token');

            // Check if the token exists
            if (!token) {
                console.error('No token found in AsyncStorage');
                throw new Error('Token is missing. Please log in again.');
            }

            // API request
            const response = await client.delete(
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
    async AddProduct(props) {
        const endpoint = "products/";
        try {
            // Tokenni AsyncStorage dan olish
            const token = await AsyncStorage.getItem('Token');
            if (!token) {
                console.error('Token topilmadi.');
                throw new Error('Token mavjud emas. Iltimos, qayta tizimga kiring.');
            }

            // FormData yaratish
            const formData = new FormData();
            formData.append('name', props.name);
            formData.append('description', props.description);
            formData.append('price', props.price);
            formData.append('category', props.category);
            formData.append('location', props.location);
            formData.append('quantity', props.quantity);
            formData.append('rental_price', props.rental_price);
            formData.append('status', 'AVAILABLE');
            formData.append('choice', props.choice);
            formData.append('lend_count', 0);
            if (props.img) {
                formData.append('img', {
                    uri: props.img,
                    name: 'product_image.jpg', // Fayl nomi
                    type: 'image/jpeg', // Fayl turi
                });
            }

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

export default new ProductApi();
