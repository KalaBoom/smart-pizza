<template>
  <div id="app">
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
</style>
