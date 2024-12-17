import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, FlatList, RefreshControl, Text } from 'react-native';
import Card from '../../components/CardHome/CardHome';
import Category from '../../components/Category/Category';
import categoryApi from '../../api/apiCollection/categoryApi';
import ProductApi from '../../api/apiCollection/ProductApi';

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('Hammasi');
    const [dataCategories, setDataCategories] = useState([]);
    const [dataProducts, setDataProducts] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(false); // API xatosi uchun state

    // Kategoriyalarni olish
    const fetchCategories = async () => {
        try {
            const response = await categoryApi.Category();
            const categories = response.data.results;
            const allCategories = [{ name: 'Hammasi', id: '0' }, ...categories];
            setDataCategories(allCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setApiError(true);
        }
    };

    // Mahsulotlarni olish
    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await ProductApi.GetProduct();
            const products = response.results;
            setDataProducts(products);
            setApiError(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setDataProducts([]);
            setApiError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
        if (selectedCategory === 'Hammasi') {
            fetchProducts();
        }
    }, [selectedCategory]);

    const handleCategoryPress = async (categoryName) => {
        setSelectedCategory(categoryName);
        if (categoryName === 'Hammasi') {
            await fetchProducts();
        } else {
            setDataProducts([]);
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchCategories();
        if (selectedCategory === 'Hammasi') {
            await fetchProducts();
        }
        setIsRefreshing(false);
    };

    const renderContent = () => {
        if (apiError) {
            // API xatosi bo'lganida xabar
            return (
                <View style={styles.messageContainer}>
                    <Text style={styles.errorMessage}>
                        Servisda xatolik bor. Bir ozdan so'ng qayta urinib ko'ring yoki ilovani qayta ishga tushiring.
                    </Text>
                </View>
            );
        }

        if (isLoading) {
            return (
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>Mahsulot kutilmoqda...</Text>
                </View>
            );
        }

        if (dataProducts.length === 0) {
            return (
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>Mahsulot hozircha yo'q</Text>
                </View>
            );
        }

        return (
            <FlatList
                data={dataProducts}
                renderItem={({ item }) => <Card data={item} />}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.cardList}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                }
            />
        );
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/Logo.png')} style={styles.logo} />
            </View>

            <View>
                {/* Category Component */}
                <Category
                    categories={dataCategories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategoryPress}
                />
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>{renderContent()}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        paddingTop: 40,
        flex: 1,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        width: 100,
        height: 50,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    cardList: {
        paddingBottom: 20,
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },
    errorMessage: {
        fontSize: 16,
        color: '#FF0000',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});
