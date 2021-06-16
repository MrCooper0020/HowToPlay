import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function login(email, password, remember) {
    console.log(remember);

    if (!remember) {
        AsyncStorage.removeItem("email");
        AsyncStorage.removeItem("password");
    }

    return new Promise((resolve, reject) =>
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                if (remember) {
                    AsyncStorage.setItem("email", email);
                    AsyncStorage.setItem("password", password);
                }

                resolve();
            })
            .catch((error) => reject(error))
    );
}

export function createAccount(email, password) {
    return new Promise((resolve, reject) =>
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => resolve())
            .catch((error) => reject(error))
    );
}
