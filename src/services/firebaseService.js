import firebase from 'firebase';

// const db = firebase.firestore();

const getAllProducts = (dataLoaded, dataRequested) => {
    let data = [];
    dataRequested();
    firebase.firestore().collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const newItem = {...doc.data(), id: doc.id}
            data = [...data, newItem]
        });
        dataLoaded(data)
    });
}

const addProduct = (dataLoaded, dataRequested, product, setButtonDisabled, closeModal) => {
    firebase.firestore().collection("products").add(product)
        .then((docRef) => {
            setButtonDisabled(false);
            closeModal();
            getAllProducts(dataLoaded, dataRequested)
        })
}



const updateProduct = (dataLoaded, dataRequested, product, setButtonDisabled, closeModal, id) => {
    firebase.firestore().collection("products").doc(id).set(product)
    .then(() => {
        setButtonDisabled(false);
        closeModal();
        getAllProducts(dataLoaded, dataRequested)
    })
}



const deleteProduct = async (id, dataLoaded, dataRequested) => {
    firebase.firestore().collection("products").doc(id).delete().then(() => {
        getAllProducts(dataLoaded, dataRequested)
    })
};

const getAllComments = (dataLoaded) => {
    let data = [];
    firebase.firestore().collection("comment").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const newItem = {...doc.data(), id: doc.id}
            data = [...data, newItem]
        });
        dataLoaded(data)
    });
}

const addComment = (dataLoaded, comment, setButtonDisabled, closeModal) => {
    firebase.firestore().collection("comment").add(comment)
        .then((docRef) => {
            setButtonDisabled(false);
            closeModal();
            getAllComments(dataLoaded)
        })
}

export  {getAllProducts, addProduct, deleteProduct, getAllComments, updateProduct, addComment};