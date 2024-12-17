import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usersApi from '../../api/apiCollection/usersApi';
import WorkerCard from '../WorkerCard/WorkerCard'; // WorkerCard komponentini import qilish
import { Ionicons } from '@expo/vector-icons';

const WorkersList = () => {
    const navigation = useNavigation();
    const [userRole, setUserRole] = useState(null);
    const [workers, setWorkers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false); // Refresh uchun holat

    useEffect(() => {
        fetchUserInfo();
        fetchWorkers();
    }, []);

    // API orqali ishchilar ro'yxatini olish
    const fetchWorkers = async () => {
        try {
            const res = await usersApi.getUsers();
            setWorkers(res.data.results);
        } catch (error) {
            console.error('API orqali ishchilarni olishda xato:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // API orqali yangilash (RefreshControl)
    const onRefresh = async () => {
        setIsRefreshing(true);
        try {
            const res = await usersApi.getUsers();
            setWorkers(res.data.results);
        } catch (error) {
            console.error('Maʼlumotni yangilashda xato:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    // Foydalanuvchi ma'lumotlarini olish
    const getUserInfo = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('Person');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Ma'lumotni o'qishda xato:", error);
            return null;
        }
    };

    // Foydalanuvchi rolini olish
    const fetchUserInfo = async () => {
        const userInfo = await getUserInfo();
        if (userInfo) {
            setUserRole(userInfo.user.role);
        } else {
            console.log('Foydalanuvchi tizimga kirmagan');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            {userRole === 'DIRECTOR' && (
                <View style={styles.header}>
                    <Icon
                        name="arrow-back-outline"
                        size={24}
                        color="#333"
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.headerTitle}>Xodimlar</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('AddWorker')}
                    >
                        <Icon name="add-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
            {userRole === 'ADMIN' && (
                <View style={styles.headerA}>
                    <Icon
                        name="arrow-back-outline"
                        size={24}
                        color="#333"
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.headerATitle}>Xodimlar</Text>
                </View>
            )}

            <View style={styles.toInform}>
                <View style={styles.item}>
                    <Ionicons name="shield-checkmark" size={24} color="#007BFF" />
                    <Text style={styles.text}>Admin</Text>
                </View>
                <View style={styles.item}>
                    <Ionicons name="person" size={24} color="#007BFF" />
                    <Text style={styles.text}>Sotuvchi</Text>
                </View>
            </View>

            {/* Workers List yoki Loader */}
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007BFF" />
                    <Text style={styles.loadingText}>Xodimlar kutilmoqda...</Text>
                </View>
            ) : workers.length > 0 ? (
                <FlatList
                    data={workers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <WorkerCard worker={item} />}
                    contentContainerStyle={styles.list}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>Xodimlar hali yo'q</Text>
                </View>
            )}
        </View>
    );
};

export default WorkersList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    headerA: {
        width: '65%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerATitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        backgroundColor: '#007BFF',
        borderRadius: 50,
        padding: 8,
        marginTop: 5,
    },
    toInform: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10
    },
    text: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#666',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 18,
        color: '#666',
    },
    list: {
        paddingBottom: 20,
    },
});
