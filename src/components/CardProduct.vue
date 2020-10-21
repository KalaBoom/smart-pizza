<template>
    <div class="product">
        <div class="product__image">
            <img :src="product.img" alt="изображение" class="img">
            <div class="product__image__discount" v-if="product.discount"></div>
        </div>
        <div class="product__title">{{product.title}}</div>
        <div class="product__ingredients" v-if="product.ingredients">{{product.ingredients.join(' ')}}</div>
        <div class="product__discount cost" v-if="product.discount">
            <span class="product__discount__old-cost">{{product.cost}}</span>
            {{product.cost * (1 - product.discount * 0.01)}}
        </div>
        <div class="product__cost cost" v-else>
            {{product.cost}}
        </div>
        <CountButtons class="product__count" :id="product.id" v-if="inCart"/>
        <!-- <div class="product__count" > -->
            <button class=" accent-btn" @click="addItem" v-else>в корзину</button>
        <!-- </div> -->
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
            width: calc(100%/4 - (0.25em * 6));
        }
        @media screen and (max-width: 800px) {
            width: calc(100%/3 - (0.25em * 6));
        }
        @media screen and (max-width: 600px) {
            width: calc(100%/2 - (0.25em * 6));
        }
        @media screen and (max-width: 400px) {
            width: calc(100%/1 - (0.25em * 6));
        }
        &__image {
            position: relative;
            &__discount  {
                position: absolute;
                background-image: url('../assets/percentage.svg');
                background-size: contain;
                width: 5em;
                height: 5em;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
        }
        &__title {
            height: 20%;
            margin-top: 1em;
            text-transform: uppercase;
            font-weight: bold;
        }
        &__ingredients {
            color: #777;
        }
        &__cost, &__discount {
            margin: 0.5em;
            height: 20%;
        }
        &__discount {
            position: relative;
            &__old-cost {
                position: absolute;
                font-size: 1rem;
                right: -3em;
                text-decoration: line-through;
                color: #555;
            }
        }
        &__count {
            width: 60%;
            margin: 0 auto;
            @media screen and (max-width: 1000px) {
                width: 80%;
            }
        }
        // &__img, &__title, &__ingredients, &__cost, &__discount {
        //     flex: 1 1 auto;
        // }
    }
    .cost {
        font-size: 1.3rem;
        &::after {
                content: '\20BD';
                margin-left: 0.1em;
            }
    }
    .img {
        width: 100%;
        background-color: white;
    }
    .accent-btn {
        font-size: 1.2rem;
        padding: 0.626em;
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
        @media screen and (max-width: 1400px) {
            padding: 0.6em;
        }
        @media screen and (max-width: 300px) {
            font-size: 1rem;
        }
    }
</style>