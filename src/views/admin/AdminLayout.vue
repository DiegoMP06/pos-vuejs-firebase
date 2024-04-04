<script setup>
    import AdminNav from '@/components/AdminNav..vue';
</script>

<template>
    <AdminNav />

    <div class="pt-48 md:pt-32 pb-10 container mx-auto px-4 lg:min-h-screen">
        <RouterView />
    </div>
</template>