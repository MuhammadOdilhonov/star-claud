import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import categoryApi from '../../api/apiCollection/categoryApi';
import { useNavigation } from '@react-navigation/native';

export default function ViewAndAddCategory() {
    const navigation = useNavigation()
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        filterCategories(searchQuery);
    }, [searchQuery, categories]);

    function getCategories() {
        categoryApi.Category()
            .then((response) => {
                setCategories(response.data.results);
                setFilteredCategories(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            categoryApi
                .AddCategory(newCategory)
                .then(() => {
                    getCategories();
                    setNewCategory('');
                    setModalVisible(false);
                })
                .catch((error) => {
                    console.error('Error adding category:', error);
                });
        }
    };

    const handleDeleteCategory = () => {
        if (selectedCategory) {
            categoryApi
                .DeleteCategory(selectedCategory.id)
                .then(() => {
                    getCategories();
                    setDeleteModalVisible(false);
                })
                .catch((error) => {
                    console.error('Error deleting category:', error);
                });
        }
    };

    const filterCategories = (query) => {
        const filtered = categories.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Icon name="arrow-back-outline" size={24} color="#333" onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Ishchi qo'shish</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Icon name="add-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Search Input */}
            <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Qidirish"
            />

            {/* Category List */}
            {filteredCategories.length === 0 ? (
                <Text style={styles.noCategoryText}>Bunday kategoriya yo'q</Text>
            ) : (
                <FlatList
                    data={filteredCategories}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.item}>
                                {index + 1}. {item.name}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedCategory(item);
                                    setDeleteModalVisible(true);
                                }}
                            >
                                <Icon name="trash" size={20} color="#ff0000" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            {/* Modal for Adding Category */}
            <Modal
                visible={isModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Yangi kategoriya qo'shish</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={newCategory}
                            onChangeText={setNewCategory}
                            placeholder="Kategoriya nomini kiriting"
                        />
                        <Button title="Yaratish" onPress={handleAddCategory} />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Bekor qilish</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal for Deleting Category */}
            <Modal
                visible={deleteModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            "{selectedCategory?.name}" kategoriyasini o'chirmoqchimisiz?
                        </Text>
                        <Button title="Ha" onPress={handleDeleteCategory} />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setDeleteModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Yo'q</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerTitle: {
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
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    item: {
        fontSize: 16,
    },
    noCategoryText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
    closeButton: {
        marginTop: 10,
    },
    closeButtonText: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
});
