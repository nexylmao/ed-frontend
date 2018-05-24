<template>
    <div>
        <Loading :active.sync="loading"></Loading>
        <TokenCheck/>
        <v-dialog/>
        <h1 class="w-50">
            {{token}}
        </h1>
    </div>
</template>

<script>
import TokenCheck from '@/components/TokenCheck';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'TokenView',
    components: {
        Loading, TokenCheck
    },
    data () {
        return {
            loading: true,
            token: ''
        }
    },
    mounted () {
        this.token = window.localStorage.getItem('token') || window.sessionStorage.getItem('token');
        this.loading = false;
    }
}
</script>
