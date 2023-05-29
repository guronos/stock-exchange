<template>
  <div>
    <v-table density="compact" class="mt-12 bg-grey-lighten-5 rounded-lg elevation-10">
      <caption class="bg-blue-grey-darken-2">
        Биржевой стакан
        {{
          tikersInfo
        }}
      </caption>
      <thead class="bg-blue-grey-darken-2">
        <th>Цена<v-divider /></th>
        <th>Количество<v-divider /></th>
        <th>Всего<v-divider /></th>
      </thead>
      <tbody class="text-body-2">
        <AllOrders :colorClass="'text-deep-orange-darken-3'" :orders="asks" :userOrders="userOrdersAsks" />
        <tr class="bg-blue-grey-lighten-1" v-if="spred">
          <td>Spred</td>
          <td>{{ Number(spred) }}%</td>
          <td></td>
        </tr>
        <AllOrders :colorClass="'text-green-accent-4'" :orders="bids" :userOrders="userOrdersBids" />
      </tbody>
    </v-table>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../store/store.ts';
import AllOrders from './AllOrders.vue';

const store = useStore();
const asks = computed(() => store.getters.showOrdersAsks.reverse());
const bids = computed(() => store.getters.showOrdersBids);
const spred = computed(() => ((store.getters.showOrdersAsks[store.getters.showOrdersAsks.length - 1]?.[0] - store.getters.showOrdersBids[0]?.[0])/ store.getters.showOrdersAsks[store.getters.showOrdersAsks.length - 1]?.[0] * 100).toFixed(3)) ;
const userOrdersAsks = computed(() => store.getters.showUserOrdersAsks);
const userOrdersBids = computed(() => store.getters.showUserOrdersBids);
const tikersInfo = computed(()=> store.getters.showTikers)
</script>
