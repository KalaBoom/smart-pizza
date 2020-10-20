<template>
  <div>
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