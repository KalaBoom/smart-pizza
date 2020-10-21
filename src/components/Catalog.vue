<template>
    <div>
        <header class="header">
            <router-link to="/"><img src="../assets/pizza-slice.svg" alt="иконка пиццы" class="icon-logo"></router-link>
            <input type="search" v-model="search" @input="searchProducts" placeholder="поиск..." class="search">
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
            
                <router-link to="/basket" class="basket-link">
                    <img src="../assets/shopping-cart.svg" alt="иконка корзины" class="basket-link__icon">
                    <div class="basket-link__count">{{cartCount}}</div>
                    <div>Корзина: <span class="basket-link__sum">{{cartSum}}</span></div>
                </router-link>
                    
            </div>

            <div class="filter-cost">
                <div class="filter-cost__text" @click="changeModeFilterCost">
                    фильтр по цене
                    <div class="arrow" :class="[{arrow_top: !modeFilterCost}, {arrow_bottom: modeFilterCost}]"></div>
                </div>
            </div>

            <div class="products" v-if="products.length">
                <CardProduct v-for="(product, index) in products"
                    :key="index"
                    :product="product"
                    :inCart="cartIds.includes(product.id)"
                />
            </div>
            <div class="products-none" v-else>Ничего не найдено</div>
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
            search: "",
            isFound: true
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
        @media screen and (max-width: 700px) {
            flex-direction: column;
        }
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto 2em;
        width: 90%;
        @media screen and (max-width: 400px) {
            flex-direction: column;
            .search {
                width: 100%;
            }
        }
    }
    .search {
        width: 20em;
    }
    .category {
        display: flex;
        align-items: center;
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
        @media screen and (max-width: 500px) {
            flex-direction: column;
            &__radio-btn {
                margin-top: 0.1em;
            }
            &__radio-btn, &__radio-btn label {
                width: 100%;
                padding: 0.5em;
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
        margin: 1em auto;
        width: 90%;
        &__text {
            position: relative;
            width: 10em;
            background-color: orange;
            color: white;
            padding: 0.5em 2em 0.5em 0;
            border-radius: 5px;
            cursor: pointer;
            @media screen and (max-width: 500px) {
                margin: auto;
            }
        }
    }
    .basket-link {
        margin-top: 1em;
        display: flex;
        justify-content: space-around;
        position: relative;
        align-items: center;
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
        @media screen and (max-width: 500px) {
            margin: auto;
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
    .products-none {
        width: 90%;
        margin: auto;
        font-size: 2rem;
    }
</style>