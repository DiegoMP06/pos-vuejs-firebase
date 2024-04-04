<script setup>
    import { useProductsStore } from '@/stores/products';
    import Link from '@/components/Link.vue';
    import Product from '@/components/Product.vue';

    const productsStore = useProductsStore();
</script>

<template>
    <Link to="admin.products.create">
        Nuevo Producto
    </Link>
    
    <h1 class="text-4xl font-black my-10">Productos</h1>
    
    <p v-if="productsStore.noResults">
        No Hay Resultados
    </p>

    <ul  
        v-else
        role="list"
        class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5"
    >
        <Product 
            v-for="product in productsStore.productsCollection"
            :key="product.id"
            :product="product"
        />
    </ul>
</template>