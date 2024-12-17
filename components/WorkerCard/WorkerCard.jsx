import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const WorkerCard = ({ worker }) => {
    const navigation = useNavigation();
    const defaultImage = 'https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid'; // Placeholder image

    // Ikonani tanlash
    const getRoleIcon = () => {
        if (worker.role === 'ADMIN') {
            return 'shield-checkmark'; // Admin ikonkasi
        } else if (worker.role === 'SELLER') {
            return 'person'; // Seller ikonkasi
        }
        return null; // Belgisiz holat
    };


    return (
        <View style={styles.card}>
            {/* O'ng yuqori burchakdagi belgi */}
            <View style={styles.iconContainer}>
                {getRoleIcon() && (
                    <Ionicons name={getRoleIcon()} size={24} color="#007BFF" />
                )}
            </View>
            {/* Rasm */}
            <Image
                source={{ uri: worker.img || defaultImage }}
                style={styles.image}
            />
            {/* Ma'lumot */}
            <View style={styles.info}>
                <Text style={styles.name}>{worker.username}</Text>
                <Text style={styles.details}>
                    <Text style={styles.label}>Sotgan: </Text>
                    {worker.sold || 'Maʼlumot yoʻq'}
                </Text>
                <Text style={styles.details}>
                    <Text style={styles.label}>KPI: </Text>
                    {worker.KPI || 'Maʼlumot yoʻq'}
                </Text>
                <Text style={styles.details}>
                    <Text style={styles.label}>Oylik: </Text>
                    {worker.salary || 'Maʼlumot yoʻq'}
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Details', { id: worker.id })}
                >
                    <Text style={styles.buttonText}>To‘liq ma’lumot →</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default WorkerCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    iconContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    details: {
        fontSize: 14,
        color: '#666666',
        marginVertical: 2,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
    },
    button: {
        marginTop: 8,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
