import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";

const QrCreate = () => {

    const [inputValue, setInputValue] = useState("")
    const [qrValue, setQrValue] = useState("")
    const [showQR, setShowQR] = useState(false)

    const handleCreateQR = () => {
        if (inputValue.trim().length > 0) {
            setShowQR(true)
            setQrValue(inputValue)
            setInputValue("")
        }
    }

    const handleDeleteQR = () => {
        setShowQR(false)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter a some todo.."
                value={inputValue}
                onChangeText={v => {
                    setInputValue(v)
                    setShowQR(false)
                }}
            />
            <TouchableOpacity
                style={styles.qrButton}
                onPress={handleCreateQR}
            >
                <Text>Create QR</Text>
            </TouchableOpacity>
            {showQR && (<View>
                <View style={styles.qrContainer}>
                    <QRCode value={qrValue} size={200} />
                </View>
                <TouchableOpacity
                    style={styles.qrButton}
                    onPress={handleDeleteQR}
                >
                    <Text>Delete QR</Text>
                </TouchableOpacity>
            </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0e0ff',
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        height: 48,
        width: 350,
        borderRadius: 5,
        paddingHorizontal: 20,
        color: "black",
        backgroundColor: "#eecbcbff",
    },
    qrButton: {
        backgroundColor: "#b98f8fff",
        height: 40,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        borderRadius: 5
    },
    qrContainer: {
        marginTop: 40,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },        
    }
});

export default QrCreate;