<template>
    <div class="item">
        <div class="item__block-product">
            <div class="item__type">{{item.type}}</div>
            <div class="item__title">{{item.title}}</div>
            <div class="item__ingredients" v-if="item.ingredients">{{item.ingredients.join(',')}}</div>
        </div>
        <div class="item__block-cost">
             <div class="item__count">
                <CountButtons :id="item.id"/>
            </div>
            <div class="item__cost">{{item.cost * item.count}}</div>
        </div>
        <div class="item__delete">
            <button class="btn-delete" @click="removeItem"></button>
        </div>
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
        align-items: center;
        justify-content: space-between;
        font-size: 1rem;
        padding: 0.7em;
        border-bottom: 1px solid #ccc;
        &__block-product {
            display: flex;
            align-items: center;
            width: 60%;
            margin: 0 1em;
        }
        &__block-cost {
            display: flex;
            align-items: center;
        }
        &__type {
            margin-right: 1em;
            width: 5em;
        }
        &__title {
            text-align: left;
            width: 30%;
        }
        &__ingredients {
            text-align: left;
            width: 70%;
            word-break: break-all;
        }
        &__cost {
            font-size: 1.2rem;
            text-align: center;
            margin: 0 2em;
            width: 5em;
            &::after {
                content: '\20BD';
                margin-left: 0.1em;
            }
        }
        &__cost {}
        @media screen and (max-width: 1200px) {
            &__block-product {
                flex-direction: column;
                align-items: flex-start;
            }
            &__block-cost {
                flex-direction: column-reverse;
                align-items: center;
            }
            &__title, &__ingredients {
                width: 90%;
            }
            &__ingredients {
                font-size: 0.8rem;
            }
        }
        @media screen and (max-width: 700px) {
            font-size: 1.5rem;
            flex-direction: column;
            align-items: flex-start;
            &__block-product {
                margin: 0 0 1em;
                width: 100%;
            }
            &__ingredients {
                font-size: 1rem;
            }
            &__block-cost {
                flex-direction: row;
                margin-bottom: 1em;
                width: 100%;
            }
            &__cost {
                font-size: 1.5rem;
            }
            &__delete {
                width: 100%;
                text-align: right;
            }
        }
        .btn-delete {
            border: none;
            width: 2em;
            height: 2em;
            background-color: transparent;
            background-image: url('../assets/delete.svg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            cursor: pointer;
        }
    }
</style>