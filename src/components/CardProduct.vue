<template>
    <div class="product">
        <img src="../assets/img/test.jpeg" alt="изображение" class="product__img">
        <div class="product__title">{{product.title}}</div>
        <div class="product__cost">{{product.cost}}</div>
        <button class="product__btn" @click="addItem">в корзину</button>
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

<style lang="scss">
    .product {
        text-align: center;
        padding: 0.5em;
        box-shadow: 0 0 25px rgba(0,0,0,.2);
        margin-right: 0.5em;
        border-radius: 5px;
        &__img {
            width: 100%;
            background-color: #ccc;
        }
        &__title {
           text-transform: uppercase;
           font-weight: bold;
        }
        &__cost {
            margin-top: 0.5em;
            &::after {
                content: '\20BD';
                margin-left: 0.1em;
            }
        }
        &__btn {
            margin-top: 1em;
        }
    }
</style>