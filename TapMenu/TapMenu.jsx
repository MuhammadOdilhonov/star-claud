import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home/Home';
import Screen from '../pages/Screen/Screen';
import Account from '../pages/Account/Account';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function CustomScreenButton({ children, onPress }) {
    return (
        <TouchableOpacity
            style={{
                top: -20, // Position it slightly above the tab bar
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onPress={onPress}
        >
            <View
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: '#000', // Blue color for the circle
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop:15,
                }}
            >
                {children}
            </View>
        </TouchableOpacity>
    );
}

export default function TapMenu() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Screen') {
                        iconName = 'qr-code'; // Replace with appropriate icon
                        size = 35; // Make the icon larger for the middle button
                        color = "#fff";
                    } else if (route.name === 'Account') {
                        iconName = 'person';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen
                name="Screen"
                component={Screen}
                options={{
                    tabBarButton: (props) => <CustomScreenButton {...props} />,
                    tabBarLabel: "", // Removes the label for the middle icon
                }}
            />
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    );
}
