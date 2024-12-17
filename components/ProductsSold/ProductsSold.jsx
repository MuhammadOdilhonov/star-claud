import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Card from '../CardHome/CardHome'; // Assuming Card component is in the same folder

export default function ProductsSold() {
    const navigation = useNavigation();
    // Sample data for multiple products
    const sampleData = [
        {
            id: 1,
            name: 'Laptop',
            usage: 'Texnika',
            mainPrice: '2000 USD',
            rentPrice: '150 USD / oy',
            Image: 'https://via.placeholder.com/100',
            soldOut: true,  // Item is sold
            rentedOut: false,  // Item is not rented
        },
        {
            id: 2,
            name: 'Projector',
            usage: 'Texnika',
            mainPrice: '500 USD',
            rentPrice: '30 USD / oy',
            Image: 'https://via.placeholder.com/100',
            soldOut: true,  // Item is not sold
            rentedOut: false,  // Item is rented
        },
        {
            id: 3,
            name: 'Camera',
            usage: 'Texnika',
            mainPrice: '1200 USD',
            rentPrice: '80 USD / oy',
            Image: 'https://via.placeholder.com/100',
            soldOut: true,  // Item is not sold
            rentedOut: false,  // Item is not rented
        },
    ];


    return (
        <ScrollView contentContainerStyle={{ padding: 10 }}>
            <View style={styles.header}>
                <Icon name="arrow-back-outline" size={24} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Sotilgan mahsulotlar</Text>
            </View>
            {sampleData.map((item) => (
                <Card key={item.id} data={item} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        width: "78%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
