import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import usersApi from '../../api/apiCollection/usersApi';

const CustomCheckBox = ({ value, onValueChange }) => (
    <TouchableOpacity onPress={() => onValueChange(!value)} style={styles.checkbox}>
        <Icon name={value ? 'checkbox-outline' : 'square-outline'} size={24} color="#333" />
    </TouchableOpacity>
);

export default function AddWorker() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [img, setImage] = useState(null);

    // Individual state hooks for each form field
    const [firstName, setFirstName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [workStartTime, setWorkStartTime] = useState('');
    const [workEndTime, setWorkEndTime] = useState('');
    const [AD, setAD] = useState('');
    const [JSHSHR, setJSHSHR] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [allowance, setAllowance] = useState('');
    const [monthlySalary, setMonthlySalary] = useState('');
    const [salary, setSalary] = useState('');
    const [KPI, setKPI] = useState('');
    const [role, setRole] = useState('seller');

    // State for optional fields
    const [optionalCity, setOptionalCity] = useState(false);
    const [optionalDistrict, setOptionalDistrict] = useState(false);
    const [optionalNeighborhood, setOptionalNeighborhood] = useState(false);
    const [optionalStreet, setOptionalStreet] = useState(false);
    const [optionalAllowance, setOptionalAllowance] = useState(false);
    const [optionalMonthlySalary, setOptionalMonthlySalary] = useState(false);
    const [optionalKPI, setOptionalKPI] = useState(false);

    const [AdministratorAccess, setAdministratorAccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [2, 3],
            quality: 1,
        });

        if (result.assets[0].uri) {
            setImage(result.assets[0].uri);
        }
    };

    const handleInputChange = (setter, value) => {
        setter(value);
        setErrors((prevErrors) => ({ ...prevErrors, [setter.name]: false }));
    };

    const handleCheckBoxToggle = (setter, value) => {
        setter(!value);
    };

    const ChangeAdministrator = () => {
        const newAccess = !AdministratorAccess;
        setAdministratorAccess(newAccess);
        setRole(newAccess ? "admin" : "seller");
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        const formData = {
            firstName,
            age,
            gender,
            workStartTime,
            workEndTime,
            AD,
            JSHSHR,
            phone,
            username,
            password,
            city,
            district,
            neighborhood,
            street,
            allowance,
            monthlySalary,
            salary,
            KPI,
            role,
        };

        const optionalFields = {
            city: optionalCity,
            district: optionalDistrict,
            neighborhood: optionalNeighborhood,
            street: optionalStreet,
            allowance: optionalAllowance,
            monthlySalary: optionalMonthlySalary,
            KPI: optionalKPI,
        };

        Object.keys(formData).forEach((field) => {
            if (!formData[field] && !optionalFields[field]) {
                newErrors[field] = true;
                valid = false;
            }
        });

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setLoading(true);

            const formData = {
                firstName,
                age,
                gender,
                workStartTime,
                workEndTime,
                AD,
                JSHSHR,
                phone,
                username,
                password,
                city,
                district,
                neighborhood,
                street,
                allowance,
                monthlySalary,
                salary,
                KPI,
                role,
            };

            const optionalFields = {
                city: optionalCity,
                district: optionalDistrict,
                neighborhood: optionalNeighborhood,
                street: optionalStreet,
                allowance: optionalAllowance,
                monthlySalary: optionalMonthlySalary,
                KPI: optionalKPI,
            };

            const filteredData = { ...formData };
            Object.keys(optionalFields).forEach((field) => {
                if (optionalFields[field]) {
                    delete filteredData[field];
                }
            });

            try {
                const response = await usersApi.postUsers(filteredData, img);
                console.log(response);
                Alert.alert('Success', 'Worker created successfully!');
            } catch (err) {
                console.error('Error posting user data:', err);
                Alert.alert('Error', 'Failed to create worker. Please try again.');
            } finally {
                setLoading(false);
            }
        } else {
            Alert.alert('Error', 'Please fill all required fields.');
        }
    };

    const handleStartTimeChange = (event, selectedTime) => {
        setShowStartTimePicker(false);
        if (selectedTime) {
            const time = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setWorkStartTime(time);
        }
    };

    const handleEndTimeChange = (event, selectedTime) => {
        setShowEndTimePicker(false);
        if (selectedTime) {
            const time = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setWorkEndTime(time);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-back-outline" size={24} color="#333" onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Ishchi qo`shish</Text>
            </View>

            <View style={styles.userInfoHeader}>
                <TouchableOpacity onPress={pickImage} style={styles.imgPicker}>
                    {img ? (
                        <Image source={{ uri: img }} style={styles.img} />
                    ) : (
                        <View style={styles.imgPlaceholder}>
                            <Icon name="cloud-upload-outline" size={32} color="#888" />
                            <Text style={styles.imgText}>Rasmini yuklang</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <View style={styles.userInfoHeaderInput}>
                    {/* Full Name */}
                    <View style={styles.inputRow}>
                        <TextInput
                            style={[styles.input, errors.firstName && { borderColor: 'red' }]}
                            placeholder="F.S.SH."
                            placeholderTextColor="#888"
                            value={firstName}
                            onChangeText={(text) => handleInputChange(setFirstName, text)}
                        />
                    </View>

                    {/* Age */}
                    <View style={styles.inputRow}>
                        <TextInput
                            style={[styles.input, errors.age && { borderColor: 'red' }]}
                            placeholder="Yoshi"
                            placeholderTextColor="#888"
                            value={age}
                            onChangeText={(text) => handleInputChange(setAge, text)}
                        />
                    </View>

                    {/* Gender */}
                    <View style={styles.inputRow}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => setGender('Erkak')}>
                                <Icon
                                    name={gender === 'Erkak' ? 'radio-button-on' : 'radio-button-off'}
                                    size={24}
                                    color="#333"
                                />
                            </TouchableOpacity>
                            <Text>Erkak</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => setGender('Ayol')}>
                                <Icon
                                    name={gender === 'Ayol' ? 'radio-button-on' : 'radio-button-off'}
                                    size={24}
                                    color="#333"
                                />
                            </TouchableOpacity>
                            <Text>Ayol</Text>
                        </View>
                    </View>

                    {/* Start and End Time */}
                    <Text>Ish vaqt</Text>
                    <View style={styles.inputRow}>
                        <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                            <TextInput
                                style={[styles.input, errors.workStartTime && { borderColor: 'red' }]}
                                placeholder="-dan"
                                placeholderTextColor="#888"
                                value={workStartTime}
                                editable={false}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                            <TextInput
                                style={[styles.input, errors.workEndTime && { borderColor: 'red' }]}
                                placeholder="-gacha"
                                placeholderTextColor="#888"
                                value={workEndTime}
                                editable={false}
                            />
                        </TouchableOpacity>
                    </View>
                    {showStartTimePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={handleStartTimeChange}
                        />
                    )}
                    {showEndTimePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={handleEndTimeChange}
                        />
                    )}
                </View>
            </View>

            {/* ID Number */}
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, errors.AD && { borderColor: 'red' }]}
                    placeholder="ID Raqam"
                    placeholderTextColor="#888"
                    value={AD}
                    onChangeText={(text) => handleInputChange(setAD, text)}
                />
            </View>
            {/* JSHSHI */}
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, errors.JSHSHR && { borderColor: 'red' }]}
                    placeholder="JSHSHI"
                    keyboardType="phone-pad"
                    placeholderTextColor="#888"
                    value={JSHSHR}
                    onChangeText={(text) => handleInputChange(setJSHSHR, text)}
                />
            </View>

            {/* Phone Number */}
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, errors.phone && { borderColor: 'red' }]}
                    placeholder="Telefon raqam"
                    keyboardType="phone-pad"
                    placeholderTextColor="#888"
                    value={phone}
                    onChangeText={(text) => handleInputChange(setPhone, text)}
                />
            </View>

            {/* City */}
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, errors.city && { borderColor: 'red' }]}
                    placeholder="Shahar"
                    placeholderTextColor="#888"
                    value={city}
                    onChangeText={(text) => handleInputChange(setCity, text)}
                    editable={!optionalCity}
                />
                <CustomCheckBox
                    value={optionalCity}
                    onValueChange={() => handleCheckBoxToggle(setOptionalCity, optionalCity)}
                />
            </View>

            {/* District */}
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, errors.district && { borderColor: 'red' }]}
                    placeholder="Rayon"
                    placeholderTextColor="#888"
                    value={district}
                    onChangeText={(text) => handleInputChange(setDistrict, text)}
                    editable={!optionalDistrict}
                />
                <CustomCheckBox
                    value={optionalDistrict}
                    onValueChange={() => handleCheckBoxToggle(setOptionalDistrict, optionalDistrict)}
                />
            </View>

            {/* Neighborhood */}
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, errors.neighborhood && { borderColor: 'red' }]}
                    placeholder="Mahalla"
                    placeholderTextColor="#888"
                    value={neighborhood}
                    onChangeText={(text) => handleInputChange(setNeighborhood, text)}
                    editable={!optionalNeighborhood}
                />
                <CustomCheckBox
                    value={optionalNeighborhood}
                    onValueChange={() => handleCheckBoxToggle(setOptionalNeighborhood, optionalNeighborhood)}
                />
            </View>

            {/* Street */}
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, errors.street && { borderColor: 'red' }]}
                    placeholder="Ko`chasi va uy raqami"
                    placeholderTextColor="#888"
                    value={street}
                    onChangeText={(text) => handleInputChange(setStreet, text)}
                    editable={!optionalStreet}
                />
                <CustomCheckBox
                    value={optionalStreet}
                    onValueChange={() => handleCheckBoxToggle(setOptionalStreet, optionalStreet)}
                />
            </View>

            {/* Allowance */}
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, errors.allowance && { borderColor: 'red' }]}
                    placeholder="Surlanganmi?"
                    placeholderTextColor="#888"
                    value={allowance}
                    onChangeText={(text) => handleInputChange(setAllowance, text)}
                    editable={!optionalAllowance}
                />
                <CustomCheckBox
                    value={optionalAllowance}
                    onValueChange={() => handleCheckBoxToggle(setOptionalAllowance, optionalAllowance)}
                />
            </View>

            {/* Monthly Salary */}
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, errors.monthlySalary && { borderColor: 'red' }]}
                    placeholder="Oylalik ma yoki yo`q"
                    placeholderTextColor="#888"
                    value={monthlySalary}
                    onChangeText={(text) => handleInputChange(setMonthlySalary, text)}
                    editable={!optionalMonthlySalary}
                />
                <CustomCheckBox
                    value={optionalMonthlySalary}
                    onValueChange={() => handleCheckBoxToggle(setOptionalMonthlySalary, optionalMonthlySalary)}
                />
            </View>

            {/* Salary */}
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, errors.salary && { borderColor: 'red' }]}
                    placeholder="Oylik"
                    placeholderTextColor="#888"
                    value={salary}
                    onChangeText={(text) => handleInputChange(setSalary, text)}
                />
            </View>

            {/* KPI */}
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, errors.KPI && { borderColor: 'red' }]}
                    placeholder="KPI nechi foizda"
                    placeholderTextColor="#888"
                    value={KPI}
                    onChangeText={(text) => handleInputChange(setKPI, text)}
                    editable={!optionalKPI}
                />
                <CustomCheckBox
                    value={optionalKPI}
                    onValueChange={() => handleCheckBoxToggle(setOptionalKPI, optionalKPI)}
                />
            </View>

            {/* Username */}
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, errors.username && { borderColor: 'red' }]}
                    placeholder="Login yarating"
                    placeholderTextColor="#888"
                    value={username}
                    onChangeText={(text) => handleInputChange(setUsername, text)}
                />
            </View>

            {/* Password */}
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, errors.password && { borderColor: 'red' }]}
                    placeholder="Parol yarating"
                    placeholderTextColor="#888"
                    value={password}
                    onChangeText={(text) => handleInputChange(setPassword, text)}
                />
            </View>

            {/* Permission */}
            <View style={styles.additionalInfo}>
                <Text style={styles.additionalInfoText}>
                    Sizni bezovta qilmaslik uchun Mahsulot,Sotilgan mahsulotlarni ko`rish, Ko`p sotilvokan mahsulotni ko`rib turish, Ishchi qo`shish, Platformadan foydalanishi uchun tarifni yangilab turish uchun, Platforma haqida muammo bo`lsa bizbina bog`lanish uchun ruhsat berasizmi ?
                </Text>
                <CustomCheckBox
                    value={AdministratorAccess}
                    onValueChange={ChangeAdministrator}
                />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>{loading ? "Ishchi yaratish..." : "Ishchi yaratish"}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333',
    },
    userInfoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userInfoHeaderInput: {
        width: '60%',
    },
    imgPicker: {
        width: "35%",
        height: 220,
        alignItems: 'center',
        marginBottom: 20,
    },
    img: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    imgPlaceholder: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#EFEFEF',
    },
    imgText: {
        color: '#888',
        fontSize: 12,
        marginTop: 5,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 15,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        color: '#333',
    },
    checkbox: {
        paddingHorizontal: 10,
    },
    additionalInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    additionalInfoText: {
        flex: 1,
        fontSize: 13,
        color: '#666',
    },
    submitButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 50,
    },
    submitButtonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
