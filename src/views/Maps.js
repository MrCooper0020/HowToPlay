import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function Maps() {
    const [region, SetRegion] = useState({
        latitude: -28.260392632865123,
        longitude: -52.407892697640044,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    const [myLocation, setMyLocation] = useState(null);

    async function getUserLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Acesso negado a sua localizacão!");
        } else {
            try {
                const userLocation = await Location.getCurrentPositionAsync();
                setMyLocation(userLocation.coords);
                SetRegion(Object.assign({}, region, userLocation.coords));
            } catch (error) {}
        }
    }

    useLayoutEffect(() => {
        getUserLocation();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <MapView style={styles.map} region={region}>
                {myLocation ? (
                    <Marker
                        coordinate={{
                            latitude: myLocation.latitude,
                            longitude: myLocation.longitude,
                        }}
                        title="Estou aqui"
                        description=""
                    ></Marker>
                ) : null}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
