<script setup>
    import {useCouponsStore} from '@/stores/coupons';

    const couponsStore = useCouponsStore();
</script>

<template>
    <p class="mt-5 py-5 font-bold border-t border-gray-200">¿Tienes un Cupon?</p>

    <div class="flex">
        <input 
            :disabled="couponsStore.isValideCoupon"
            type="text" 
            placeholder="Ingresa un Cupon"
            class="p-2 bg-white border-gray-300 w-full disabled:opacity-40" 
            v-model.trim="couponsStore.couponInput"
        />

        <button 
            :disabled="couponsStore.isValideCoupon"
            type="button" 
            class="p-3 bg-green-400 font-bold disabled:opacity-40"
            @click="couponsStore.applyCoupon"
        >
            Canjear
        </button>
    </div>

    <p class="py-2 text-center text-sm font-extrabold">
        {{ couponsStore.couponValidationMessage }}
    </p>
</template>