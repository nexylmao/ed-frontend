<template>
    <div>
        <Loading :active.sync="loading"/>
        <modal name="user">
            <div class="jumbotron">
                <h1>{{User.fullname || User.username}}</h1>
            </div>
        </modal>
    </div>
</template>

<style>
div {
    color: black;
}

.v--modal-overlay {
    background-image: red;
}
</style>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'User',
    components: {
        Loading
    },
    props: ['User'],
    data () {
        return {
            loading: false
        }
    },
    mounted () {
        this.$modal.show('user');
    }
}
</script>
