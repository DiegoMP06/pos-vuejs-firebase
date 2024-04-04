<script setup>
    import {useCartStore} from '@/stores/cart';
    import {useCouponsStore} from '@/stores/coupons';
    import ShoppingCartItem from '@/components/ShoppingCartItem.vue'
    import Amount from '@/components/Amount.vue';
    import { formatCurrency } from '@/helpers';
    import CouponForm from '@/components/CouponForm.vue';

    const cartStore = useCartStore();
    const couponsStore = useCouponsStore();
</script>

<template>
    <p 
        v-if="cartStore.isEmpty" 
        class="text-xl text-center text-gray-900"
    >
        El Carrito Esta Vacio
    </p>

    <div v-else>
        <p class="text-4xl font-bold text-gray-900">Resumen de Venta</p>

        <ul 
            role="list"
            class="mt-6 divide-y divide-gray-200"
        >
            <ShoppingCartItem 
                v-for="item in cartStore.items"  
                :key="item.id"
                :item="item"
            />
        </ul>

        <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
            <Amount>
                <template #label>
                    Subtotal: 
                </template>   
                
                {{ formatCurrency(cartStore.totalItems) }}
            </Amount>

            <Amount>
                <template #label>
                    Impuestos: 
                </template>
                
                {{ formatCurrency(cartStore.taxes) }}
            </Amount>

            <Amount v-if="couponsStore.isValideCoupon">
                <template #label>
                    Descuento: 
                </template>   
                
                {{ formatCurrency(couponsStore.discount) }}
            </Amount>

            <Amount>
                <template #label>
                    Total a Pagar: 
                </template>   
                
                {{ formatCurrency(cartStore.total) }}
            </Amount>
        </dl>

        <CouponForm />

        <button 
            type="button" 
            class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white uppercase font-bold p-3"
            @click="cartStore.checkout"
        > 
            Confirmar Compra
        </button>
    </div>
</template>