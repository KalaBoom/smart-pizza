<template>
    <div class="catalog">

        <div class="category">
            <div class="category__radio-btn">
                <label :class="{active_category: nowCategory === 'pizza'}">
                    Пицца
                    <input type="radio" value="pizza" v-model="nowCategory">
                </label>
            </div>
            <div class="category__radio-btn">
                <label :class="{active_category: nowCategory === 'snacks'}">
                    Закуски
                    <input type="radio" value="snacks" v-model="nowCategory">
                </label>
            </div>
            <div class="category__radio-btn">
                <label :class="{active_category: nowCategory === 'drink'}">
                    Напитки
                    <input type="radio" value="drink" v-model="nowCategory">
                </label>
            </div>
        </div>

        <div class="filter-cost" @click="changeModeFilterCost">
            <div class="filter-cost__text">
                фильтр по цене
                <div class="arrow" :class="[{arrow_top: !modeFilterCost}, {arrow_bottom: modeFilterCost}]"></div>
            </div>
        </div>

        <div class="products">
            <CardProduct v-for="(product, index) in products"
                :key="index"
                :product="product"
            />
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import CardProduct from '@/components/CardProduct.vue'
export default {
    data() {
        return {
            nowCategory: "pizza",
            modeFilterCost: false
        }
    },
    computed: {
        ...mapGetters(['productsPizza', 'productsSnack', 'productsDrink']),
        products() {
            let resultProducts = null
            if (this.nowCategory === 'pizza') resultProducts = this.productsPizza
            if (this.nowCategory === 'snacks') resultProducts = this.productsSnack
            if (this.nowCategory === 'drink') resultProducts = this.productsDrink
            return this.filterCost(resultProducts)
        }
    },
    methods: {
        filterCost(arr) {
            if(this.modeFilterCost) return arr.sort((a,b) => a.cost - b.cost)
            else return arr.sort((a,b) => b.cost - a.cost)
        },
        changeModeFilterCost() {
            this.modeFilterCost = !this.modeFilterCost
        }
    },
    components: {
        CardProduct
    }
}
</script>

<style lang="scss">
    .category {
        display: flex;
        justify-content: center;
        &__radio-btn {
            margin-right: 1em;
            & input[type=radio] {
                display: none;
            }
            & label {
                display: inline-block;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0px 0.5em;
                border: 1px solid #999;
                border-radius: 5px;
                user-select: none;
            }
            & label:hover {
                color: #666;
            }
        }
    }
    .active_category {
        background-color: red;
    }
    .filter-cost {
        text-align: center;
        margin: 1em 0;
        &__text {
            position: relative;
            width: 10em;
            margin: auto;
            background-color: rosybrown;
            padding: 0.5em;
            border-radius: 5px;
            padding-right: 2em;
            cursor: pointer;
        }
    }
    .arrow {
        position: absolute;
        right: 7%;
        top: 40%;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        &_top {
            border-top-color: orangered;
            border-bottom: 0;
        }
        &_bottom {
            border-bottom-color: yellowgreen;
             border-top: 0;
        }
    }
    .products {
        display: flex;
        width: 90%;
        margin: auto;
        flex-wrap: wrap;
    }
</style>