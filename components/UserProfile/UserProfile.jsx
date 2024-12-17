import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UserProfile() {
    const navigation = useNavigation()
    const [isPasswordChangeEnabled, setIsPasswordChangeEnabled] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isButtonActive, setIsButtonActive] = useState(false);

    const handlePasswordToggle = () => {
        setIsPasswordChangeEnabled(!isPasswordChangeEnabled);
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setIsButtonActive(!isButtonActive); // Button is always active when password fields are enabled
    };

    const handleSave = () => {
        if (!newPassword || !confirmPassword) {
            setError('Iltimos, barcha maydonlarni to\'ldiring');
        } else if (newPassword === confirmPassword) {
            console.log('Password changed successfully');
            handlePasswordToggle(); // Reset fields and toggle password change off
            navigation.goBack()
        } else {
            setError('Parolni to`gri kiriting');
        }
    };

    const handleInputChange = (value, field) => {
        if (field === 'newPassword') {
            setNewPassword(value);
        } else if (field === 'confirmPassword') {
            setConfirmPassword(value);
        }
        setError(''); // Clear the error on input change
    };



    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profilePictureContainer}>
                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s' }}
                    style={styles.profilePicture}
                />
            </View>

            <View style={styles.userInfo}>
                <View style={styles.infoColumn}>
                    <Text style={styles.label}>F.I.O.</Text>
                    <Text>User Full Name</Text>
                    <Text style={styles.label}>Jinsi</Text>
                    <Text>Erkak</Text>
                    <Text style={styles.label}>AD1234567</Text>
                    <Text>AD1234567</Text>
                    <Text style={styles.label}>Shahar</Text>
                    <Text>Toshkent sh.</Text>
                    <Text style={styles.label}>Mahalla</Text>
                    <Text>Qo'lon m.</Text>
                    <Text style={styles.label}>Oylik</Text>
                    <Text>1.000.000</Text>
                </View>

                <View style={styles.infoColumn}>
                    <Text style={styles.label}>Yosh</Text>
                    <Text>17</Text>
                    <Text style={styles.label}>Ish vahti</Text>
                    <Text>9:00 - 18:00</Text>
                    <Text style={styles.label}>JSHSHR</Text>
                    <Text>5000000000000000</Text>
                    <Text style={styles.label}>Rayo `n</Text>
                    <Text>Shayxontohur r.</Text>
                    <Text style={styles.label}>Ko`cha uy qrami</Text>
                    <Text>Baliqcha 14a</Text>
                    <Text style={styles.label}>KPI nechа foiz</Text>
                    <Text>12%</Text>
                </View>
            </View>

            <View style={styles.passwordToggleContainer}>
                <Text style={styles.label}>Parolni o`zgartirish</Text>
                <TouchableOpacity onPress={handlePasswordToggle}>
                    <Icon name={isPasswordChangeEnabled ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
                </TouchableOpacity>
            </View>

            {isPasswordChangeEnabled && (
                <View style={styles.passwordContainer}>
                    {error && !newPassword && <Text style={styles.errorText}>{error}</Text>}
                    <TextInput
                        style={[styles.input, error && !newPassword ? styles.inputError : null]}
                        placeholder="Yangi parol"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={(value) => handleInputChange(value, 'newPassword')}
                    />

                    {error && newPassword !== confirmPassword && <Text style={styles.errorText}>{error}</Text>}
                    <TextInput
                        style={[styles.input, error && newPassword !== confirmPassword ? styles.inputError : null]}
                        placeholder="Parolni qaytaring"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={(value) => handleInputChange(value, 'confirmPassword')}
                    />
                </View>
            )}

            <TouchableOpacity
                style={[styles.saveButton, isButtonActive ? styles.buttonActive : styles.buttonInactive]}
                onPress={handleSave}
                disabled={!isButtonActive}
            >
                <Text style={styles.saveButtonText}>Saqlash</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: "center",
        width: '100%',
        marginBottom: 20,
    },
    infoColumn: {
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    passwordToggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    passwordContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    saveButton: {
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    buttonActive: {
        backgroundColor: '#FFD700',
    },
    buttonInactive: {
        backgroundColor: '#ccc',
    },
    saveButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});
