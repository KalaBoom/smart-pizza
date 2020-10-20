<template>
    <div class="item">
        <div class="item__title">{{item.title}}</div>
        <div class="item__cost">{{item.cost}}</div>
        <button class="item__btn" @click="removeItem">Удалить</button>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    props: {
        item: Object
    },
    methods: {
        ...mapMutations(['removeItemToCart']),
        removeItem() {
            this.removeItemToCart(this.item.id)
        }
    }
}
</script>

<style lang="scss">
    .item {
        display: flex;
        padding: 0.5em;
        border-bottom: 1px solid #ccc;
        &__title {
            flex: 1 1 auto;
        }
        &__cost {
            flex: 0 0 auto;
            width: 5em;
            &::after {
                content: '\20BD';
                margin-left: 0.1em;
            }
        }
        &__btn {
            flex: 0 0 auto;
        }
    }
</style>