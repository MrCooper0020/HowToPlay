import firebase from "firebase";

export function login(email, password) {
    return new Promise((resolve, reject) =>
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => resolve())
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
