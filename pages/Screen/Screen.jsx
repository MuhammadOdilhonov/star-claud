import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRCodeScanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false); // For controlling re-scan

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.getPermissionsAsync();
            if (status !== 'granted') {
                const requestStatus = await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(requestStatus.status === 'granted');
            } else {
                setHasPermission(true);
            }
        })();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true); // Stop scanning until "Rescan" button is clicked
        console.log('Scanned QR Code:', data);
        alert(`Scanned QR Code: ${data}`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {!scanned ? (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.barcodeScanner}
                />
            ) : (
                <View style={styles.rescanContainer}>
                    <Text style={styles.scannedText}>QR kod skanerlandi!</Text>
                    <Button
                        title="Skanerlashni qayta boshlash"
                        onPress={() => setScanned(false)}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    barcodeScanner: {
        width: '100%',
        height: 450,
    },
    rescanContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    scannedText: {
        fontSize: 18,
        marginBottom: 20,
        color: 'white',
    },
});
