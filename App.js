import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";

import { Provider as StoreProvider } from "react-redux";
import store from "./src/services/store";

// views imports
import Home from "./src/views/Home";
import Login from "./src/views/Login";
import RegisterGame from "./src/views/RegisterGame";
import About from "./src/views/About";
import GamePage from "./src/views/GamePage";
import NewComment from "./src/views/NewComment";

export default function App() {
    const Stack = createStackNavigator();

    return (
        <StoreProvider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={({ route, navigation }) => ({
                            title: "How to play",
                            headerShown: true,
                            headerRight: () => (
                                <Button
                                    onPress={() => navigation.navigate("Login")}
                                    title="Login"
                                />
                            ),
                            headerLeft: () => (
                                <Button
                                    onPress={() => navigation.navigate("About")}
                                    title="Sobre"
                                />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ title: "Login", headerShown: true }}
                    />
                    <Stack.Screen
                        name="RegisterGame"
                        component={RegisterGame}
                        options={{
                            title: "Adicionar jogo",
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name="About"
                        component={About}
                        options={{ title: "Expo ou CLI?", headerShown: true }}
                    />
                    <Stack.Screen
                        name="GamePage"
                        component={GamePage}
                        options={{ title: "Pagina do jogo", headerShown: true }}
                    />
                    <Stack.Screen
                        name="NewComment"
                        component={NewComment}
                        options={{
                            title: "Novo comentario",
                            headerShown: true,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </StoreProvider>
    );
}
