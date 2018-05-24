<template>
    <div class="page">
        <Loading :active.sync="isLoading"/>
        <TokenCheck/>
        <v-dialog/>
    </div>
</template>

<script>
import TokenCheck from '@/components/TokenCheck';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'Logout',
    components: {
        TokenCheck, Loading
    },
    data () {
        return {
            isLoading
        }
    },
    mounted () {
        this.isLoading = true;
        if(window.localStorage.getItem('token')) {
            window.localStorage.clear();
        }
        else if(window.sessionStorage.getItem('token')) {
            window.sessionStorage.clear();
        }
        this.$modal.show('dialog', {
            title : 'You have been logged out!',
            text : 'Come back soon!',
            buttons : [
                {
                    title: 'Go',
                    default: true,
                    handler: () => {
                        this.isLoading = false;
                        this.$router.push('/');
                    }
                }
            ]
        });
        setTimeout(() => {
            this.isLoading = false;
            this.$router.push('/');
        }, 5000);
    }
}
</script>

<style>

</style>
