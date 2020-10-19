<template>
    <div>
        Каталог товара
        <CardProduct v-for="(product, index) in products"
            :key="index"
            :product="product"
        />
    </div>
</template>

<script>
import CardProduct from '@/components/CardProduct.vue'
export default {
    props: {
        products: Array
    },
    components: {
        CardProduct
    }
}
</script>