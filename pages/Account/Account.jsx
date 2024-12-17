import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Account() {
    const [userRole, setUserRole] = useState(null);

    const navigation = useNavigation();

    // Foydalanuvchi ma'lumotlarini olish
    const getUserInfo = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("Person");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Ma'lumotni o'qishda xato:", error);
            return null;
        }
    };

    // Foydalanuvchini olish va rolni belgilash
    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfo();
            if (userInfo) {
                setUserRole(userInfo.user.role); // Foydalanuvchi rolini o'rnatish
            } else {
                console.log("Foydalanuvchi tizimga kirmagan");
            }
        };
        fetchUserInfo();
    }, []);

    // Foydalanuvchini chiqish qilish
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("Person");
            navigation.replace('Login'); // Login sahifasiga o'tkazish
        } catch (error) {
            console.error("Chiqishda xato:", error);
        }
    };

    // Menyu tugmasi
    const MenuButton = ({ title, onPress }) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
            <Icon name="chevron-forward-outline" size={20} color="#333" />
        </TouchableOpacity>
    );

    // Chiqish tugmasi
    const LogoutButton = () => (
        <TouchableOpacity style={styles.logoutButton} onPress={() => {
            Alert.alert(
                "Chiqish",
                "Siz tizimdan chiqmoqchimisiz?",
                [
                    { text: "Bekor qilish", style: "cancel" },
                    { text: "Ha", onPress: handleLogout }
                ]
            );
        }}>
            <Text style={styles.logoutText}>Chiqish</Text>
            <Icon name="exit-outline" size={20} color="#FF0000" />
        </TouchableOpacity>
    );

    // Rolga asoslangan menyu
    const renderMenuByRole = () => {
        if (userRole === 'DIRECTOR') {
            return (
                <ScrollView contentContainerStyle={styles.buttonsContainer}>
                    <MenuButton title="Hisobot" onPress={() => navigation.navigate('Statistics')} />
                    <MenuButton title="Sotilgan mahsulotlar" onPress={() => navigation.navigate('ProductsSold')} />
                    <MenuButton title="Arendaga berilganlar" onPress={() => navigation.navigate('RentedItems')} />
                    <MenuButton title="Categoryalar" onPress={() => navigation.navigate('ViewAndAddCategory')} />
                    <MenuButton title="Mahsulotlar" onPress={() => navigation.navigate('ProductInventory')} />
                    <MenuButton title="Xodimlar" onPress={() => navigation.navigate('WorkersList')} />
                    <MenuButton title="Sozlamalar" onPress={() => navigation.navigate('UserProfile')} />
                    <MenuButton title="Tarif" />
                    <MenuButton title="Biz bilan bog'lanish" />
                    <LogoutButton />
                </ScrollView>
            );
        } else if (userRole === 'ADMIN') {
            return (
                <ScrollView contentContainerStyle={styles.buttonsContainer}>
                    <MenuButton title="Hisobot" onPress={() => navigation.navigate('MonthlyKipay')} />
                    <MenuButton title="Sotilgan mahsulotlar" onPress={() => navigation.navigate('ProductsSold')} />
                    <MenuButton title="Arendaga berilganlar" onPress={() => navigation.navigate('RentedItems')} />
                    <MenuButton title="Categoryalar" onPress={() => navigation.navigate('ViewAndAddCategory')} />
                    <MenuButton title="Mahsulotlar" onPress={() => navigation.navigate('ProductInventory')} />
                    <MenuButton title="Xodimlar" onPress={() => navigation.navigate('WorkersList')} />
                    <MenuButton title="Sozlamalar" onPress={() => navigation.navigate('UserProfile')} />
                    <MenuButton title="Tarif" />
                    <MenuButton title="Biz bilan bog'lanish" />
                    <LogoutButton />
                </ScrollView>
            );
        } else if (userRole === 'SELLER') {
            return (
                <ScrollView contentContainerStyle={styles.buttonsContainer}>
                    <MenuButton title="Hisobot" onPress={() => navigation.navigate('MonthlyKipay')} />
                    <MenuButton title="Arendaga berilganlar" onPress={() => navigation.navigate('RentedItems')} />
                    <MenuButton title="Sozlamalar" onPress={() => navigation.navigate('UserProfile')} />
                    <LogoutButton />
                </ScrollView>
            );
        } else {
            return <Text style={styles.noAccessText}>Tizimga kirishingiz kerak</Text>;
        }
    };

    return (
        <View style={styles.container}>
            {/* Profil bo'limi */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s' }}
                    style={styles.profileImage}
                />
                <View style={styles.statusIndicator} />
            </View>

            {/* Menyu bo'limi */}
            {renderMenuByRole()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    statusIndicator: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: '#00FF00',
        position: 'absolute',
        bottom: 5,
        right: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    buttonsContainer: {
        width: '90%',
        alignItems: 'center',
        paddingBottom: 30
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 5,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 5,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF0000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    logoutText: {
        fontSize: 16,
        color: '#FF0000',
    },
    noAccessText: {
        fontSize: 16,
        color: '#777',
    },
});
