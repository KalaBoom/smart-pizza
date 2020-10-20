<template>
  <div id="app">
    <div id="nav" class="nav">
      <router-link to="/"><img src="./assets/pizza-slice.svg" alt="иконка пиццы" class="icon"></router-link>
      <router-link to="/cart"><img src="./assets/shopping-cart.svg" alt="иконка корзины" class="icon"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  :root {
    font-size: 16px;
  }
  .nav {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: auto;
  }
  $size-icon: 5em;
  .icon {
    width: $size-icon;
    height: $size-icon;
  }
</style>
