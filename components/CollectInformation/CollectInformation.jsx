import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ScrollView,
    Modal,
    ActivityIndicator,
    Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import lendingsApi from '../../api/apiCollection/lendingsApi';

export default function CollectInformation() {
    const route = useRoute();
    const navigation = useNavigation();
    const { id, rental_price } = route.params;

    const [totalAmount, setTotalAmount] = useState(rental_price);
    const [imageUri, setImageUri] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [selectedPercentage, setSelectedPercentage] = useState(null);
    const [calculatedAmount, setCalculatedAmount] = useState(null);

    const [fields, setFields] = useState({
        name: '',
        passport: '',
        jshshr: '',
        address: '',
        phone1: '',
        phone2: '',
        pickupDate: '',
        returnDate: ''
    });

    const [datePicker, setDatePicker] = useState({
        show: false,
        mode: 'date',
        field: ''
    });

    const handleChange = (field, value) => {
        setFields({ ...fields, [field]: value });
        setFormErrors({ ...formErrors, [field]: false });
    };

    const handleDateChange = (event, selectedDate) => {
        setDatePicker({ ...datePicker, show: false });
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD format
            handleChange(datePicker.field, formattedDate);
        }
    };

    const showDatePicker = (field) => {
        setDatePicker({ show: true, mode: 'date', field });
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Ruxsat", "Ilova galereyaga kirish uchun ruxsat so'raydi");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [5, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setFormErrors({ ...formErrors, imageUri: false });
        }
    };

    const validateFields = () => {
        const errors = {};

        Object.keys(fields).forEach(field => {
            if (!fields[field].trim()) errors[field] = true;
        });

        if (!imageUri) {
            errors.imageUri = true;
        }

        if (!selectedPercentage) {
            errors.selectedPercentage = true;
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePercentagePress = (percentage) => {
        setSelectedPercentage(percentage);
        const calculated = (totalAmount * percentage) / 100;
        setCalculatedAmount(calculated);
        setFormErrors({ ...formErrors, selectedPercentage: false });
    };

    const handleSubmit = () => {
        if (validateFields()) {
            setIsModalVisible(true);
        }
    };

    const confirmSubmission = () => {
        setIsLoading(true);
        const Percent = `${selectedPercentage}%`
        const formData = new FormData();
        formData.append('product', id);
        formData.append('borrower_name', fields.name);
        formData.append('AD', fields.passport);
        formData.append('JSHSHR', fields.jshshr);
        formData.append('adress', fields.address);
        formData.append('phone', fields.phone1);
        formData.append('spare_phone', fields.phone2);
        formData.append('borrow_date', fields.pickupDate);
        formData.append('return_date', fields.returnDate);
        formData.append('percentage', Percent);
        formData.append('const', calculatedAmount);
        if (imageUri) {
            formData.append('pledge', {
                uri: imageUri,
                name: 'product_image.jpg', // Fayl nomi
                type: 'image/jpeg', // Fayl turi
            });
        }
        
        lendingsApi.AddLendings(formData)
        .then((res)=>{
            setIsModalVisible(true);
            setIsLoading(false);
            navigation.navigate('Home');
            Alert.alert('Success', 'Mahsulot muvaffaqiyatli arendaga berildi!');
        })
        .catch(error=>{
            console.log(error);
            
        })
    };

    return (
        <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
            <TextInput
                style={[styles.input, formErrors.totalAmount && styles.errorInput]}
                placeholder="Jami summa"
                keyboardType="numeric"
                value={totalAmount.toString()}
                editable={false}
            />
            <TextInput
                style={[styles.input, formErrors.name && styles.errorInput]}
                placeholder="F.I.O."
                value={fields.name}
                onChangeText={(text) => handleChange('name', text)}
            />
            <TextInput
                style={[styles.input, formErrors.passport && styles.errorInput]}
                placeholder="AD1234567"
                value={fields.passport}
                onChangeText={(text) => handleChange('passport', text)}
            />
            <TextInput
                style={[styles.input, formErrors.jshshr && styles.errorInput]}
                placeholder="JSHSHR"
                keyboardType="phone-pad"
                value={fields.jshshr}
                onChangeText={(text) => handleChange('jshshr', text)}
            />
            <TextInput
                style={[styles.input, formErrors.address && styles.errorInput]}
                placeholder="Yashash M."
                value={fields.address}
                onChangeText={(text) => handleChange('address', text)}
            />
            <TextInput
                style={[styles.input, formErrors.phone1 && styles.errorInput]}
                placeholder="+998999999999"
                keyboardType="phone-pad"
                value={fields.phone1}
                onChangeText={(text) => handleChange('phone1', text)}
            />
            <TextInput
                style={[styles.input, formErrors.phone2 && styles.errorInput]}
                placeholder="+998999999999"
                keyboardType="phone-pad"
                value={fields.phone2}
                onChangeText={(text) => handleChange('phone2', text)}
            />

            <TouchableOpacity
                style={[styles.input, styles.dateInput, formErrors.pickupDate && styles.errorInput]}
                onPress={() => showDatePicker('pickupDate')}
            >
                <Text style={{ color: fields.pickupDate ? '#000' : '#999' }}>
                    {fields.pickupDate || 'Olib ketish sanasi'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.input, styles.dateInput, formErrors.returnDate && styles.errorInput]}
                onPress={() => showDatePicker('returnDate')}
            >
                <Text style={{ color: fields.returnDate ? '#000' : '#999' }}>
                    {fields.returnDate || 'Olib kelish sanasi'}
                </Text>
            </TouchableOpacity>

            {datePicker.show && (
                <DateTimePicker
                    value={new Date()}
                    mode={datePicker.mode}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                />
            )}
            <View>
                <View style={styles.percentageContainer}>
                    {[25, 50, 75, 100].map((percentage) => (
                        <TouchableOpacity
                            key={percentage}
                            style={[
                                styles.percentageButton,
                                selectedPercentage === percentage && styles.selectedPercentageButton,
                                formErrors.selectedPercentage && !selectedPercentage && styles.errorInput
                            ]}
                            onPress={() => handlePercentagePress(percentage)}
                        >
                            <Text style={styles.percentageText}>{percentage}%</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Natija"
                    value={calculatedAmount ? `${calculatedAmount}` : ''}
                    editable={false}
                />
            </View>
            <TouchableOpacity
                style={[styles.uploadContainer, formErrors.imageUri && styles.errorInput]}
                onPress={pickImage}
            >
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                ) : (
                    <>
                        <Ionicons name="cloud-upload-outline" size={50} color="#000" />
                        <Text style={styles.uploadText}>Rasimni yuklang</Text>
                    </>
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Arendaga berish</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal transparent={true} visible={isModalVisible} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Malumotlar to'g'rimi?</Text>
                        <Text style={styles.modalText}>F.I.O.: {fields.name}</Text>
                        <Text style={styles.modalText}>Passport: {fields.passport}</Text>
                        <Text style={styles.modalText}>JSHSHR: {fields.jshshr}</Text>
                        <Text style={styles.modalText}>Yashash manzili: {fields.address}</Text>
                        <Text style={styles.modalText}>Telefon1: {fields.phone1}</Text>
                        <Text style={styles.modalText}>Telefon2: {fields.phone2}</Text>
                        <Text style={styles.modalText}>Olib ketish sanasi: {fields.pickupDate}</Text>
                        <Text style={styles.modalText}>Olib kelish sanasi: {fields.returnDate}</Text>
                        <Text style={styles.modalText}>Arenda narxi: {totalAmount}</Text>
                        <Text style={styles.modalText}>Nechi foyz tashab ketvoti: {selectedPercentage}%</Text>
                        <Text style={styles.modalText}>Summa tashlab ketvokani: {calculatedAmount}</Text>
                        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={confirmSubmission}>
                                {isLoading ? (
                                    <ActivityIndicator size="large" color="black" />
                                ) : (
                                    <Text style={styles.modalButtonText}>Ha</Text>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Yo'q</Text>
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
        flex: 1,
        padding: 20,
        paddingTop: 30,
        backgroundColor: '#f9f9f9',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        marginVertical: 10,
        fontSize: 16,
        backgroundColor: '#ffffff',
    },
    errorInput: {
        borderColor: '#e74c3c',
        backgroundColor: '#fdecea',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    toggleButton: {
        padding: 12,
        backgroundColor: '#e1e1e1',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    selectedButton: {
        backgroundColor: '#FFCC00',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    toggleText: {
        fontSize: 16,
        color: '#333',
    },
    selectedText: {
        fontWeight: 'bold',
        color: '#000',
    },
    percentageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
    },
    percentageButton: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        minWidth: 60,
        alignItems: 'center',
    },
    selectedPercentageButton: {
        backgroundColor: '#FFCC00',
        borderColor: '#FFCC00',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    percentageText: {
        fontSize: 16,
        color: '#333',
    },
    uploadContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        backgroundColor: '#fafafa',
        height: 250,
        marginVertical: 20,
    },
    imagePreview: {
        width: 300,
        height: 200,
        borderRadius: 10,
    },
    uploadText: {
        color: '#666',
        fontSize: 16,
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: '#FFCC00',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    submitText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        // alignItems: 'center',
        shadowColor: '#000', // Qora shadov
        shadowOffset: { width: 0, height: 10 }, // Vertikal shadov
        shadowOpacity: 0.3, // Shadovning shaffofligi
        shadowRadius: 20, // Shadovning yoyilish radiusi
        elevation: 10, // Android uchun shadov qalinligi
    },
    modalText: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
        textAlign: 'left',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    modalButton: {
        backgroundColor: '#FFCC00',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        minWidth: 80,
        alignItems: 'center',
    },
    modalButtonText: {
        fontSize:22,
        fontWeight: 'bold',
        color: '#000',
    },
    loadingContainer: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

