<script setup>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import Link from '@/components/Link.vue';
    import useImage from  '@/composables/useImage';
    import { useProductsStore } from '@/stores/products'

    const router = useRouter();
    const productsStore = useProductsStore();

    const {
        url,
        onFileChange,
        isImageUploaded,
    } = useImage();

    const formData = reactive({
        name: '',
        category: '',
        price: '',
        availability: '',
        image: '',
    });

    const submitHandler = async data => {

        const {image, ...product} = data;

        try {
            await productsStore.createProduct({
                ...product,
                image: url.value,
            });

            router.push({name: 'admin.products'});
        } catch (error) {
            console.log(error)
        }
    }
</script>

<template>
    <Link to="admin.products">
        Volver
    </Link>

    <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>

    <div class="flex justify-center bg-white shadow">
        <div class="mt-10 p-10 w-full 2xl:w-2/4">
            <FormKit
                type="form"
                submit-label="Agregar Producto"
                incomplete-message="No se Puedo Enviar, Revisa los Mensajes"
                @submit="submitHandler"
                :value="formData"
            >
                <FormKit 
                    type="text"
                    label="Nombre: "
                    name="name"
                    placeholder="Nombre del Producto"
                    validation="required"
                    :validation-messages="{required: 'El Nombre del Producto es Obligatorio'}"
                    v-model.trim="formData.name"
                />

                <FormKit 
                    type="file"
                    label="Imagen Producto: "
                    name="image"
                    validation="required"
                    accept=".jpg"
                    multiple="false"
                    :validation-messages="{required: 'La Imagen del Producto es Obligatoria'}"
                    @change="onFileChange"
                    v-model.trim="formData.image"
                />

                <div v-if="isImageUploaded">
                    <p class="font-black">Imagen Producto: </p>

                    <img
                        :src="url"
                        alt="Imagen Nuevo Producto"
                        class="w-32"
                    />
                </div>

                <FormKit 
                    type="select"
                    label="Categoria: "
                    name="category"
                    validation="required"
                    :validation-messages="{required: 'La Categoria del Producto es Obligatoria'}"
                    :options="productsStore.categoryOptions"
                    v-model.number="formData.category"
                />

                <FormKit 
                    type="number"
                    label="Precio: "
                    name="price"
                    placeholder="Precio del Producto"
                    validation="required|number"
                    min="1"
                    step="0.01"
                    :validation-messages="{required: 'El Precio del Producto es Obligatorio', number: 'El Precio del Producto es Invalido'}"
                    v-model.number="formData.price"
                />

                <FormKit 
                    type="number"
                    label="Disponibles: "
                    name="availability"
                    placeholder="Disponibles en Tienda"
                    validation="required|number"
                    min="1"
                    step="1"
                    :validation-messages="{required: 'La Cantidad Disponible es Obligatoria', number: 'La Cantidad Disponible es Invalida'}"
                    v-model.number="formData.availability"
                />
            </FormKit>
        </div>
    </div>
</template>