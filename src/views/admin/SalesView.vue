<script setup>
    import {ref} from 'vue';
    import {storeToRefs} from 'pinia';
    import {useSalesStore} from '@/stores/sales';
    import VueTalilwindDatepicker from 'vue-tailwind-datepicker';
    import SaleDetails from '@/components/SaleDetails.vue';
import { formatCurrency } from '@/helpers';

    const salesStore = useSalesStore();
    const {date, isDateSelected, salesCollection, noSales, totalSalesOfDay} = storeToRefs(salesStore);

    const formatter = ref({
        date: 'DD/MM/YYYY',
        month: 'MMMM',
    });
</script>

<template>
    <h1 class="text-4xl font-black mb-10">Resumen de Ventas</h1>

    <div class="md:flex md:items-start gap-5">
        <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center p-5">
            <VueTalilwindDatepicker 
                v-model="date"
                i18n="es-mx"
                as-single
                no-input
                :formatter="formatter"
            />
        </div>

        <div class="md:w-1/2 lg:w-2/3 bg-white space-y-5 lg:max-h-screen lg:overflow-y-auto p-5 pb-32">
            <p 
                v-if="isDateSelected"
                class="text-center text-lg"
            >
                Ventas de la Fecha 
                <span class="font-black">
                    {{ date }}
                </span>
            </p>

            <p 
                v-else
                class="text-center text-lg"
            >
                Seleccione una Fecha
            </p>

            <div v-if="salesCollection.length" class="space-y-5">
                <p class="text-right text-2xl">
                    Total del Dia: 
                    <span class="font-black">
                        {{ formatCurrency(totalSalesOfDay) }}
                    </span>
                </p>

                <SaleDetails 
                    v-for="sale in salesCollection"
                    :key="sale.id"
                    :sale="sale"
                />
            </div>

            <p v-else-if="noSales" class="text-lg text-center">
                No Hay Ventas en Este Dia
            </p>
        </div>
    </div>
</template>