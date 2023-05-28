<template>
  <div class="v-container">
    <TheHeader />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
</script>
