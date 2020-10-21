<template>
  <div class="home">
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

        <div class="filters">
            <input type="search" v-model="search" @input="searchProducts" placeholder="поиск..." class="filters__search">
            <div class="filters__cost" @click="changeModeFilterCost">
                фильтр по цене
                <div class="arrow" :class="[{arrow_top: !modeFilterCost}, {arrow_bottom: modeFilterCost}]"></div>
            </div>
        </div>

        <div class="products" v-if="products.length">
            <CardProduct v-for="(product, index) in products"
                :key="index"
                :product="product"
                :inCart="cartIds.includes(product.id)"
                :smallImg="false"
                class="product"
            />
        </div>
        <div class="products-none" v-else>Ничего не найдено</div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import CardProduct from '@/components/CardProduct.vue'
export default {
  name: 'Home',
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
        let resultProducts = null
        if(this.search === "") {
            if (this.nowCategory === 'all') resultProducts = this.allProducts
            if (this.nowCategory === 'pizza') resultProducts = this.productsPizza
            if (this.nowCategory === 'snacks') resultProducts = this.productsSnack
            if (this.nowCategory === 'drink') resultProducts = this.productsDrink
        } else {
            resultProducts = this.searchProducts()
        }
        return this.filterCost(resultProducts)
    }
  },
  async mounted() {
      this.getProducts()
  },
  methods: {
    ...mapActions(['getProducts']),
    filterCost(arr) {
        if(this.modeFilterCost) return arr.sort((a,b) => this.calcDiscount(a) - this.calcDiscount(b))
        else return arr.sort((a,b) => this.calcDiscount(b) - this.calcDiscount(a))
    },
    calcDiscount(a) {
        if (a.discount) {
            return a.cost * (1 - a.discount * 0.01)
        } else {
            return a.cost
        }
    },
    changeModeFilterCost() {
        this.modeFilterCost = !this.modeFilterCost
    },
    searchProducts() {
        let searchedArr = null
        if (this.nowCategory === 'all') searchedArr = this.allProducts
        if (this.nowCategory === 'pizza') searchedArr = this.productsPizza
        if (this.nowCategory === 'snacks') searchedArr = this.productsSnack
        if (this.nowCategory === 'drink') searchedArr = this.productsDrink

        return searchedArr.filter(product => {
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
    }
    .nav {
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: auto;
        padding: 0 0.5em;
        @media screen and (max-width: 800px) {
            flex-direction: column-reverse;
            justify-content: space-between;
        }
    }
    .category {
        display: flex;
        align-items: center;
        &__radio-btn {
            margin-right: 1em;
            text-align: center;
            & input[type=radio] {
                display: none;
            }
            & label {
                display: inline-block;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.2em 1em;
                border: 1px solid #999;
                border-radius: 5px;
                user-select: none;
            }
        }
        @media screen and (max-width: 800px) { 
            justify-content: space-between;
            &__radio-btn {
                flex: 1;
                margin: 0;
                & label {
                    font-size: 1.3rem;
                    padding: 0.3em 0.8em;
                    width: 60%;
                    text-align: center;
                }
                &:first-child {
                    text-align: left;
                }
                &:last-child {
                    text-align: right;
                }
            }
        }
        @media screen and (max-width: 500px) {
            flex-direction: column;
            &__radio-btn {
                margin-top: 0.1em;
            }
            &__radio-btn {
                width: 100%;
                padding: 0.5em;
                &:first-child, &:last-child {
                    text-align: center;
                }
            }
            &__radio-btn label {
                width: 90%;
            }
        }
    }
    .active_category {
        background-color: orange;
        border: 1px solid orange !important;
        color: white;
    }
    .filters {
        display: flex;
        text-align: center;
        margin: 1em auto;
        width: 90%;
        &__cost {
            position: relative;
            width: 10em;
            background-color: orange;
            color: white;
            padding: 0.5em 2em 0.5em 0.3em;
            border-radius: 5px;
            text-align: left;
            cursor: pointer;
            @media screen and (max-width: 600px) {
                margin: 1em auto 0;
                width: 95%;
                font-size: 1.5rem;
                padding: 0.3em 0.3em;
            }
        }
        &__search {
            margin-right: 2em;
            width: 16em;
            font-size: 1.5rem;
            @media screen and (max-width: 600px) {
                width: 100%;
                margin: auto;
            }
        }
        @media screen and (max-width: 800px) {
            justify-content: space-between;

        }
        @media screen and (max-width: 600px) {
            flex-direction: column;

        }
    }
    .basket-link {
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
        @media screen and (max-width: 800px) {
            margin-bottom: 1em;
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