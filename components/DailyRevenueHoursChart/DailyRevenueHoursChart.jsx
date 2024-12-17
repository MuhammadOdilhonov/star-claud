import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function DailyRevenueHoursChart({ data }) {

    const chartWidth = (data.labels.length * 100); 
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Daromat</Text>
            <ScrollView horizontal>
                <BarChart
                    data={{
                        labels: data.labels,
                        datasets: [
                            {
                                data: data.revenue,
                            },
                        ],
                    }}
                    width={chartWidth}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: { borderRadius: 8 },
                        barPercentage: 0.5,
                    }}
                    style={{ marginVertical: 8, borderRadius: 8 }}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        height:300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        borderColor: "#A6A6A6",
        borderWidth: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
        textAlign: "center",
    },
});
