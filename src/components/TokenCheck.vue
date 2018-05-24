<template>
    <div>
        <Loading :active.sync="loading"/>
        <v-dialog/>
    </div>
</template>

<style>
div {
    color: grey;
}
</style>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'TokenCheck',
    components: {
        Loading
    },
    data () {
        return {
            loading: false
        }
    },
    mounted () {
        if(!(window.localStorage.getItem('token') || window.sessionStorage.getItem('token'))) {
            this.$modal.show('dialog', {
                title: 'You\'re not logged in!',
                text: 'You can\'t access this part of the site without being logged in. You\'re being redirected to the login page!',
                buttons: [
                    {
                        title: 'Go',
                        default: true,
                        handler: () => this.$router.push('/')
                    }
                ]
            });
            this.loading = true;
            setTimeout(() => {
                this.$router.push('/');
            }, 5000);
        }
    }
}
</script>
