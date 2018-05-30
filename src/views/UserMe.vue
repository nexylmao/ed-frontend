<template>
    <div class="wrapping">
        <Loading :active.sync="loading"/>
        <profile-show :profile="me" :backOnClose="true"/>
    </div>
</template>

<script>
import ProfileShow from '@/components/User';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'me-profile',
    components: {
        ProfileShow, Loading
    },
    data () {
        return {
            loading: false,
            me: JSON.parse(window.localStorage.getItem('me') || window.sessionStorage.getItem('me'))
        }
    },
    created () {
        this.loading = true;
    },
    mounted () {
        this.loading = false;
        this.$modal.show('profile-show');
    }
}
</script>

<style>

</style>
