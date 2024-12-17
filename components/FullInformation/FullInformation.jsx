import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import ProductApi from '../../api/apiCollection/ProductApi';

export default function FullInformation({ navigation, route }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    // Fetch product details by ID
    useEffect(() => {
        if (route.params && route.params.id) {
            ProductApi.GetProductId(route.params.id)
                .then((res) => {
                    setProduct(res);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching product:", error);
                    setLoading(false);
                });
        }
    }, [route.params]);

    const handleActionPress = () => setModalVisible(true); // Handles SELL and RENT actions
    const handleConfirmAction = () => {
        setModalVisible(false);
        navigation.navigate('Home'); // Navigate to Home screen
    };
    const handleCancel = () => setModalVisible(false);
    const handleRentPress = () => navigation.navigate('CollectInformation', { id: product?.id });

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Mahsulot ma'lumotlari yuklanmadi!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.img }} style={styles.image} />
            <Text style={styles.title}>{product.name}</Text>
            {product.choice === 'SELL' ? (
                <>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Narxi:</Text>
                        <Text style={styles.value}>{product.price} so'm</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Miqdori:</Text>
                        <Text style={styles.value}>{product.quantity} dona</Text>
                    </View>
                </>
            ) : (
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Arenda Narxi:</Text>
                    <Text style={styles.value}>{product.rental_price} so'm</Text>
                </View>
            )}
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Kategoriya:</Text>
                <Text style={styles.value}>{product.category_name}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Qayerda turibti:</Text>
                <Text style={styles.value}>{product.location}</Text>
            </View>
            <Text style={styles.sectionTitle}>To'liq ma'lumot:</Text>
            <Text style={styles.description}>{product.description}</Text>

            {/* Action Button */}
            <View style={styles.buttonContainer}>
                {product.choice === 'SELL' ? (
                    <TouchableOpacity style={[styles.button, styles.sellButton]} onPress={handleActionPress}>
                        <Text style={styles.buttonText}>Sotib yuborish</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={[styles.button, styles.rentButton]} onPress={handleRentPress}>
                        <Text style={styles.buttonText}>Arendaga berish</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Confirmation Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            {product.choice === 'SELL'
                                ? 'Siz rostan ham mahsulotni sotib yubordingizmi?'
                                : 'Siz rostan ham mahsulotni arendaga berdingizmi?'}
                        </Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleConfirmAction}
                            >
                                <Text style={styles.buttonText}>Ha</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={handleCancel}
                            >
                                <Text style={styles.buttonText}>Yo'q</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    image: {
        width: 200,
        height: 300,
        borderRadius: 8,
        marginBottom: 15,
        marginTop: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap:"wrap",
        width: '80%',
        marginBottom: 5,
    },
    label: {
        fontSize: 18,
        color: '#333',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionTitle: {
        fontSize: 22,
        color: '#aaa',
        marginTop: 20,
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },
    button: {
        width:"100%",
        paddingVertical: 10,
        borderRadius: 8,
    },
    sellButton: {
        backgroundColor: '#4CAF50', // Green button
    },
    rentButton: {
        backgroundColor: '#FFCC00', // Yellow button
    },
    buttonText: {
        textAlign:"center",
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
    },
    cancelButton: {
        backgroundColor: '#FF5722',
    },
});
