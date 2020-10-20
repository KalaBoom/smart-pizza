<template>
    <div class="count-btns">
        <div class="count-btns__left" @click="minusCount">&minus;</div>
        <div class="count-btns__count">{{productCount}}</div>
        <div class="count-btns__right" @click="plusCount">&plus;</div>
    </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
    props: {
        id: Number
    },
    data() {
        return {
            count: null
        }
    },
    mounted() {
        this.count = this.findCountItem(this.id)
    },
    computed: {
        ...mapGetters(['cart']),
        productCount: {
            set: function(value) {
                this.count = value
            },
            get: function() {
                return this.count
            }
        }
    },
    methods: {
        ...mapMutations(['changeCount', 'removeItemToCart']),
        minusCount() {
            this.changeCount([this.id, --this.productCount])
            if(this.productCount === 0) this.removeItemToCart(this.id)
        },
        plusCount() {
            this.changeCount([this.id, ++this.productCount])
        },
        findCountItem(id) {
            const item = this.cart.find(item => item.id === id)
            return item.count
        }
    },
}
</script>

.<style lang="scss">
    .count-btns {
        display: flex;
        justify-content: center;
        &__left, &__right, &__count {
            padding: 0.5em;
        }
        &__left, &__right {
            background-color: orange;
            cursor: pointer;
        }
        &__count {
        
        }
    }
</style>