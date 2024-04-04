import {ref, watch, computed} from 'vue';
import {defineStore} from 'pinia';
import { useCartStore } from './cart';

export const useCouponsStore = defineStore('coupons', () => {
    const cartStore = useCartStore();

    const couponInput = ref('')
    const couponValidationMessage = ref('');
    const discountPercentage = ref(0);
    const discount = ref(0);

    const VALID_COUPONS = [
        {
            name: '10DESCUENTO',
            discount: .10,
        },
        {
            name: '20DESCUENTO',
            discount: .20,
        },
        {
            name: 'TESTMESUCCESS',
            discount: .15,
        },
        {
            name: 'MICHIS',
            discount: .075,
        },
    ];

    watch(discountPercentage, calculateCoupons);

    function applyCoupon() {
        if(VALID_COUPONS.some(coupon => coupon.name === couponInput.value)) {
            couponValidationMessage.value = 'Aplicando...';
            
            setTimeout(() => {
                discountPercentage.value = VALID_COUPONS.find(coupon => coupon.name === couponInput.value).discount;
                couponValidationMessage.value = 'Cupon Aplicado';
            }, 3000);
        } else {
            couponValidationMessage.value = 'No Existe el Cupon';
        }

        setTimeout(() => {
            couponValidationMessage.value = '';
        }, 6000);
    }

    function calculateCoupons() {
        discount.value = Number((discountPercentage.value * cartStore.subtotal).toFixed(2));
    }

    function $reset() {
        couponInput.value = '';
        couponValidationMessage.value = '';
        discountPercentage.value = 0;
        discount.value = 0;
    }

    const isValideCoupon = computed(() => discount.value > 0);

    return {
        couponInput,
        couponValidationMessage,
        calculateCoupons,
        $reset,
        discountPercentage,
        discount,
        applyCoupon,
        isValideCoupon,
    };
});