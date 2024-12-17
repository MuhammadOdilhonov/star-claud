import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import DailyRevenueHoursChart from '../DailyRevenueHoursChart/DailyRevenueHoursChart';
import RentalPercentageStatisticsChart from '../RentalPercentageStatisticsChart/RentalPercentageStatisticsChart';
import EmployeeDailySalesChart from '../EmployeeDailySalesChart/EmployeeDailySalesChart';
import { useNavigation } from '@react-navigation/native';

export default function Statistics() {
    const navigation = useNavigation();
    const [selectedPeriod, setSelectedPeriod] = useState("Kunlik"); // Default time period
    const [selectedYear, setSelectedYear] = useState(null); // Default selected year
    const [DataYear, setDataYear] = useState(null); // Default selected year

    // Data o'zgarsa birinchi yilni avtomatik tanlash
    useEffect(() => {
        if (selectedPeriod === 'Yillik' && DataStatistics.Income.yearlyData.datayearly.length > 0) {
            const firstYearData = DataStatistics.Income.yearlyData.datayearly[0];
            setSelectedYear(firstYearData.year);
            setDataYear(firstYearData);

        }
    }, [selectedPeriod]);

    const handleTimePeriodSelect = (period) => {
        setSelectedPeriod(period);
        setSelectedYear(null); // Clear selected year when period changes
    };

    const handleYearSelect = (yearData) => {
        setSelectedYear(yearData.year);
        setDataYear(yearData);
    };

    const DataStatistics = {
        Income: {
            dailyData: {
                labels: ["9:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
                revenue: [10000, 20000, 30000, 25000, 32000, 30000, 20000],
            },
            weeklyData: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                revenue: [100000, 120000, 150000, 140000, 180000, 160000, 170000],
            },
            monthlyData: {
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
                revenue: [1200000, 1500000, 1300000, 1400000, 1600000, 1500000, 1700000, 1500000, 1300000, 1400000, 1200000, 1500000, 1300000, 1400000, 1600000, 1500000, 1700000, 1500000, 1300000, 1400000, 1200000, 1500000, 1300000, 1400000, 1600000, 1500000, 1700000, 1500000, 1300000, 1400000, 1400000],
            },
            yearlyData: { 
                datayearly: [
                    {
                        year: "2021",
                        status: "Stable",
                        months: {
                            labels :["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",],
                            revenue : [15000000, 17000000, 18000000, 19000000, 20000000, 15000000, 17000000, 18000000, 19000000, 20000000, 19000000, 20000000],
                    },
                    },
                    {
                        year: "2022",
                        status: "Stable",
                        months: {
                            labels :["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",],
                            revenue: [17000000, 15000000, 18000000, 19000000, 20000000, 15000000, 17000000, 18000000, 19000000, 20000000, 19000000, 20000000],
                    },
                    },
                    {
                        year: "2023",
                        status: "Stable",
                        months: {
                            labels : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",],
                            revenue: [19000000, 17000000, 18000000, 15000000, 20000000, 15000000, 17000000, 18000000, 19000000, 20000000, 19000000, 20000000],
                        },
                    },
                    {
                        year: "2024",
                        status: "Stable",
                        months: {
                            labels : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",],
                            revenue: [20000000, 17000000, 18000000, 19000000, 15000000, 15000000, 17000000, 18000000, 19000000, 20000000, 19000000, 20000000],
                        },
                    },
                ],
            },
        },

        RentalNumber: {
            DailyRentalData: {
                data: [
                    { name: "ta", population: 5, color: "#FF6384" },
                    { name: "ta", population: 2, color: "#36A2EB" },
                    { name: "ta", population: 4, color: "#FFCE56" },
                    { name: "ta", population: 4, color: "#4BC0C0" }
                ],
                dataInfo: [
                    { name: "25% to'lov qilganla", color: "#FF6384" },
                    { name: "50% to'lov qilganla", color: "#36A2EB" },
                    { name: "75% to'lov qilganla", color: "#FFCE56" },
                    { name: "100% to'lov qilganla", color: "#4BC0C0" },
                ],
                totalSold: 16
            },
            WeeklyRentalData: {
                data: [
                    { name: "ta", population: 10, color: "#FF6384" },
                    { name: "ta", population: 4, color: "#36A2EB" },
                    { name: "ta", population: 8, color: "#FFCE56" },
                    { name: "ta", population: 8, color: "#4BC0C0" }
                ],
                dataInfo: [
                    { name: "25% to'lov qilganla", color: "#FF6384" },
                    { name: "50% to'lov qilganla", color: "#36A2EB" },
                    { name: "75% to'lov qilganla", color: "#FFCE56" },
                    { name: "100% to'lov qilganla", color: "#4BC0C0" },
                ],
                totalSold: 30
            },
            MonthlyRentalData: {
                data: [
                    { name: "ta", population: 20, color: "#FF6384" },
                    { name: "ta", population: 5, color: "#36A2EB" },
                    { name: "ta", population: 7, color: "#FFCE56" },
                    { name: "ta", population: 10, color: "#4BC0C0" }
                ],
                dataInfo: [
                    { name: "25% to'lov qilganla", color: "#FF6384" },
                    { name: "50% to'lov qilganla", color: "#36A2EB" },
                    { name: "75% to'lov qilganla", color: "#FFCE56" },
                    { name: "100% to'lov qilganla", color: "#4BC0C0" },
                ],
                totalSold: 42
            },
            YearlyRentalData: {
                data: [
                    { name: "ta", population: 22, color: "#FF6384" },
                    { name: "ta", population: 7, color: "#36A2EB" },
                    { name: "ta", population: 10, color: "#FFCE56" },
                    { name: "ta", population: 15, color: "#4BC0C0" }
                ],
                dataInfo: [
                    { name: "25% to'lov qilganla", color: "#FF6384" },
                    { name: "50% to'lov qilganla", color: "#36A2EB" },
                    { name: "75% to'lov qilganla", color: "#FFCE56" },
                    { name: "100% to'lov qilganla", color: "#4BC0C0" },
                ],
                totalSold: 54
            },
        },
        SalesOfWorkers: {
            DailyEmployeeData: {
                labels: ["Durdona", "Nigora", "Hilola", "Nasiba", "Mubina", "Nelufar", "Mushtariy"],
                sales: [8, 15, 0, 10, 12, 13, 9],
            },
            WeeklyEmployeeData: {
                labels: ["Durdona", "Nigora", "Hilola", "Nasiba", "Mubina", "Nelufar", "Mushtariy"],
                sales: [9, 25, 3, 14, 55, 14, 40],
            },
            MonthlyEmployeeData: {
                labels: ["Durdona", "Nigora", "Hilola", "Nasiba", "Mubina", "Nelufar", "Mushtariy"],
                sales: [30, 26, 4, 16, 56, 23, 44],
            },
            YearlyEmployeeData: {
                labels: ["Durdona", "Nigora", "Hilola", "Nasiba", "Mubina", "Nelufar", "Mushtariy"],
                sales: [12, 35, 7, 30, 62, 43, 49],
            },
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                    <Icon name="arrow-back-outline" size={26} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Kunlik, Haftalik, Oylik, Yillik Hisobot</Text>
            </View>

            {/* Time Period Buttons */}
            <View style={styles.timePeriodContainer}>
                <TimePeriodButton title="Kunlik" selected={selectedPeriod === 'Kunlik'} onPress={() => handleTimePeriodSelect('Kunlik')} />
                <TimePeriodButton title="Haftalik" selected={selectedPeriod === 'Haftalik'} onPress={() => handleTimePeriodSelect('Haftalik')} />
                <TimePeriodButton title="Oylik" selected={selectedPeriod === 'Oylik'} onPress={() => handleTimePeriodSelect('Oylik')} />
                <TimePeriodButton title="Yillik" selected={selectedPeriod === 'Yillik'} onPress={() => handleTimePeriodSelect('Yillik')} />
            </View>
            {selectedPeriod === 'Yillik' && (
                <View style={styles.timePeriodContainer}>
                    {DataStatistics.Income.yearlyData.datayearly.map((yearData, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.timeButton,
                                selectedYear === yearData.year && styles.selectedButton,
                            ]}
                            onPress={() => handleYearSelect(yearData)}
                        >
                            <Text style={[styles.timeButtonText, selectedYear === yearData.year && styles.selectedButtonText]}>{yearData.year}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* Charts */}
            {selectedPeriod === 'Kunlik' && (
                <>
                    <DailyRevenueHoursChart data={DataStatistics.Income.dailyData} />
                    <RentalPercentageStatisticsChart data={DataStatistics.RentalNumber.DailyRentalData} />
                    <EmployeeDailySalesChart data={DataStatistics.SalesOfWorkers.DailyEmployeeData} />
                </>
            )}

            {selectedPeriod === 'Haftalik' && (
                <>
                    <DailyRevenueHoursChart data={DataStatistics.Income.weeklyData} />
                    <RentalPercentageStatisticsChart data={DataStatistics.RentalNumber.WeeklyRentalData} />
                    <EmployeeDailySalesChart data={DataStatistics.SalesOfWorkers.MonthlyEmployeeData} />
                </>
            )}

            {selectedPeriod === 'Oylik' && (
                <>
                    <DailyRevenueHoursChart data={DataStatistics.Income.monthlyData} />
                    <RentalPercentageStatisticsChart data={DataStatistics.RentalNumber.MonthlyRentalData} />
                    <EmployeeDailySalesChart data={DataStatistics.SalesOfWorkers.WeeklyEmployeeData} />
                </>
            )}

            { selectedYear == 2021 && (
                <>
                    <DailyRevenueHoursChart data={DataYear.months} />
                    <RentalPercentageStatisticsChart data={DataStatistics.RentalNumber.YearlyRentalData} />
                    <EmployeeDailySalesChart data={DataStatistics.SalesOfWorkers.YearlyEmployeeData} />
                </>
            )}
            {selectedYear == 2022 && (
                <>
                    <DailyRevenueHoursChart data={DataYear.months} />
                    <RentalPercentageStatisticsChart data={DataStatistics.RentalNumber.YearlyRentalData} />
                    <EmployeeDailySalesChart data={DataStatistics.SalesOfWorkers.YearlyEmployeeData} />
                </>
            )}
            {selectedYear == 2023 && (
                <>
                    <DailyRevenueHoursChart data={DataYear.months} />
                    <RentalPercentageStatisticsChart data={DataStatistics.RentalNumber.YearlyRentalData} />
                    <EmployeeDailySalesChart data={DataStatistics.SalesOfWorkers.YearlyEmployeeData} />
                </>
            )}
            {selectedYear == 2024 && (
                <>
                    <DailyRevenueHoursChart data={DataYear.months} />
                    <RentalPercentageStatisticsChart data={DataStatistics.RentalNumber.YearlyRentalData} />
                    <EmployeeDailySalesChart data={DataStatistics.SalesOfWorkers.YearlyEmployeeData} />
                </>
            )}
        </ScrollView>
    );
}

// Time Period Button Component
const TimePeriodButton = ({ title, selected, onPress }) => (
    <TouchableOpacity style={[styles.timeButton, selected && styles.selectedButton]} onPress={onPress}>
        <Text style={[styles.timeButtonText, selected && styles.selectedButtonText]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
    },
    timePeriodContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: "wrap",
    },
    timeButton: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        marginLeft: 10,
        marginTop: 10,
    },
    selectedButton: {
        backgroundColor: '#FFCC00',
    },
    timeButtonText: {
        fontSize: 14,
        color: '#333',
    },
    selectedButtonText: {
        color: '#fff',
    },
});
