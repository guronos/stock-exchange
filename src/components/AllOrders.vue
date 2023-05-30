<template>
  <tr v-for="(order, idx) in orders" :key="idx" :class="[{ 'bg-grey-lighten-2': userOrders.includes(order.price) }, colorClass]">
    <td class="font-weight-bold">
      {{ order.price }}
    </td>
    <td class="text-grey-darken-3">
      {{ Number(order.quantity) }}
    </td>
    <td class="text-grey-darken-3">
      {{ (Number(order.price) * Number(order.quantity)).toFixed(4) }}
    </td>
  </tr>
</template>
<script setup lang="ts">
import { DataItem } from '../store/types';

interface Props {
  colorClass: string;
  orders: Array<DataItem>;
  userOrders: string[];
}

defineProps<Props>();
</script>
