<template>
  <div id="app">
    <header class="header">
      <router-link to="/"><img src="./assets/pizza-slice.svg" alt="иконка пиццы" class="icon-logo"><span class="name-pizza">smart pizza</span></router-link>
    </header>
    <router-view/>
  </div>
</template>

<style lang="scss">
  :root {
    font-size: 16px;
    @media screen and (max-width: 1400px) {
      & {
        font-size: 14px;
      }
    }
  }
  html {
    overflow-x: hidden;
    margin-right: calc(-1 * (100vw - 100%))
  }
  $size-logo: 5em;
  .icon-logo {
    width: $size-logo;
    height: $size-logo;
  }
  a {
    text-decoration: none;
  }
  .header {
    display: flex;
    align-items: center;
    margin: 0 auto 2em;
    width: 90%;
  }
  .name-pizza {
    color: orange;
    font-size: 3rem;
    font-style: italic;
    text-transform: uppercase;
  }
</style>
