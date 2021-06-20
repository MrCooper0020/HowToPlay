import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Text } from "react-native-elements";

export default function Faq() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <ScrollView>
                    <View style={{ alignItems: "center" }}>
                        <Text h3 style={styles.title}>
                            Funcionalidades do app
                        </Text>
                    </View>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>Conta: </Text>É
                        possível criar uma conta no app e logar(entrar), o app
                        também permite que email e senha ficam salvas para
                        logar(entrar) mais rapidamente.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Página de game:{" "}
                        </Text>
                        O app permite que usuários que tenham uma conta e
                        estejam logado, criem uma página sobre um jogo que
                        queira discutir com a comunidade, também sendo possível
                        editar e deletar somente pelo usuário criador.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Comentários:{" "}
                        </Text>
                        Em uma página de jogo, é possível que usuários logados
                        criem comentários, também é possível que os usuários
                        editem e apaguem os comentários que eles criaram.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>Dicas: </Text>
                        Em uma página de jogo, há um botão chamado "Sala de
                        dicas" que está disponível somente para usuários
                        logados, entrando nele, os usuários terão uma área
                        somente para dicas sobre o jogo que poderá ter spoiler
                        sobre a história do jogo em questão.
                    </Text>
                    <Text h4 style={styles.infoBox}>
                        <Text style={{ fontWeight: "bold" }}>
                            Minha localização:{" "}
                        </Text>
                        O app permite que os usuários utilizem um mapa para não
                        se perderem na vida real.
                    </Text>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        marginHorizontal: 20,
    },
    infoBox: {
        marginBottom: 20,
    },
    title: {
        marginBottom: 30,
        fontWeight: "bold",
        alignItems: "center",
    },
});
