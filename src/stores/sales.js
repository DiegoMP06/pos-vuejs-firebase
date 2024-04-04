import { ref, computed } from 'vue';
import {defineStore} from 'pinia';
import {query, collection, where} from 'firebase/firestore';
import {useFirestore, useCollection} from 'vuefire'

export const useSalesStore = defineStore('sales', () => {
    const db = useFirestore();

    const date = ref('');

    const isDateSelected = computed(() => date.value);

    const salesSource = computed(() => {
        if(date.value) {
            const q = query(
                collection(db, 'sales'),
                where('date', '==', date.value)
            );
            
            return q;
        }

        return null;
    });

    const salesCollection = useCollection(salesSource);

    const noSales = computed(() => !salesCollection.value.length && date.value);

    const totalSalesOfDay = computed(() => 
        salesCollection.value.length ? 
            salesCollection.value.reduce((total, sale) => total + sale.total, 0) : 0
    );

    return {
        date,
        isDateSelected,
        salesCollection,
        noSales,
        totalSalesOfDay,
    };
});