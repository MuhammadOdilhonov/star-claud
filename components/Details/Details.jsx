import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DailyRevenueHoursChart from '../DailyRevenueHoursChart/DailyRevenueHoursChart';
import usersApi from '../../api/apiCollection/usersApi';

export default function Details() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const [selectedPeriod, setSelectedPeriod] = useState('Kunlik'); // Default period
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Loading indicator

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await usersApi.getUserId(id);
                setDetails(res.data); // Malumotlar muvaffaqiyatli olindi
            } catch (error) {
                console.error("Error fetching details:", error);
                setDetails(null); // Xatolik bo'lsa malumot yo'q deb belgilaymiz
            } finally {
                setIsLoading(false); // Yuklanish tugadi
            }
        };

        fetchDetails();
    }, [id]);

    // Data for the different time periods
    const Income = {
        dailyData: {
            labels: ["9:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
            revenue: [1, 2, 3, 5, 2, 3, 1],
        },
        weeklyData: {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            revenue: [12, 2, 1, 3, 4, 7, 12],
        },
        monthlyData: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            revenue: [4, 5, 32, 44, 55, 55, 33],
        },
        yearlyData: {
            labels: ["2020", "2021", "2022", "2023", "2024"],
            revenue: [120, 122, 211, 433, 1222],
        },
    };

    // Handles switching the selected time period
    const handleTimePeriodSelect = (period) => {
        setSelectedPeriod(period);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ishchilarni ko‘rish</Text>
            </View>

            {isLoading ? (
                <Text style={styles.loadingText}>Yuklanmoqda...</Text>
            ) : details ? (
                <>
                    {/* Profile Image */}
                    <Image
                        source={{
                            uri: details.img || 'https://cdn-icons-png.freepik.com/256/1077/1077114.png?semt=ais_hybrid',
                        }}
                        style={styles.image}
                    />

                    {/* Information Section */}
                    <View style={styles.info}>
                        <View style={styles.row}>
                            <Text style={styles.label}>F.I.O.</Text>
                            <Text style={styles.value}>{details.username || "Ma'lumot yo'q"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Yosh</Text>
                            <Text style={styles.value}>{details.age || "Ma'lumot yo'q"}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Jinsi</Text>
                            <Text style={styles.value}>{details.gender || "Ma'lumot yo'q"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Ish vaqti</Text>
                            <Text style={styles.value}>
                                {details.work_start_time && details.work_end_time
                                    ? `${details.work_start_time}-${details.work_end_time}`
                                    : "Ma'lumot yo'q"}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>AD</Text>
                            <Text style={styles.value}>{details.AD || "Ma'lumot yo'q"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>JSHSHR</Text>
                            <Text style={styles.value}>{details.JSHSHR || "Ma'lumot yo'q"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Shahar</Text>
                            <Text style={styles.value}>{details.city || "Ma'lumot yo'q"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Rayon</Text>
                            <Text style={styles.value}>{details.district || "Ma'lumot yo'q"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Mahalla</Text>
                            <Text style={styles.value}>{details.neighborhood || "Ma'lumot yo'q"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Ko`cha</Text>
                            <Text style={styles.value}>{details.street || "Ma'lumot yo'q"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>oylik</Text>
                            <Text style={styles.value}>{details.salary || "Ma'lumot yo'q"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>KPI</Text>
                            <Text style={styles.value}>{details.KPI || "Ma'lumot yo'q"}</Text>
                        </View>
                        {/* Qo'shimcha satrlar */}
                    </View>

                    {/* Statistics */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statsHeader}>
                            {["Kunlik", "Haftalik", "Oylik", "Yillik"].map((period) => (
                                <Text
                                    key={period}
                                    style={[
                                        styles.statsButton,
                                        selectedPeriod === period && styles.selectedButton,
                                    ]}
                                    onPress={() => handleTimePeriodSelect(period)}
                                >
                                    {period}
                                </Text>
                            ))}
                        </View>

                        {/* Chart Section */}
                        <View style={styles.chart}>
                            {selectedPeriod === 'Kunlik' && <DailyRevenueHoursChart data={Income.dailyData} />}
                            {selectedPeriod === 'Haftalik' && <DailyRevenueHoursChart data={Income.weeklyData} />}
                            {selectedPeriod === 'Oylik' && <DailyRevenueHoursChart data={Income.monthlyData} />}
                            {selectedPeriod === 'Yillik' && <DailyRevenueHoursChart data={Income.yearlyData} />}
                        </View>
                    </View>
                </>
            ) : (
                <Text style={styles.errorText}>Ma'lumot topilmadi</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: "10%",
        color: '#333',
    },
    image: {
        width: 170,
        height: 230,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    info: {
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    statsContainer: {
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 10,
    },
    statsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    statsButton: {
        fontSize: 16,
        color: '#007BFF',
        padding: 5,
    },
    selectedButton: {
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#007BFF',
    },
    chart: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
    },
    errorText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'red',
    },
});
