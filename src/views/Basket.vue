<template>
  <div class="basket">
    <router-link to="/"><img src="../assets/pizza-slice.svg" alt="иконка пиццы" class="icon-logo"></router-link>
    <Cart/>    
  </div>
</template>

<script>
import Cart from '@/components/Cart.vue'
export default {
  components: {
    Cart
  }
}
</script>

<style lang="scss">
  .basket {
    width: 90%;
    margin: auto;
  }
</style>