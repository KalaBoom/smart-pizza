<template>
    <div>
        <div class="product__image" >
            <img :src="imgs[product.type]" alt="изображение" class="img">
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
        <div class="count-btns" v-if="product.count > 0">
            <div class="count-btns__arrow" @mousedown="minusCount">&minus;</div>
            <div class="count-btns__count">{{product.count}}</div>
            <div class="count-btns__arrow" @mousedown="plusCount">&plus;</div>
        </div>
        <button class=" accent-btn" @click="addItemToCart(product)" v-else>в корзину</button>
        <slot></slot>
    </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'

export default {
    props: {
        product: Object,
        calcTotalCost: Boolean
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
        ...mapGetters(['cart']),
        cost() {
            let newcost = this.calcCost()
            if (this.product.discount) newcost *= (1 - this.product.discount * 0.01)
            return newcost.toFixed(2)
        }
    },
    methods: {
        ...mapMutations(['addItemToCart', 'removeItemToCart', 'changeCount']),
        calcCost() {
            if (this.product.count <= 0 || this.calcTotalCost === false) return this.product.cost
            return this.product.cost * this.product.count 
        },
        findCountItem(id) {
            const item = this.cart.find(item => item.id === id)
            console.log(item.title, item.count)
            return item.count
        },
        minusCount() {
            this.changeCount([this.product.countid, --this.product.count])
            if (this.product.count <= 0) this.removeItemToCart(this.product.id)
        },
        plusCount(count) {
            this.changeCount([this.product.id, ++this.product.count])
        },
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
        }
        &__discount {
            position: relative;
            &__old-cost {
                position: absolute;
                font-size: 1.2rem;
                top: -60%;
	            right: -3em;
                text-decoration: line-through;
                color: orangered;
            }
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
    .count-btns {
        display: flex;
        justify-content: space-between;
        border: 1px solid #ccc;
        border-radius: 10px;
        width: 8em;
        font-size: 1.2rem;
        padding: 0.1em;
        -moz-border-radius: 10px;
	    -webkit-border-radius: 10px;
        &__arrow, &__count {
            padding: 0.5em;
            user-select: none;
            text-align: center;
        }
        &__arrow {
            flex: 1;
            background-color: white;
            cursor: pointer;
            &:hover {
                color: orange;
            }
        }
        @media screen and (max-width: 400px) {
            width: 80%;
        }
    }
</style>