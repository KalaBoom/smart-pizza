<template>
    <div>
        <div class="product__image">
            <img :src="imgs[product.type]" :class="{small_img: smallImg}"  alt="изображение" class="img">
            <div class="product__image__discount" v-if="product.discount"></div>
        </div>
        <div class="product__title">{{product.title}}</div>
        <div class="product__ingredients" v-if="product.ingredients">{{product.ingredients.join(' ')}}</div>
        <div class="product__discount cost" v-if="product.discount">
            <span class="product__discount__old-cost">{{product.cost}}</span>
            {{cost}}
        </div>
        <div class="product__cost cost" v-else>
           {{cost}}
        </div>
        <CountButtons class="product__count" :id="product.id" v-if="inCart"/>
        <button class=" accent-btn" @click="addItem" v-else>в корзину</button>
        <slot></slot>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import CountButtons from '@/components/CountButtons.vue'
export default {
    props: {
        product: Object,
        inCart: Boolean,
        smallImg: Boolean
    },
    data() {
        return {
            imgs: {
                'пицца' : require('@/assets/pizza.svg'),
                'закуска' : require('@/assets/fast-food.svg'),
                'напиток' : require('@/assets/soft-drink.svg')
            }
        }
    },
    computed: {
        cost() {
            let newcost = null
            if (this.product.discount) {
                if (this.product.count <= 0) newcost = this.product.cost * (1 - this.product.discount * 0.01)
                else newcost = this.product.cost * this.product.count * (1 - this.product.discount * 0.01)
            } else {
                if (this.product.count <= 0) newcost = this.product.cost
                else newcost = this.product.cost * this.product.count
            }
            return newcost.toFixed(2)
        }
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
        &__image {
            position: relative;
            margin: 1em;
            &__discount  {
                position: absolute;
                background-image: url('../assets/percentage.svg');
                background-size: contain;
                width: 25%;
                height: 25%;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
        }
        &__title {
            height: 20%;
            text-transform: uppercase;
            font-weight: bold;
            margin: 1em;
            flex-grow: 1;
        }
        &__ingredients {
            color: #777;
            flex-grow: 2;
        }
        &__cost, &__discount {
            margin: 1em;
            height: 20%;
        }
        &__discount {
            position: relative;
            &__old-cost {
                position: absolute;
                font-size: 1rem;
                top: -30%;
	            left: -30%;
                text-decoration: line-through;
                color: #555;
            }
        }
        &__count {
        }
    }
    .cost {
        font-size: 1.3rem;
        &::after {
            content: '\20BD';
            position: absolute;
            margin-left: 0.1em;
        }
    }
    .img {
        width: 100%;
        background-color: white;
    }
    .big-img {

    }
    .small_img {
        width: 5em;
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