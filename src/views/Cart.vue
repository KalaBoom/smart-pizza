<template>
  <div class="cart">
    <CartItem 
      v-for="(item, index) in cart"
      :key="index"
      :item="item"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CartItem from '@/components/CartItem.vue'

export default {
  computed: mapGetters(["cart"]),
  components: {
    CartItem
  }
}
</script>
