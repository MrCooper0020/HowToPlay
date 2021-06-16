import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ButtonGroup } from "react-native-elements";

export default function About() {
    const options = ["Expo ou CLI?", "Mapa"];
    const [selectedButton, setSelectedButton] = useState(0);

    return (
        <View>
            <StatusBar style="auto" />
            <View>
                <ButtonGroup
                    buttons={options}
                    selectedIndex={selectedButton}
                    onPress={(index) => setSelectedButton(index)}
                />
            </View>
            <View style={styles.container}>
                {selectedButton == 0 ? (
                    <Text>Expo ou CLI?</Text>
                ) : (
                    <Text>Mapa</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
});
