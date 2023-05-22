import { StatusBar } from 'expo-status-bar';
import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import DistanceCalculator from './src/screens/DistanceCalculator';

export default function App() {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView>
                    <DistanceCalculator />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: 'center',
    },
});
