<template>
    <div class="item">
        <div class="item__type">{{item.type}}</div>
        <div class="item__title">{{item.title}}</div>
        <div class="item__count">
            <CountButtons :id="item.id"/>
        </div>
        
        <div class="item__cost">{{item.cost}}</div>
        <button class="item__btn" @click="removeItem"></button>
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
        padding: 0.7em;
        border-bottom: 1px solid #ccc;
        &__type {
            flex: 0 0 auto;
            margin-right: 1em;
            width: 5em;
        }
        &__title {
            flex: 1 1 auto;
            text-align: left;
        }
        &__cost {
            text-align: center;
            flex: 0 0 auto;
            margin: 0 2em;
            width: 5em;
            &::after {
                content: '\20BD';
                margin-left: 0.1em;
            }
        }
        &__type, &__title, &__cost {
            line-height: 2em;
            vertical-align: middle;
        }
        &__count {
            
        }
        &__btn {
            flex: 0 0 auto;
            border: none;
            width: 2em;
            height: 2em;
            background-color: transparent;
            background-image: url('../assets/delete.svg');
            background-size: contain;
            cursor: pointer;
        }
    }
</style>