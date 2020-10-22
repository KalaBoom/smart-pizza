<template>
  <div class="basket">
    <div class="cart">
      <h1>Корзина</h1>
      <div class="order" v-if="cart.length">
          <div class="order__items">
            <CardProduct v-for="(item, index) in cart"
              :key="index"
              :product="item"
              class="item"
            >
            <div class="block-delete">
              <button class="btn-delete" @click="removeItem(item.id)"></button>
            </div>
            </CardProduct>
          </div>
          <div class="order__sum">Сумма заказа: <span class="cost order__sum__num">{{cartSum}}</span></div>
          <div class="order__btn">
              <router-link to="/"><button class="accent-btn btn-back">Вернуться</button></router-link>
              <button class="accent-btn" @click="submitOrder">Оформить</button>
          </div>
      </div>
      <div class="none-items" v-else>Нет товаров в корзине</div>
    </div>
    <Modal v-if="showModal" @close="showModal = false">Ваш заказ принят</Modal>   
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import CardProduct from '@/components/CardProduct.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'Basket',
  data() {
    return {
      showModal: false
    }
  },
  computed: mapGetters(["cart", "cartSum"]),
  methods: {
    ...mapMutations(['removeItemToCart', 'clearCart']),
    removeItem(id) {
        this.removeItemToCart(id)
    },
    async submitOrder() {
      this.showModal = true

      let order = {products: [], sum: null}

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
      this.clearCart()
    }
  },
  components: {
    CardProduct, Modal
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
    .product {
      &__image {
        width: 5em;
      }
      &__title {
        width: 10%;
      }
      &__ingredients {
        width: 20%;
      }
      &__discount__old-cost {
        top: -100%;
        right: 0;
      }
      @media screen and (max-width: 800px) {
        &__title,  &__ingredients {
          width: 100%;
        }
        &__title, &__cost {
          margin: 1em 0;
        }
        &__cost, &__discount {
          font-size: 1.5rem;
          margin: 1em;
          margin-left: 0;
        }
        &__discount__old-cost {
          top: 0;
          right: -80%;
        }
        &__count {
          width: 10em;
        }
      }
    }
    @media screen and (max-width: 800px) {
      font-size: 1.5rem;
      flex-direction: column;
      align-items: flex-start;
      .block-delete {
        width: 100%;
        text-align: right;
        margin: 0;
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
    @media screen and (max-width: 1000px) {
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
      padding-right: 1em;
      @media screen and (max-width: 336px) {
        padding-right: 0;
      }
      &__num {
        display: inline;
        @media screen and (max-width: 336px) {
          display: block;
          padding-right: 1em;
        }
      }
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