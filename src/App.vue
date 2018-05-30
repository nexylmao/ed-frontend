<template>
  <div id="app">
    <modals-container/>
    <router-view/>
  </div>
</template>

<style>
body {
    background-image: url("assets/tree.jpg");
    background-size: cover;
    background-blend-mode: darken;
    background-color: #111111;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eeeeee;
}
</style>
