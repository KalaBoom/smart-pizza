<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div class="items" v-if="cart.length">
      <CartItem
      v-for="(item, index) in cart"
      :key="index"
      :item="item"
    />
    </div>
    <div class="none-items" v-else>Нет товаров в корзине</div>
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

<style lang="scss">
  .cart {
    width: 60%;
    margin: auto;
  }
  .items {
    border: 1px solid #ccc;
    border-radius: 5px;
    border-bottom: none;
  }
</style>
