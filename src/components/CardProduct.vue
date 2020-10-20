<template>
    <div class="product">
        <img src="../assets/img/test.jpeg" alt="изображение" class="product__img">
        <div class="product__title">{{product.title}}</div>
        <div class="product__ingredients" v-if="product.ingredients">{{product.ingredients.join(' ')}}</div>
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
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        padding: 0.5em;
        box-shadow: 0 0 25px rgba(0,0,0,.2);
        margin: 0 0.25em 0.5em; 
        border-radius: 5px;
        width: calc(100%/5 - (0.25em * 6));
        @media screen and (max-width: 1200px) {
            & {
                width: calc(100%/4 - (0.25em * 6));
            }
        }
        @media screen and (max-width: 800px) {
            & {
                width: calc(100%/3 - (0.25em * 6));
            }
        }
        @media screen and (max-width: 600px) {
            & {
                width: calc(100%/2 - (0.25em * 6));
            }
        }
        @media screen and (max-width: 400px) {
            & {
                width: calc(100%/1 - (0.25em * 6));
            }
        }
        &__img {
            width: 100%;
            background-color: #ccc;
        }
        &__title {
           text-transform: uppercase;
           font-weight: bold;
        }
        &__ingredients {
            color: #777;
        }
        &__cost {
            margin: 0.5em;
            font-size: 1.3rem;
            &::after {
                content: '\20BD';
                margin-left: 0.1em;
            }
        }
        &__count {
            width: 50%;
            margin: 0 auto;
        }
        &__img, &__title, &__ingredients, &__cost, &__count {
            flex: 1;
        }
    }
    .accent-btn {
        font-size: 1.2rem;
        height: 2.5em;
        padding: 0.5em;
        cursor: pointer;
        border: none;
        border: 1px solid orange;
        border-radius: 10px;
        background-color: orange;
        color: white;
        transition: all 0.2s ease-in;
        width: 8em;
        &:hover {
            background-color: white;
            color: orange;
        }
        @media screen and (max-width: 300px) {
            font-size: 1rem;
        }
    }
</style>