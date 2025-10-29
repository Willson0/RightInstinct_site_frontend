<script>
import axios from 'axios';
import config from '@/config.json';
export default {
    name: "VerifyView",
    async mounted () {
        await axios.post(config.backend + "site/auth/verify", {
            code: this.$route.params.code,
        });
    }
}
</script>

<template>
    <div class="verify">
        <img src="/verify.jpg" alt="">
        <h1>Подтверждение почты</h1>
        <div>Вы успешно подтвердили почту!</div>
        <button @click="$router.push('/login')">Вернуться</button>
    </div>
</template>

<style scoped>

</style>