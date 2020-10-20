<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  :root {
    font-size: 16px;
  }
  $size-logo: 5em;
  .icon-logo {
    width: $size-logo;
    height: $size-logo;
    margin-left: 5em;
  }
  a {
    text-decoration: none;
  }
</style>
