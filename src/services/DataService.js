import db from "./connectFirebase";

export function getData(collection) {
    return new Promise((resolve, reject) => {
        db.collection(collection.toUpperCase())
            .get()
            .then((response) => {
                let list = [];
                response.forEach((item) =>
                    list.push(
                        Object.assign({}, item.data(), {
                            id: item.id,
                        })
                    )
                );
                resolve(list);
            })
            .catch((error) => reject(error));
    });
}

export function getDataWithId(collection, id) {
    return new Promise((resolve, reject) => {
        db.collection(collection.toUpperCase())
            .doc(id)
            .get()
            .then((response) => {
                resolve(
                    Object.assign({}, response.data(), {
                        id,
                    })
                );
            })
            .catch((error) => reject(error));
    });
}

export function addData(collection, data) {
    return new Promise((resolve, reject) => {
        db.collection(collection.toUpperCase())
            .add(data)
            .then(() => resolve())
            .catch((error) => reject(error));
    });
}

export function deleteData(collection, id) {
    db.collection(collection.toUpperCase()).doc(id).delete();
}

export function updateData(collection, data, id) {
    return new Promise((resolve, reject) =>
        db
            .collection(collection.toUpperCase())
            .doc(id)
            .update(data)
            .then(() => resolve())
            .catch((error) => reject(error))
    );
}

export function saveData(collection, data) {
    if (data.id) {
        let id = data.id;
        delete data.id;

        return updateData(collection, data, id);
    } else {
        return addData(collection, data);
    }
}
