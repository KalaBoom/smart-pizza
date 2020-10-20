<template>
    <div class="product">
        <img src="../assets/img/test.jpeg" alt="изображение" class="product__img">
        <div class="product__title">{{product.title}}</div>
        <div class="product__cost">{{product.cost}}</div>
        <CountButtons class="product__count" :id="product.id" v-if="inCart"/>
        <button class="accent-btn" @click="addItem" v-else>в корзину</button>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import CountButtons from '@/components/CountButtons.vue'
export default {
    props: {
        product: Object,
        inCart: Boolean
    },
    methods: {
        ...mapMutations(['addItemToCart']),
        addItem() {
            this.addItemToCart(this.product)
        }
    },
    components: {
        CountButtons
    }
}
</script>

<style lang="scss">
    .product {
        text-align: center;
        padding: 0.5em;
        box-shadow: 0 0 25px rgba(0,0,0,.2);
        margin: 0 0.25em 0.5em; 
        border-radius: 5px;
        height: 27em;
        width: calc(90%/5 + 0.6em);
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
        &__count {
            width: 40%;
            margin: 1em auto;
        }
    }
    .accent-btn {
            margin-top: 1em;
            font-size: 1.2rem;
            padding: 0.5em;
            cursor: pointer;
            border: none;
            border: 1px solid orange;
            border-radius: 10px;
            background-color: orange;
            color: white;
            transition: all 0.2s ease-in;
            &:hover {
                background-color: white;
                color: orange;
            }
        }
</style>