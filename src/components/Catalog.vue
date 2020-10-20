<template>
    <div>
        <header class="header">
            <router-link to="/"><img src="../assets/pizza-slice.svg" alt="иконка пиццы" class="icon-logo"></router-link>
            <input type="search" v-model="search" @input="searchProducts" placeholder="поиск...">
        </header>

        <div class="catalog">

            <div class="nav">
                <div class="category">
                    <div class="category__radio-btn">
                    <label :class="{active_category: nowCategory === 'all'}">
                        Все
                        <input type="radio" value="all" v-model="nowCategory">
                    </label>
                </div>
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
            
                <router-link to="/basket" class="basket">
                    <img src="../assets/shopping-cart.svg" alt="иконка корзины" class="basket__icon">
                    <div class="basket__count">{{cartCount}}</div>
                    <div>Корзина: <span class="basket__sum">{{cartSum}}</span></div>
                </router-link>
                    
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
                    :inCart="cartIds.includes(product.id)"
                />
            </div>

        </div>

    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import CardProduct from '@/components/CardProduct.vue'
export default {
    data() {
        return {
            nowCategory: "all",
            modeFilterCost: false,
            search: ""
        }
    },
    computed: {
        ...mapGetters(['allProducts','productsPizza', 'productsSnack', 'productsDrink', 'cartIds', 'cartSum', "cartCount"]),
        products() {
            if(this.search === "") {
                let resultProducts = null
                if (this.nowCategory === 'all') resultProducts = this.allProducts
                if (this.nowCategory === 'pizza') resultProducts = this.productsPizza
                if (this.nowCategory === 'snacks') resultProducts = this.productsSnack
                if (this.nowCategory === 'drink') resultProducts = this.productsDrink
                return this.filterCost(resultProducts)
            } else {
                return this.searchProducts()
            }
            
        }
    },
    methods: {
        filterCost(arr) {
            if(this.modeFilterCost) return arr.sort((a,b) => a.cost - b.cost)
            else return arr.sort((a,b) => b.cost - a.cost)
        },
        changeModeFilterCost() {
            this.modeFilterCost = !this.modeFilterCost
        },
        searchProducts() {
            return this.allProducts.filter(product => {
                const reqex = product.title.toLowerCase().includes(this.search)
                if(reqex) return product
            })
        }
    },
    components: {
        CardProduct
    }
}
</script>

<style lang="scss">
    .nav {
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: auto;
        padding: 0 0.5em;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto 2em;
        padding-right: 5%;
    }
    .category {
        display: flex;
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
        }
    }
    .active_category {
        background-color: orange;
        border: 1px solid orange !important;
        color: white;
    }
    .filter-cost {
        text-align: center;
        margin: 1em 0;
        &__text {
            position: relative;
            width: 10em;
            margin: auto;
            background-color: orange;
            color: white;
            padding: 0.5em 2em 0.5em 0;
            border-radius: 5px;
            cursor: pointer;
        }
    }
    .basket {
        display: flex;
        justify-content: space-around;
        position: relative;
        align-items: center;
        vertical-align: middle;
        background-color: orange;
        width: 15em;
        height: 3em;
        border-radius: 10px;
        color:white;
        &__icon {
            width: 2em;
            height: 2em;
        }
        &__sum {
            &::after {
                content: '\20BD';
                margin-left: 0.1em;
            }
        }
        &__count {
            position: absolute;
            color: white;
            background-color: orangered;
            height: 1.5em;
            width: 1.5em;
            text-align: center;
            line-height: 1.5em;
            vertical-align: middle;
            border-radius: 100px;
            top: 0;
            left: 15%;
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
            border-bottom-color: orangered;
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