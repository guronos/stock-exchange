<template>
  <div class="header bg-grey-lighten-3 d-flex justify-space-evenly py-4 elevation-1">
    <router-link to="/">
      <v-btn color="teal-lighten-5">Главная страница</v-btn>
    </router-link>
    <router-link to="glass">
      <v-btn color="teal-lighten-5">Биржевой стакан</v-btn>
    </router-link>
  </div>
</template>

<style>
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
