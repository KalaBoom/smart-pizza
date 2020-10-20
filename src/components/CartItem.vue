<template>
    <div class="item">
        <div class="item__title">{{item.title}}</div>
        <CountButtons :id="item.id"/>
        <div class="item__cost">{{item.cost}}</div>
        <button class="item__btn" @click="removeItem">Удалить</button>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import CountButtons from '@/components/CountButtons.vue'
export default {
    props: {
        item: Object
    },
    methods: {
        ...mapMutations(['removeItemToCart']),
        removeItem() {
            this.removeItemToCart(this.item.id)
        }
    },
    components: {
        CountButtons
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
            line-height: 2em;
            vertical-align: middle;
        }
        &__cost {
            text-align: center;
            flex: 0 0 auto;
            margin: 0 2em;
            width: 5em;
            line-height: 2em;
            vertical-align: middle;
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