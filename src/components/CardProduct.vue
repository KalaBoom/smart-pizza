<template>
    <div>
        <span>
            {{product.type}}
            {{product.title}}
            {{product.cost}}
        </span>
        <button @click="addItem">Добавить в корзину</button>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    props: {
        product: Object
    },
    methods: {
        ...mapMutations(['addItemToCart']),
        addItem() {
            this.addItemToCart(this.product)
        }
    }
}
</script>