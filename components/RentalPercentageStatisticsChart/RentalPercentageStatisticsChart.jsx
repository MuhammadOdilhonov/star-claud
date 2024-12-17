import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function RentalPercentageStatisticsChart({ data }) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Arenda foizlari statistika</Text>
            <Text style={styles.centerText}>Neshta sotildi: {data.totalSold}</Text>
            <PieChart
                data={data.data}

                width={screenWidth - 40}
                height={220}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
            <View style={styles.legendContainer}>
                {
                    data.dataInfo.map((res, i) => {
                        return (
                            <View key={i} style={styles.legendItem}>
                                <View style={[styles.legendColor, { backgroundColor: res.color }]} />
                                <Text style={styles.legendText}>{res.name}</Text>
                            </View>
                        )
                    })
                }
            </View>

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
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
        color: '#333',
        textAlign: "center",
    },
    centerText: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 10,
    },
    legendContainer: {
        marginTop: 15,
        width: '100%',
        display: "flex",
        flexDirection: "row",        // Changed this line to display legends in a row
        justifyContent: "space-evenly", // Evenly space out the items
        flexWrap: 'wrap',           // Allow the items to wrap if they don't fit in the row
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    legendColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    legendText: {
        fontSize: 12,
        color: '#7F7F7F',
    },
});

