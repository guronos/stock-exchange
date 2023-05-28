<template>
    <div class="v-container">
    <div v-if="!store.state.haveResponseData">
        <div v-if="!store.state.connect">
            <TheErrors />
            <div class="my-4 text-h6">
    Укажите тикеры валют которые вас интересуют в формате 'tikertiker', без пробелов и иных символов.<br />
    Например 'BNB/BTC' следует указывать - 'BNBBTC'
</div>
    <v-text-field label="Tikers" v-model="tikers" ></v-text-field>

  <v-btn color="teal-lighten-2" @click="store.dispatch('getAPIData', tikers)">Запрос</v-btn>
</div>
<div v-else>
    <TheLoading />
</div>
</div>
<template v-if="store.state.haveResponseData">
   <DataGlass />
</template>
</div>
</template>
<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useStore } from '../store/store.ts'
import DataGlass from '../components/DataGlass.vue'
import TheErrors from '../components/TheErrors.vue'
import TheLoading from '../components/TheLoading.vue'

const store = useStore()
const tikers = ref('BNBBTC')
onUnmounted(()=>{
    console.log('Размонтировано')
    store.commit('closeStream')
})
</script>
<style>

</style>