<template>
    <div>
        Каталог товара
        <CardProduct v-for="(product, index) in allProducts"
            :key="index"
            :product="product"
        />
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CardProduct from '@/components/CardProduct.vue'
export default {
    computed: mapGetters(['allProducts']),
    components: {
        CardProduct
    }
}
</script>