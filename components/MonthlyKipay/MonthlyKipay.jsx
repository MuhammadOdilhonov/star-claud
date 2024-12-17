import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MonthlyKipay() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [filteredReport, setFilteredReport] = useState(null);

    // Mock data for the reports
    const reportData = [
        { start: '2024-10-01', end: '2024-10-31', productsSold: 15, profitPercent: '2%', KPIreport : '300,000 So\'m',monthlySalary: '1,000,000 So\'m', totalProfit: '1,300,000 So\'m' },
        { start: '2024-11-01', end: '2024-11-30', productsSold: 12, profitPercent: '2%', KPIreport: '140,000 So\'m', monthlySalary: '1,000,000 So\'m', totalProfit: '1,140,000 So\'m' },
        // Add more mock entries as needed
    ];

    const handleSearch = () => {
        if (!startDate || !endDate) {
            Alert.alert("Xatolik", "Iltimos, sanalarni to'ldiring.");
            return;
        }

        setLoading(true);
        // Simulate an API call delay
        setTimeout(() => {
            const result = reportData.find(
                (report) => report.start === startDate && report.end === endDate
            );

            setLoading(false);
            if (result) {
                setFilteredReport(result);
            } else {
                Alert.alert("Xatolik", "Berilgan sanalar bo'yicha ma'lumot topilmadi.");
                setFilteredReport(null);
            }
        }, 2000);
    };

    const handleStartDateChange = (event, selectedDate) => {
        setShowStartPicker(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setStartDate(formattedDate);
        }
    };

    const handleEndDateChange = (event, selectedDate) => {
        setShowEndPicker(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setEndDate(formattedDate);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Icon name="arrow-back-outline" size={24} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Oylik Hisobot</Text>
            </View>

            {/* Date Inputs */}
            <View style={styles.dateContainer}>
                <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateInputWrapper}>
                    <TextInput
                        style={styles.dateInput}
                        placeholder="YYYY-MM-DD"
                        value={startDate}
                        editable={false}
                    />
                </TouchableOpacity>
                <Text style={styles.dateText}>-dan</Text>

                <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateInputWrapper}>
                    <TextInput
                        style={styles.dateInput}
                        placeholder="YYYY-MM-DD"
                        value={endDate}
                        editable={false}
                    />
                </TouchableOpacity>
                <Text style={styles.dateText}>-gacha</Text>
            </View>

            {/* Date Picker Modals */}
            {showStartPicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={handleStartDateChange}
                />
            )}
            {showEndPicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={handleEndDateChange}
                />
            )}

            {/* Search Button */}
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
                <Text style={styles.searchButtonText}>{loading ? 'Izlash...' : 'Izlash'}</Text>
            </TouchableOpacity>

            {/* Report Table */}
            {filteredReport && (
                <View style={styles.reportContainer}>
                    <Text style={styles.reportTitle}>{startDate} -dan, {endDate} -gacha</Text>
                    <View style={styles.reportRow}>
                        <Text style={styles.reportLabel}>- Neshta mahsulot sotgansiz</Text>
                        <Text style={styles.reportValue}>{filteredReport.productsSold}</Text>
                    </View>
                    <View style={styles.reportRow}>
                        <Text style={styles.reportLabel}>- Har mahsulotdan necha foiz KPI olsiz</Text>
                        <Text style={styles.reportValue}>{filteredReport.profitPercent}</Text>
                    </View>
                    <View style={styles.reportRow}>
                        <Text style={styles.reportLabel}>-KPI umumiy</Text>
                        <Text style={styles.reportValue}>{filteredReport.KPIreport}</Text>
                    </View>
                    <View style={styles.reportRow}>
                        <Text style={styles.reportLabel}>- Bir oyda oladigan oyligingiz</Text>
                        <Text style={styles.reportValue}>{filteredReport.monthlySalary}</Text>
                    </View>
                    <View style={styles.reportRow}>
                        <Text style={styles.reportLabel}>- Umumi  summa</Text>
                        <Text style={styles.reportValue}>{filteredReport.totalProfit}</Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        width: "75%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dateInputWrapper: {
        width: '35%',
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
        textAlign: 'center',
    },
    dateText: {
        fontSize: 14,
        color: '#333',
    },
    searchButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    reportContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
    },
    reportTitle: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    reportRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    reportLabel: {
        fontSize: 14,
        color: '#333',
    },
    reportValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
});
