<script setup>
    import { useProductsStore } from '@/stores/products';
    import Link from '@/components/Link.vue';
    import Logo from './Logo.vue';

    const productStore = useProductsStore();

</script>

<template>
    <header class="px-10 py-5 bg-gray-700 flex flex-col lg:flex-row gap-5 lg:items-center justify-between absolute top-0 w-full z-10">
        <div class="flex gap-5 justify-between items-center">
            <Logo />

            <div class="flex gap-5 text-white items-center">
                <h2 class="text-lg font-extrabold">Filtros: </h2>

                <div class="flex flex-col md:flex-row md:gap-5">
                    <div
                        class="flex items-center gap-2"
                        v-for="category in productStore.categories" 
                        :key="category.id"
                    >
                        <input 
                            type="radio" 
                            name="category" 
                            :id="category.id" 
                            :value="category.id" 
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                            :checked="productStore.selectCategory === category.id"
                            @change="productStore.selectCategory = Number($event.target.value)"
                        />
    
                        <label :for="category.id" class="text-gray-100">
                            {{ category.name }}
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <nav>
            <Link to="admin.sales">
                Administrar
            </Link>
        </nav>
    </header>
</template>