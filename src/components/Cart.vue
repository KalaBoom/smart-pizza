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
            <div class="order__sum">Сумма заказа: {{cartSum}}</div>
            <div class="order__btn">
                <router-link to="/"><button class="accent-btn btn-back">Вернуться назад</button></router-link>
                <button class="accent-btn" @click="submitOrder">Оформить заказ</button>
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
    width: 55%;
    margin: auto;
    font-size: 1.2rem;
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
      text-align: right;
    }
  }
  .btn-back {
    background-color: white;
    color: orange;
    margin-right: 1em;
  }
</style>