<template>
    <div>
        <div class="category">
            <input type="radio" value="pizza" v-model="nowCategory">
            <label>Пицца</label>
            <input type="radio" value="snacks" v-model="nowCategory">
            <label>Закуски</label>
            <input type="radio" value="drink" v-model="nowCategory">
            <label>Напитки</label>
        </div>
        <span @click="changeModeFilterCost">фильтр по цене</span>
        <CardProduct v-for="(product, index) in products"
            :key="index"
            :product="product"
        />
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import CardProduct from '@/components/CardProduct.vue'
export default {
    data() {
        return {
            nowCategory: "pizza",
            modeFilterCost: true
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