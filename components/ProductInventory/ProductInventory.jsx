import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Card from '../CardHome/CardHome';
import ProductApi from '../../api/apiCollection/ProductApi';

export default function ProductInventory() {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true); // Yuklanish holati
    const [error, setError] = useState(false); // Xatolik holati

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(false); // Xatolikni tozalash
            const res = await ProductApi.GetProduct();

            if (res && res.results && res.results.length > 0) {
                setCategories(res.results);


            } else {
                setCategories([]); // Bo'sh massiv
            }
        } catch (error) {
            // Faqat logda qoldiramiz, ekranda texnik xato ko'rsatmaymiz
            console.error('API xatosi:', error.message || error);

            setError(true); // Foydalanuvchiga umumiy xabar ko'rsatish uchun
            setCategories([]); // Ma'lumotni tozalash
        } finally {
            setLoading(false);
        }
    };

    function onDelete(id) {
        ProductApi.DeleteProduct(id)
        .then((res) => {
            fetchCategories()
        })
    }


    const onRefresh = async () => {
        setRefreshing(true);
        await fetchCategories();
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon
                    name="arrow-back-outline"
                    size={24}
                    color="#333"
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTitle}>Mahsulotlar</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddProduct')}
                >
                    <Icon name="add-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Kontent */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Mahsulot kutilmoqda...</Text>
                </View>
            ) : error ? (
                // Xatolik xabarini chiqarish
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                        Servisda xatolik bor. Bir ozdan so‘ng urinib ko‘ring yoki boshqatdan kirib chiqing.
                    </Text>
                </View>
            ) : categories.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>API'da hech qanday Mahsulot topilmadi</Text>
                </View>
            ) : (
                <FlatList
                    data={categories}
                    renderItem={({ item }) => <Card data={item} onDelete={onDelete} />}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.cardList}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        backgroundColor: '#007BFF',
        borderRadius: 50,
        padding: 8,
        marginTop: 5,
    },
    cardList: {
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#FF5555',
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});
