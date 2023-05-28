<template>
    <div>
        Соединение...
        <div v-if="store.state.countAttempts === 1">Не удается установить соединение с сервером, попытка 2</div>
        <div v-if="store.state.countAttempts === 2">Все еще не удается установить соединение с сервером, попробуем еще. Binance не всегда отвечает по WebSocket</div>
        <div v-if="store.state.countAttempts === 3">Все еще не удается установить соединение с сервером, пробуем еще раз, в случае неудачи перезагрузим страницу, попробуйте отправить форму позже</div>
    </div>
    
    <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
</template>
<script setup lang="ts">
import { useStore } from '../store/store.ts'

const store = useStore()
</script>