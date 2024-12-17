import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function Category({ categories, selectedCategory, onCategorySelect }) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            <View style={styles.categoryContainer}>
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category.name && styles.categoryButtonSelected
                        ]}
                        onPress={() => onCategorySelect(category.name)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === category.name && styles.categoryTextSelected
                            ]}
                        >
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    categoryScroll: {
        width: '100%',
        height: 50,
        marginBottom: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    categoryButton: {
        paddingHorizontal: 15,
        height: 40,
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 5,
    },
    categoryButtonSelected: {
        borderColor: '#FF5733', // Orange color for selected category
    },
    categoryText: {
        fontSize: 14,
        color: 'gray',
    },
    categoryTextSelected: {
        color: '#FF5733',
    },
});
