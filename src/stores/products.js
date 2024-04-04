import { computed, ref } from 'vue';
import {defineStore} from 'pinia'
import {useFirestore, useCollection, useFirebaseStorage} from 'vuefire';
import {collection, addDoc, where, query, limit, orderBy, updateDoc, deleteDoc, doc, getDoc} from 'firebase/firestore'
import {ref as storageRef, deleteObject} from 'firebase/storage';

export const useProductsStore = defineStore('products', () => {
    const db = useFirestore();
    const storage = useFirebaseStorage();

    const selectCategory = ref(1);

    const categories = [
        {id: 1, name: 'Sudaderas'},
        {id: 2, name: 'Tenis'},
        {id: 3, name: 'Lentes'},
    ];

    const q = query(
        collection(db, 'products'), 
        // where('category', '==', 1),
        // limit(10),
        orderBy('availability', 'asc'),
    );

    const productsCollection = useCollection(q);

    async function createProduct(product) {
        await addDoc(collection(db, 'products'), product);
    }
    
    async function updateProduct(docRef, product) {
        const {image, url, ...values} = product;

        if(image.length) values.image = url.value;

        await updateDoc(docRef, values);
    }

    async function deleteProduct(id) {
        if(!confirm('¿Desea Eliminar el Producto?')) return;

        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        const {image} = docSnap.data();

        const imageRef = storageRef(storage, image);
        await Promise.all([
            deleteDoc(docRef),
            deleteObject(imageRef),
        ]);
    }

    const categoryOptions = computed(() => {
        const options = [
            {label: '-- Seleccione --', value: '', attrs: {disabled: true}},
            ...categories.map(({id, name}) => ({label: name, value: id}))
        ];

        return options;
    });

    const noResults = computed(() => productsCollection.value.length === 0);

    const filteredProducts = computed(() => productsCollection.value
        .filter(product => product.category === selectCategory.value)
        .filter(product => product.availability > 0)
    );

    return {
        createProduct,
        updateProduct,
        deleteProduct,
        productsCollection,
        categories,
        selectCategory,
        categoryOptions,
        noResults,
        filteredProducts,
    }
});