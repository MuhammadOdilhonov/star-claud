import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Card({ data, onDelete }) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const getUserInfo = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("Person");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Ma'lumotni o'qishda xato:", error);
            return null;
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const userInfo = await getUserInfo();
        if (userInfo) {
            setUserRole(userInfo.user.role);
        } else {
            console.log("Foydalanuvchi tizimga kirmagan");
        }
    };

    const handleBuyPress = () => {
        setModalVisible(true);
    };

    const handleConfirmBuy = () => {
        setModalVisible(false);
        navigation.navigate('Home');
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    function FullInformationFunction(id) {
        navigation.navigate('FullInformation', { id: id || 'not_available' });
    }

    function CollectInformationFunction(id, rental_price) {
        navigation.navigate('CollectInformation', { id: id, rental_price: rental_price });
    }

    function RentReturn(id) {
        navigation.navigate('ReturningRental', { id: id || 'not_available' });
    }

    return (
        <View style={styles.card}>
            {(userRole === 'DIRECTOR' || userRole === 'ADMIN') && (
                <TouchableOpacity style={styles.deleteIcon} onPress={() => onDelete(data?.id)}>
                    <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
            )}

            {data?.status === "LENT_OUT" || data?.product_detail?.status == 'LENT_OUT' && <Text style={styles.statusText}>Arendaga berilgan</Text>}
            {data?.status === "NOT_AVAILABLE" && <Text style={styles.statusText}>Sotilgan</Text>}

            <View style={styles.cardContainer}>
                <Image
                    source={{
                        uri: data?.img || data?.product_detail?.img || 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                    }}
                    style={styles.cardImage}
                />

                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{data?.name || data?.product_detail?.name || 'Nom mavjud emas'}</Text>

                    <Text style={styles.cardText}>
                        Kategoriya: <Text style={styles.boldText}>{data?.category_name || data?.product_detail?.category || 'Maʼlumot mavjud emas'}</Text>
                    </Text>

                    {data?.price > 0 && (
                        <Text style={styles.cardText}>
                            Asosiy narxi: <Text style={styles.boldText}>{data?.price || 'Nomaʼlum'}</Text>
                        </Text>
                    )}

                    {data?.quantity != 0 && data?.quantity >= 0 ? (
                        <Text style={styles.cardText}>
                            Miqdori: <Text style={styles.boldText}>{data?.quantity}</Text>
                        </Text>
                    ) : data?.product_detail?.rental_price || data.rental_price ? (

                        <Text style={styles.cardText}>
                            Arenda narxi: <Text style={styles.boldText}>{data?.rental_price || data?.product_detail?.rental_price || 'Nomaʼlum'}</Text>
                        </Text>
                    ) : (
                        <Text style={styles.cardText}>
                            Miqdori: <Text style={styles.boldText}>Nomaʼlum</Text>
                        </Text>
                    )}

                    {data?.lend_count !== undefined && data?.lend_count !== null ? (
                        <Text style={styles.cardText}>
                            Arenda soni: <Text style={styles.boldText}>{data.lend_count}</Text>
                        </Text>
                    ) : (
                        <Text style={styles.cardText}>
                            Arenda soni: <Text style={styles.boldText}>Nomaʼlum</Text>
                        </Text>
                    )}


                    <Text style={styles.cardText}>
                        Qayerda turibti: <Text style={styles.boldText}>{data?.location || 'Nomaʼlum'}</Text>
                    </Text>

                    {(data?.status === "LENT_OUT" || data?.product_detail?.status == 'LENT_OUT') && (
                        <TouchableOpacity onPress={() => RentReturn(data?.id)} style={styles.rentButton}>
                            <Text style={styles.buttonText}>Arendani qaytarish</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {data?.status === "AVAILABLE" && !(data?.soldOut || data?.rentedOut) && (
                <View style={styles.buttonContainer}>
                    {data?.price > 0 ? (
                        <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
                            <Text style={styles.buttonText}>Sotib yuborish</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => CollectInformationFunction(data?.id, data?.rental_price)} style={styles.rentButton}>
                            <Text style={styles.buttonText}>Arendaga berish</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.detailsButton} onPress={() => FullInformationFunction(data?.id)}>
                        <Text style={styles.buttonText}>To'liq ma'lumot →</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Siz rostan ham mahsulotni sottingizmi?</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={handleConfirmBuy}>
                                <Text style={styles.buttonText}>Ha</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleCancel}>
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
    card: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'center',
        position: 'relative',
    },
    deleteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    cardContainer: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
    },
    cardImage: {
        width: 100,
        height: "auto",
        borderRadius: 10,
        marginRight: 15,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
        color: '#000',
    },
    statusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    buyButton: {
        height: 35,
        backgroundColor: '#00CC66',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 5,
        flex: 1,
    },
    rentButton: {
        backgroundColor: '#FFCC00',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 5,
        flex: 1,
    },
    detailsButton: {
        backgroundColor: '#3E64FF',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        flex: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
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
