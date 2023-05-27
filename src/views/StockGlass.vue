<template>
  <v-btn color="primary" @click="store.dispatch('getAPIData')">Запрос</v-btn>
<template v-if="!asks.lenght">
    <div>
        {{ userOrdersAsks }}
        <table>
            <caption>Биржевой стакан {{ store.getters.showTikers }}</caption>
            <th>Цена</th>
            <th>Количество</th>
            <tr class="bg-red" v-for="(ask, idx) in asks" :key="idx">
                <td>
                    {{ ask[0] }}
                </td>
                <td>
                    {{ Number(ask[1]) }}
                </td>
            </tr>
            <tr>
                <td>Spred</td>
                <td>{{ spred }}</td>
            </tr>
            <tr class="bg-green" v-for="(bid, idx) in bids" :key="idx">
                <td>
                    {{ bid[0] }}
                </td>
                <td>
                    {{ Number(bid[1]) }}
                </td>
            </tr>

        </table>
    </div>
</template>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../store/store.ts'

const store = useStore()
// const get = ()=>{
//   store.dispatch('getAPIData')
// }
const asks = computed(()=>store.getters.showOrdersAsks.reverse())
const bids = computed(()=>store.getters.showOrdersBids)
const spred = computed(()=>((store.getters.showOrdersAsks[store.getters.showOrdersAsks.length-1]?.[0]-store.getters.showOrdersBids[0]?.[0]).toFixed(6)))
const userOrdersAsks = computed(()=>store.getters.showUserOrdersAsks)
const userOrdersBids =computed(()=>store.getters.showUserOrdersBids)
</script>
<style>

</style>