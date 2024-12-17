import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import lendingsApi from '../../api/apiCollection/lendingsApi';

export default function ReturningRental() {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [renteLendingsId, setRenteLendingsId] = useState(null);


    useEffect(() => {
        fetchRenteLendingsId()
    }, []);
    const fetchRenteLendingsId = async () => {
        try {
            const res = await lendingsApi.GetLendingsId(id);
            setRenteLendingsId(res || {}); // Ensure we set the results or an empty array
            console.log(res);

        } catch (error) {
            console.error('Error fetching rented products:', error);
        }
    };

    const handleCloseRental = () => {
        setModalVisible(true);
    };

    const handleConfirm = (id) => {
        console.log("Product ID:", id);

        lendingsApi.PostLendingsIdReturn(id)
            .then((res) => {
                console.log("Response:", res);
                setModalVisible(false);
                Alert.alert('Success', 'Mahsulot muvaffaqiyatli qaytarildi!');
                navigation.goBack(); // Replace 'Home' with your
            })
            .catch(error => {
                Alert.alert('Error', 'Mahsulotni qaytarishda xatolik yuz berdi.');
            });
    };


    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Icon name="arrow-back-outline" size={24} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Arendaga berilgan mahsulot</Text>
            </View>

            {/* Product Details */}
            <View style={styles.productDetails}>
                <Image
                    source={
                        renteLendingsId
                            ? { uri: renteLendingsId.product_detail.img }
                            : { uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' } // Fallback image
                    }
                    style={styles.productImage} />
                <View style={styles.productInfo}>
                    <Text style={styles.productTitle}>{renteLendingsId ? renteLendingsId.product_detail.name : 'Malumot yo`q'}</Text>
                    <Text style={styles.productSubtitle}>Категория: {renteLendingsId ? renteLendingsId.product_detail.category : 'Malumot yo`q'}</Text>
                    <Text style={styles.productSubtitle}>Arenda narxi: {renteLendingsId ? renteLendingsId.product_detail.rental_price : 'Malumot yo`q'}</Text>
                </View>
            </View>

            {/* Customer Details */}
            <Text style={styles.sectionTitle}>Tepadagi mahsulotni olib ketgan shaxs</Text>
            <View style={styles.customerDetails}>
                <Text style={styles.detailText}><Text style={styles.label}>F.I.O.: </Text> {renteLendingsId ? renteLendingsId.borrower_name : "Malumot yo`q"}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>AD1234567: </Text> {renteLendingsId ? renteLendingsId.AD : "Malumot yo`q"}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>JSHSHR: </Text> {renteLendingsId ? renteLendingsId.JSHSHR : "Malumot yo`q"}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Yashash M.: </Text> {renteLendingsId ? renteLendingsId.adress : "Malumot yo`q"}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>1.Tel: </Text> {renteLendingsId ? renteLendingsId.phone : "Malumot yo`q"}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>2.Tel: </Text> {renteLendingsId ? renteLendingsId.spare_phone : "Malumot yo`q"}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Olib ketgan vaqt: </Text> {renteLendingsId ? renteLendingsId.borrow_date : "Malumot yo`q"}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Olib kelish kerak bo`lgan vaqt: </Text> {renteLendingsId ? renteLendingsId.return_date : "Malumot yo`q"}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Necha foizini berib ketgan: </Text> {renteLendingsId ? renteLendingsId.percentage : "Malumot yo`q"}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Berib ketgan summa: </Text> {renteLendingsId ? renteLendingsId.amount_given : "Malumot yo`q"}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Necha foizini Qolgan: </Text> {renteLendingsId ? renteLendingsId.remaining_percentage : "Malumot yo`q"}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Qolgan summa: </Text> {renteLendingsId ? renteLendingsId.amount_remaining : "Malumot yo`q"}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Berib ketilgan zaklad: </Text></Text>
            </View>

            {/* Placeholder Image */}
            <Image
                source={
                    renteLendingsId
                        ? { uri: renteLendingsId.pledge }
                        : { uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' } // Fallback image
                }
                style={styles.depositImage} />

            {/* Close Rental Button */}
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseRental}>
                <Text style={styles.closeButtonText}>Arendani yopish</Text>
            </TouchableOpacity>

            {/* Confirmation Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Qolib ketgan pulni to‘lig‘ini oldingizmi?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => { handleConfirm(renteLendingsId.id) }}>
                                <Text style={styles.buttonText}>Ha</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleCancel}>
                                <Text style={styles.buttonText}>Yo'q</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    header: {
        width: "85%",
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
    productDetails: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    productImage: {
        width: 80,
        height: "100%",
        borderRadius: 10,
    },
    productInfo: {
        marginLeft: 15,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productSubtitle: {
        fontSize: 16,
        color: '#555',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    customerDetails: {
        marginBottom: 20,
    },
    detailText: {
        fontSize: 16,
        marginVertical: 2,
    },
    label: {
        fontWeight: 'bold',
    },
    depositImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    closeButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    closeButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
