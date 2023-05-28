<template>
                <div class="text-red-accent-4 text-h4" 
            v-if="store.state.errorMessage===1"
            >Произошла ошибка. <br />
            Неудается подключится по WebSocket, попробуйте позднее.</div>
            <div class="text-red-accent-4 text-h4" 
            v-if="store.state.errorMessage===2"
            >Произошла ошибка. <br />
            Возможно, Вы некорректно указали тикер, проверьте корректность ввода и пропробуйте еще раз</div>

</template>
<script setup lang="ts">
import { useStore } from '../store/store.ts'

const store = useStore()
</script>