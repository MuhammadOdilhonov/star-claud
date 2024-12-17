import React, { useState, useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Card from '../CardHome/CardHome'; // Assuming Card component is in the same folder
import ProductApi from '../../api/apiCollection/ProductApi';
import lendingsApi from '../../api/apiCollection/lendingsApi';

export default function RentedItems() {
    const navigation = useNavigation();
    const [renteLendings, setRenteLendings] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // State for handling pull-to-refresh

    // Fetch rented products on component mount
    useEffect(() => {
        fetchRenteLendings();
    }, []);

    const fetchRenteLendings = async () => {
        try {
            const res = await lendingsApi.GetLendings();
            setRenteLendings(res.results || []); // Ensure we set the results or an empty array

        } catch (error) {
            console.error('Error fetching rented products:', error);
        }
    };

    // Handle pull-to-refresh action
    const handleRefresh = async () => {
        setRefreshing(true); // Start refreshing
        await fetchRenteLendings(); // Re-fetch products
        setRefreshing(false); // Stop refreshing
    };

    // Delete functionality
    const onDelete = async (id) => {
        try {
            await ProductApi.DeleteProduct(id);
            fetchRenteLendings(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back-outline" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Arendaga berilganlar</Text>
            </View>

            {/* FlatList with RefreshControl */}
            <FlatList
                data={renteLendings}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Card data={item} onDelete={() => onDelete(item.id)} />}
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh} // Trigger pull-to-refresh
                    />
                }
                ListEmptyComponent={
                    <Text style={styles.emptyMessage}>
                        Arendaga berilgan mahsulotlar mavjud emas.
                    </Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    header: {
        width: "75%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#888',
    },
});
