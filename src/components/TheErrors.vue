<template>
  <div class="text-red-accent-4 text-h4" v-if="store.state.errorMessage === 1">
    Произошла ошибка. <br />
    Неудается подключится к серверу по по WebSocket, попробуйте позднее.
  </div>
  <div class="text-red-accent-4 text-h4" v-if="store.state.errorMessage === 2">
    Произошла ошибка. <br />
    Возможно, Вы некорректно указали тикер, проверьте корректность ввода и пропробуйте еще раз
  </div>
  <div class="text-red-accent-4 text-h4" v-if="store.state.errorMessage === 3">
    Соединение было разорвано до подключения, либо произошла иная ошибка при получении данных WebSocket. <br />
    Попробуйте еще раз.
  </div>
</template>
<script setup lang="ts">
import { useStore } from '../store/store.ts';
const store = useStore();
</script>
