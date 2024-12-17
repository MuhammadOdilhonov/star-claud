import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function EmployeeDailySalesChart({ data }) {
    // Calculate the width of the chart based on the number of labels
    const chartWidth = data.labels.length * 100; // Adjust this multiplier based on your bar width preference

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Ishchilar kunlik mahsulotlar sotgan yoki arendaga bergan</Text>
            <ScrollView horizontal>
                <BarChart
                    data={{
                        labels: data.labels,
                        datasets: [{ data: data.sales }],
                    }}
                    width={chartWidth}  // Dynamically set the width based on the number of labels
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
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        borderColor: "#A6A6A6",
        borderWidth: 1,
        marginBottom: 50,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
        textAlign: "center",
    },
});
