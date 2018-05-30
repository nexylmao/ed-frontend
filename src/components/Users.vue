<template>
    <modal name="list-profiles" :scrollable="true" height="auto" @before-open="beforeOpened" @opened="onOpened" @closed="onClosed">
        <Loading :active.sync="loading"/>
        <div class="jumbotron bg-dark m-0 p-0">
            <button class="btn btn-dark w-100 p-2 col-4" @click="() => {setUser(profile); showUser();}" v-bind:key="profile.username" v-for="profile in profiles">
                {{profile.username}}<br/>
            </button>
        </div>
    </modal>
</template>

<script>
import ProfileShow from './User';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'ProfilesList',
    components: {
        ProfileShow, Loading
    },
    data () {
        return {
            type: '',
            all: false,
            profiles: [],
            chosen: {},
            loading: false,
            apipath: 'https://elektronski-dnevnik.herokuapp.com'
        }
    },
    methods : {
        beforeOpened (event) {
            this.type='';
            this.all=false;
            if(event.params.type) {
                this.type = event.params.type;
            }
            if(event.params.all) {
                this.all = event.params.all;
            }
        },
        setUser (x) {
            this.chosen = JSON.parse(JSON.stringify(x));
        },
        showUser () {
            this.$modal.hide('list-profiles');
            this.$modal.show('profile-show',{profile:this.chosen});
        },
        onOpened () {
            this.loading = true;
            let request = '/user';
            if(this.type !== '' && this.all === false) {
                request += '/type/' + this.type;
            }
            fetch(this.apipath + request, {
                headers : {
                    'x-access-token': window.localStorage.getItem('token') || window.sessionStorage.getItem('token'),
                    'content-type' : 'application/json'
                },
                mode: 'cors'
            })
            .then(res => res.json())
            .then(json => {
                this.loading = false;
                if (json.good === true && json.data.length !== 0) {
                    this.profiles = json.data;
                }
                else {
                    this.$modal.hide('list-profiles');
                    this.$modal.show('dialog', {
                        title: 'Error!',
                        text: json.message || 'No users found!',
                        buttons: [
                            {
                                title: 'Close',
                                default: true
                            }
                        ]
                    });
                }
            })
            .catch(err => {
                this.$modal.hide('list-profiles');
                this.$modal.show('dialog', {
                    title: 'Error!',
                    text: err.message,
                    buttons: [
                        {
                            title: 'Close',
                            default: true
                        }
                    ]
                });
            });
        },
        onClosed () {

        }
    }
}
</script>

<style scoped>
.jumbotron {
    height: 100%;
    width: 100%;
}
</style>
