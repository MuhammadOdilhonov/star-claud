import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import loginApi from '../../api/apiCollection/loginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ username: '', password: '' });
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(false);

    // Animation references
    const logoPosition = useRef(new Animated.Value(0)).current;
    const inputsPosition = useRef(new Animated.Value(50)).current;
    const buttonPosition = useRef(new Animated.Value(50)).current; // Start button below screen
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const descriptionOpacity = useRef(new Animated.Value(1)).current; // New animated value for description

    useEffect(() => {
        Animated.sequence([
            Animated.delay(3000), // 3-second delay before animations start
            Animated.timing(logoPosition, {
                toValue: -100, // Move logo up
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(inputsPosition, {
                    toValue: 0, // Move inputs up
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonPosition, {
                    toValue: 0, // Move button up
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1, // Fade in elements
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(descriptionOpacity, { // Fade out description
                    toValue: 0, // Fade out description
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ]).start();
    }, []);

    const handleLogin = async () => {
        setAuthError(''); // Xatolikni tozalash
        setLoading(true);

        // Maydonlarni tekshirish
        let newErrors = { username: '', password: '' };

        if (!credentials.username) {
            newErrors.username = 'Foydalanuvchi nomi kiritilishi kerak';
        }
        if (!credentials.password) {
            newErrors.password = 'Parol kiritilishi kerak';
        }
        setErrors(newErrors);

        // Agar xatolik bo'lmasa davom etamiz
        if (!newErrors.username && !newErrors.password) {
            try {
                const response = await loginApi.login({
                    username: credentials.username,
                    password: credentials.password,
                });

                console.log(response.data);
                await AsyncStorage.setItem("Person", JSON.stringify(response.data));
                await AsyncStorage.setItem("Token", JSON.stringify(response.data.tokens.access));
                navigation.replace('TapMenu');
            } catch (error) {
                // Xatolikni ushlash
                if (error.response && error.response.status >= 400 && error.response.status < 500) {
                    setAuthError('Foydalanuvchi nomi yoki parol noto‘g‘ri.');
                } else {
                    setAuthError('Serverda xatolik bor. Iltimos, keyinroq urinib ko‘ring.');
                }
            }
        }

        setLoading(false);
    };




    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ translateY: logoPosition }], alignItems: 'center' }}>
                <Image source={require('../../assets/Logo.png')} style={styles.logo} />
                <Text style={styles.title}>Star Claud</Text>
                <Animated.View style={{ opacity: descriptionOpacity }}>
                    <Text style={styles.descreption}>Biz bilan ishizngizni osonlash tiring</Text>
                </Animated.View>
            </Animated.View>

            <Animated.View style={[styles.inputContainer, { transform: [{ translateY: inputsPosition }], opacity: fadeAnim }]}>
                {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
                {authError && !errors.username ? (
                    <Text style={styles.authError}>{authError}</Text>
                ) : null}
                <TextInput
                    style={[styles.input, errors.username && styles.inputError]}
                    placeholder="Foydalanuvchi nomi"
                    placeholderTextColor="#696765"
                    value={credentials.username}
                    onChangeText={(text) => {
                        setCredentials({ ...credentials, username: text });
                        if (errors.username) setErrors({ ...errors, username: '' });
                        if (authError) setAuthError('');
                    }}
                />
            </Animated.View>

            <Animated.View style={[styles.inputContainer, { transform: [{ translateY: inputsPosition }], opacity: fadeAnim }]}>
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    placeholder="Parol"
                    placeholderTextColor="#696765"
                    secureTextEntry
                    value={credentials.password}
                    onChangeText={(text) => {
                        setCredentials({ ...credentials, password: text });
                        if (errors.password) setErrors({ ...errors, password: '' });
                        if (authError) setAuthError('');
                    }}
                />
            </Animated.View>

            <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: buttonPosition }] }}>
                <TouchableOpacity style={styles.button} onPress={handleLogin} >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Kirish</Text>
                    )}
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height:800,
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    logo: {
        width: 250,
        height: 150,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgb(212, 42, 42)',
        marginTop: 10,
        textAlign: 'center',
    },
    descreption: {
        fontSize: 15,
        fontWeight: '500',
        color: 'rgb(216, 100, 17)',
        marginTop: 10,
        textAlign: 'center',
    },
    inputContainer: {
        width: '80%',
        marginTop: 15,
    },
    input: {
        height: 50,
        borderColor: '#f7ae02',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: 'black',
        backgroundColor: '#FFFFFF',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
        fontSize: 12,
    },
    authError: {
        color: 'red',
        fontSize: 14,
        marginBottom: 15,
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: 'rgb(27, 109, 193)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
