<script setup>
    import { RouterLink } from 'vue-router';
    import Link from '@/components/Link.vue';
    import Logo from './Logo.vue';
</script>

<template>
    <header class="px-10 py-5 bg-gray-700 flex justify-between absolute top-0 w-full z-10">
        <Logo />

        <nav class="flex md:gap-5 flex-col md:flex-row md:items-center">
            <RouterLink 
                :to="{name: 'admin.products'}"
                class="rounded text-white font-bold p-2"
            >
                Productos
            </RouterLink>

            <RouterLink 
                :to="{name: 'admin.sales'}"
                class="rounded text-white font-bold p-2"
            >
                Ventas
            </RouterLink>

            <Link to="shop">
                Ir a la Tienda
            </Link>
        </nav>
    </header>
</template>