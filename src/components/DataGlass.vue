<template>
  <div>
    <v-table density="compact" class="mt-12 bg-grey-lighten-5 rounded-lg elevation-10">
      <caption class="bg-blue-grey-darken-2">
        Биржевой стакан
        {{
          store.getters.showTikers
        }}
      </caption>
      <thead class="bg-blue-grey-darken-2">
        <th>Цена<v-divider /></th>
        <th>Количество<v-divider /></th>
        <th>Всего<v-divider /></th>
      </thead>
      <tbody class="text-body-2">
        <AllOrders :colorClass="'text-deep-orange-darken-3'" :orders="asks" :userOrders="store.getters.showUserOrdersAsks" />
        <tr class="bg-blue-grey-lighten-1" v-if="spred">
          <td>Spred</td>
          <td>{{ Number(spred) }}%</td>
          <td></td>
        </tr>
        <AllOrders :colorClass="'text-green-accent-4'" :orders="store.getters.showOrdersBids" :userOrders="store.getters.showUserOrdersBids" />
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
const spred = computed(() => ((store.getters.showOrdersAsks[store.getters.showOrdersAsks.length - 1]?.price - store.getters.showOrdersBids[0]?.price)/ store.getters.showOrdersAsks[store.getters.showOrdersAsks.length - 1]?.price * 100).toFixed(3));
</script>
