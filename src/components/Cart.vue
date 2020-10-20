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
            <div class="order__sum">Сумма заказа: {{cartSum}}&#8381;</div>
            <div class="order__btn">
                <router-link to="/"><button class="accent-btn btn-back">Вернуться</button></router-link>
                <button class="accent-btn" @click="submitOrder">Оформить</button>
            </div>
        </div>
        <div class="none-items" v-else>Нет товаров в корзине</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CartItem from '@/components/CartItem.vue'

export default {
  computed: mapGetters(["cart", "cartSum"]),
  methods: {
    submitOrder() {
      const order = this.cart.map(item => `${item.type} ${item.title} ${item.count}шт. ${item.cost*item.count}руб.`)
      order.push(`Итого ${this.cartSum}`)
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
    width: 70%;
    margin: auto;
    font-size: 1.2rem;
    @media screen and (max-width: 1600px) {
      width: 80%;
    }
    @media screen and (max-width: 1200px) {
      width: 90%;
    }
    @media screen and (max-width: 800px) {
      width: 100%;
    }
  }
  
  .order {
    &__items {
      border-top: 1px solid #ccc;
    }
    &__sum {
      font-size: 2rem;
      font-weight: bold;
      text-align: right;
    }
    &__btn {
      margin-top: 1em;
      text-align: right;
    }
    @media screen and (max-width: 400px) {
      &__btn {
          display: flex;
          justify-content: space-between;
      }
      &__sum {
      font-size: 1.5rem;
    }
    }
  }
  .btn-back {
    background-color: white;
    color: orange;
    margin-right: 1em;
  }
</style>