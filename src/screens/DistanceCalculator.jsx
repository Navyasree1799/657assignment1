import { Input, Button } from '@rneui/base';
import React, { useState } from 'react';
import { Text, StyleSheet, View, Keyboard } from 'react-native';
import actualDimensions from '../utils/dimensions';
import { computeBearing, computeDistance } from '../utils/helperFunctions';

const DistanceCalculator = () => {
    const [data, setData] = useState({
        latitude1: null,
        longitude1: null,
        latitude2: null,
        longitude2: null,
        distance: null,
        bearing: null
    });

    const handleInputChange = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const calculate = () => {
        const { latitude1, longitude1, latitude2, longitude2 } = data;
        const distance = computeDistance(latitude1, longitude1, latitude2, longitude2);
        const bearing = computeBearing(latitude1, longitude1, latitude2, longitude2);
        
        setData((prevState) => ({
            ...prevState,
            distance,
            bearing,
        }));
    };

    const clear = () => {
        setData({
            latitude1: null,
            longitude1: null,
            latitude2: null,
            longitude2: null,
            distance: null,
            bearing: null
        });
        Keyboard.dismiss()
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Calculator</Text>
            {Object.keys(data).filter((key) => key.includes('l')).map((key, idx) => {
                return <Input
                    key={idx}
                    style={styles.input}
                    onChangeText={(value) => handleInputChange(key, value)}
                    value={data[key]}
                    placeholder={`Enter ${key.substring(0, key.length - 1)} for point ${key.at(-1)}`}
                    keyboardType="numeric"
                />
            })}

            <View style={styles.buttons}>
                <Button
                    title="Calculate"
                    disabled={
                        !data.latitude1 ||
                        !data.latitude2 ||
                        !data.longitude1 ||
                        !data.longitude2
                    }
                    onPress={calculate}
                />
                <Button
                    title="Clear"
                    disabled={
                        !data.latitude1 &&
                        !data.latitude2 &&
                        !data.longitude1 &&
                        !data.longitude2 && !data.bearing
                    }
                    onPress={clear}
                />
            </View>
            {data.bearing && (
                <View style={styles.result}>
                    <Text><Text style={styles.subHeading}>Distance:</Text> {data?.distance}</Text>
                    <Text><Text style={styles.subHeading}>Bearing:</Text> {data?.bearing} degrees </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: actualDimensions.width,
        paddingHorizontal: 20
    },
    buttons: {
        height: 100,
        display: 'flex',
        justifyContent: 'space-between',
    },
    result: {
        marginTop: 30
    },
    heading: {
        fontWeight: "bold",
        fontSize: 40,
        textAlign: "center",
        marginBottom: 30
    },
    subHeading: {
        fontWeight: "bold"
    }
});

export default DistanceCalculator;