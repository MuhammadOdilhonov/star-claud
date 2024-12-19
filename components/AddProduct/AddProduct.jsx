import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import ProductApi from '../../api/apiCollection/ProductApi';
import categoryApi from '../../api/apiCollection/categoryApi';

export default function AddProduct() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [productName, setProductName] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(null); // Tanlangan kategoriya ID
    const [price, setPrice] = useState(0);
    const [rentalPrice, setRentalPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [rentalOption, setRentalOption] = useState("RENT"); // True for "arendaga beriladi"

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true); // Loading holatini boshqarish
                const response = await categoryApi.Category();
                const categoryOptions = response.data.results.map((category) => ({
                    label: category.name,
                    value: category.id,
                }));
                setCategories(categoryOptions);
            } catch (error) {
                console.error("Kategoriyalarni olishda xato:", error);
                Alert.alert("Xato", "Kategoriyalarni olishda xatolik yuz berdi.");
            } finally {
                setLoading(false); // Loading holatini to'g'ri boshqarish
            }
        };

        fetchCategories();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [2, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const isValid = rentalOption === "RENT"
            ? productName && categoryId && rentalPrice && location && description
            : productName && categoryId && price && quantity && location && description;

        if (isValid) {
            try {
                await ProductApi.AddProduct({
                    name: productName,
                    description: description,
                    price: price,
                    category: categoryId, // Tanlangan kategoriya ID
                    img: image,
                    location: location,
                    quantity: quantity,
                    rental_price: rentalPrice,
                    choice: rentalOption,
                });
                Alert.alert('Success', 'Mahsulot muvaffaqiyatli yaratildi!');
                navigation.goBack();
            } catch (error) {
                console.error("Mahsulot yaratishda xato:", error);
                Alert.alert('Error', 'Mahsulot yaratishda xatolik yuz berdi.');
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
            Alert.alert('Error', 'Iltimos, barcha maydonlarni to\'ldiring');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-back-outline" size={24} color="#333" onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Mahsulot qo`shish</Text>
            </View>

            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Icon name="cloud-upload-outline" size={50} color="#888" />
                        <Text style={styles.imageText}>Rasimni yuklang</Text>
                    </View>
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Mahsulot nomini kiriting"
                value={productName}
                onChangeText={setProductName}
            />

            <View style={styles.pickerWrapper}>
                <RNPickerSelect
                    onValueChange={(value) => setCategoryId(value)}
                    items={categories}
                    placeholder={{
                        label: 'Kategoriyani tanlang',
                        value: null,
                    }}
                    value={categoryId}
                />
            </View>

            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[styles.optionButton, rentalOption === "RENT" && styles.optionButtonSelected]}
                    onPress={() => setRentalOption("RENT")}
                >
                    <Text style={styles.optionButtonText}>Arendaga beriladi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.optionButton, rentalOption === "SELL" && styles.optionButtonSelected]}
                    onPress={() => setRentalOption("SELL")}
                >
                    <Text style={styles.optionButtonText}>Faqat sotiladi</Text>
                </TouchableOpacity>
            </View>

            {rentalOption === "RENT" ? (
                <TextInput
                    style={styles.input}
                    placeholder="Arenda narxi"
                    value={rentalPrice}
                    onChangeText={setRentalPrice}
                    keyboardType="numeric"
                />
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Mahsulot narxi"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mahsulot soni"
                        value={quantity}
                        onChangeText={setQuantity}
                        keyboardType="numeric"
                    />
                </>
            )}

            <TextInput
                style={styles.input}
                placeholder="Mahsulot qayerda turishi"
                value={location}
                onChangeText={setLocation}
            />

            <TextInput
                multiline
                numberOfLines={5}
                style={{ ...styles.input, height: 100, textAlignVertical: 'top' }}
                placeholder="Mahsulot haqida ma'lumot"
                value={description}
                onChangeText={setDescription}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} disabled={loading}>
                <Text style={styles.submitButtonText}>{loading ? "Mahsulot yaratish..." : "Mahsulot yaratish"}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        width: "75%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    imagePicker: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 250,
        margin: 'auto',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    imagePlaceholder: {
        alignItems: 'center',
    },
    imageText: {
        color: '#888',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    optionButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f0f0f0',
    },
    optionButtonSelected: {
        backgroundColor: '#FFD700',
        borderColor: '#FFD700',
    },
    optionButtonText: {
        color: '#333',
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
