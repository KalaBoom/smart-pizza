<template>
  <div class="basket">
    <router-link to="/"><img src="../assets/pizza-slice.svg" alt="иконка пиццы" class="icon-logo"></router-link>
    <div class="cart">
      <h1>Корзина</h1>
      <div class="order" v-if="cart.length">
          <div class="order__items">
            <CardProduct v-for="(item, index) in cart"
              :key="index"
              :product="item"
              :inCart="true"
              :smallImg="true"
              class="item"
            >
            <div class="block-delete">
              <button class="btn-delete" @click="removeItem(item.id)"></button>
            </div>
            </CardProduct>
          </div>
          <div class="order__sum">Сумма заказа: <span class="cost">{{cartSum}}</span></div>
          <div class="order__btn">
              <router-link to="/"><button class="accent-btn btn-back">Вернуться</button></router-link>
              <button class="accent-btn" @click="submitOrder">Оформить</button>
          </div>
      </div>
      <div class="none-items" v-else>Нет товаров в корзине</div>
  </div>   
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import CardProduct from '@/components/CardProduct.vue'

export default {
  name: 'Basket',
  computed: mapGetters(["cart", "cartSum"]),
  methods: {
    ...mapMutations(['removeItemToCart']),
    removeItem(id) {
        this.removeItemToCart(id)
    },
    async submitOrder() {
      let order = {
        products: [],
        sum: null
      }
      order.products = this.cart.map(item => {
        const itemOrder = {
          type: item.type,
          title: item.title,
          count: item.count,
          cost: item.count * item.cost
        }
        if(item.discount) itemOrder.cost *= (1 - item.discount * 0.01)
        return itemOrder
      })
      order.sum = this.cartSum
      await fetch('/order', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(order)
      })
      console.log(JSON.stringify(order))
    }
  },
  components: {
    CardProduct
  }
}
</script>

<style lang="scss">
  .basket {
    width: 90%;
    margin: auto;
  }
  .block-delete {
    margin-left: 1.5em;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    padding: 0.7em;
    border-bottom: 1px solid #ccc;
    @media screen and (max-width: 700px) {
      font-size: 1.5rem;
      flex-direction: column;
      align-items: flex-start;
      .block-delete {
        width: 100%;
        text-align: right;
        margin: 0;
      }
      .product__title, .product__cost {
        margin: 1em 0;
      }
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
      margin-top: 1em;
      font-size: 1.2rem;
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