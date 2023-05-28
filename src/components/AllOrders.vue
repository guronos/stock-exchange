<template>
    <tr v-for="(ask, idx) in orders" :key="idx" :class="[{'bg-grey-lighten-2' : userOrders.includes(ask[0])}, colorClass]">
                <td>
                    {{ ask[0] }}
                </td>
                <td>
                    {{ Number(ask[1]) }}
                </td>
                <td>
                    {{ Number(ask[0]) * Number(ask[1]) }}
                </td>
            </tr>
</template>
<script setup lang="ts">
interface Props {
    colorClass: string,
    orders: string[][],
    userOrders: string[]
}

defineProps<Props>()
</script>