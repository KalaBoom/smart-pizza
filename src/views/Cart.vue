<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div class="order" v-if="cart.length">
      <div class="order__items">
        <CartItem
          v-for="(item, index) in cart"
          :key="index"
          :item="item"
        />
      </div>
    <div class="order__sum">Сумма заказа: {{sum}}</div>
    <div class="order__btn">
      <button class="btn-order" @click="submitOrder">Оформить заказ</button> 
    </div>
    </div>
    <div class="none-items" v-else>Нет товаров в корзине</div>
    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CartItem from '@/components/CartItem.vue'

export default {
  computed: {
    ...mapGetters(["cart"]),
    sum() {
      return this.cart.reduce((acc, item) => (item.cost * item.count) + acc, 0)
    }
  },
  methods: {
    submitOrder() {
      const order = this.cart.map(item => {
        return `${item.type} ${item.title} ${item.count}шт. ${item.cost*item.count}руб.`
      })
      order.push(`Итого ${this.sum}`)
      console.log(order)
    }
  },
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
  .order {
    &__items {
      border: 1px solid #ccc;
      border-radius: 5px;
      border-bottom: none;
    }
    &__sum {
      font-size: 2rem;
      font-weight: bold;
      text-align: right;
    }
    &__btn {
      text-align: right;
    }
  }
  .btn-order {
    font-size: 1.2rem;
    padding: 0.5em;
  }
</style>
