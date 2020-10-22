<template>
    <div class="count-btns">
        <div class="count-btns__arrow" @mousedown="minusCount">&minus;</div>
        <div class="count-btns__count">{{productCount}}</div>
        <div class="count-btns__arrow" @mousedown="plusCount">&plus;</div>
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
    watch: {
        count() {
            this.count = this.findCountItem(this.id)
        }
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
            if (this.productCount <= 0) this.removeItemToCart(this.id)
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