import { Text, Pressable, StyleSheet } from 'react-native';

const IOSButton = ({ title, onPress }) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
        ]}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF', // iOS blue
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonPressed: {
        opacity: 0.6,
    },
    text: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
    }
});

export default IOSButton;
