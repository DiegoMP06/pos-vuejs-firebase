import {ref, computed, watch, watchEffect} from 'vue';
import {defineStore} from 'pinia';
import {collection, addDoc, runTransaction, doc} from 'firebase/firestore'
import {useFirestore} from 'vuefire'
import {getCurrentDate} from '@/helpers'
import { useCouponsStore } from './coupons';

export const useCartStore = defineStore('cart', () => {
    const db = useFirestore();

    const couponsStore = useCouponsStore();

    const items = ref([]);
    const totalItems = ref(0);
    const subtotal = ref(0);
    const taxes = ref(0);
    const total = ref(0);

    const TAX_RATE = .10;
    const MAX_ITEMS = 5;
    
    // watch(items, items => {
    //     subtotal.value = items.reduce((total, item) => total + (item.quantity * item.price), 0);
    //     taxes.value = TAX_RATE * subtotal.value;
    //     total.value = taxes.value + subtotal.value;
    // }, {
    //     deep: true,
    // });

    watchEffect(() => {
        totalItems.value = Number(items.value.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2));
        taxes.value = Number((TAX_RATE * totalItems.value).toFixed(2));
        subtotal.value = taxes.value + totalItems.value;
        couponsStore.calculateCoupons();
        total.value = Number((subtotal.value - couponsStore.discount).toFixed(2));
    });

    function addItem({id, ...item}) {
        const index = isItemCart(id)

        if(index === -1) {
            items.value = [...items.value, {...item, id, quantity: 1}];
            return;
        }

        isProductAvailable(index) ? 
            items.value[index].quantity++ : 
            alert('Has Alcanzado la Cantidad Maxima del Producto');
    }

    function removeItem(id) {
        items.value = items.value.filter(item => item.id !== id);
    }

    function updateQuantity(id, quantity) {
        items.value = items.value.map(item => item.id === id ? {...item, quantity} : item);
    }

    async function checkout() {
        try {
            await addDoc(collection(db, 'sales'), {
                items: items.value.map(({availability, category, ...data}) => data),
                subtotal: totalItems.value,
                taxes: taxes.value,
                discount: couponsStore.discount,
                total: total.value,
                date: getCurrentDate(),
            })

            items.value.forEach(async item => {
                const productRef = doc(db, 'products', item.id);

                await runTransaction(db, async transaction => {
                    const currentProduct = await transaction.get(productRef);
                    const availability = currentProduct.data().availability - item.quantity;
                    transaction.update(productRef, {availability});
                })
            });

            $reset();
            couponsStore.$reset();
        } catch (error) {
            console.log(error)
        }
    }

    function $reset() {
        items.value = [];
        totalItems.value = 0;
        subtotal.value = 0;
        taxes.value = 0;
        total.value = 0;
    }

    const isItemCart = id => items.value.findIndex(item => item.id === id);
    const isProductAvailable = index => items.value[index].quantity < MAX_ITEMS && items.value[index].quantity < items.value[index].availability;

    const isEmpty = computed(() => items.value.length === 0);
    const checkProductAvailability = computed(() => product => product.availability < MAX_ITEMS ? product.availability : MAX_ITEMS);

    return {
        items,
        totalItems,
        subtotal,
        taxes,
        total,
        addItem,
        removeItem,
        updateQuantity,
        checkout,
        isEmpty,
        checkProductAvailability,
    };
});