<template>
    <div>
        <span>
            {{item.type}}
            {{item.title}}
            {{item.cost}}
        </span>
        <button @click="removeItem">Удалить</button>
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