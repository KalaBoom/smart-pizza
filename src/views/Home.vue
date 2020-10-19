<template>
  <div class="home">
    <Catalog v-bind:products="products"/>
  </div>
</template>

<script>
import Catalog from '@/components/Catalog.vue'
export default {
  name: 'Home',
  data() {
    return {
      products: [
        {type: 'пицца', title: 'Перерони', cost: 300},
        {type: 'пицца', title: 'Маргарита', cost: 500},
        {type: 'пицца', title: 'Ананасовая', cost: 700},
        {type: 'пицца', title: 'Гавайская', cost: 800},
        {type: 'пицца', title: 'Сырная', cost: 400},
        {type: 'закуска', title: 'сэндвич-ролл куриный', cost: 199},
        {type: 'закуска', title: 'картофель фри', cost: 149},
        {type: 'закуска', title: 'куриные крылья BBQ', cost: 199},
        {type: 'напитки', title: 'Кофе Латте', cost: 115},
        {type: 'напитки', title: 'Pepsi', cost: 119}
      ]
    }
  },
  components: {
    Catalog
  }
}
</script>
