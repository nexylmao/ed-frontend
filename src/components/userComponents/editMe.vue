<template>
    <modal name="edit-me" @opened="onOpened">
        <Loading :active.sync="loading"/>
        <div class="jumbotron py-3 bg-dark">
            <b-form @submit.prevent="onSubmit">
                <h4 class="my-2">Change data </h4>
                <b-form-group class="m-1">
                    <p>Full name : <input type="text" id="fullname" :placeholder="body.fullname" v-model="body.fullname"/></p>
                </b-form-group>
                <b-form-group class="m-1">
                    <p>Profile picture : <input type="text" id="picture" :placeholder="body.picture" v-model="body.picture"/></p>
                </b-form-group>
                <b-form-group class="m-1">
                    <p>Background picture : <input type="text" id="backgroundPicture" :placeholder="body.backgroundPicture" v-model="body.backgroundPicture"/></p> 
                </b-form-group>
                
                <b-button type="submit" class="btn-dark">
                    Submit
                </b-button>
                <b-button variant="danger" @click="$modal.hide('edit-me')">
                    Exit
                </b-button>
            </b-form>
        </div>
    </modal>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    components: {
        Loading
    },
    data () {
        return {
            loading: false,
            apipath: 'https://elektronski-dnevnik.herokuapp.com',
            body: {
                fullname: this.me().fullname,
                picture: this.me().picture,
                backgroundPicture: this.me().backgroundPicture 
            }
        }
    },

    methods : {
        onOpened () {
            this.body = {
                fullname: this.me().fullname,
                picture: this.me().picture,
                backgroundPicture: this.me().backgroundPicture 
            }
        },
        setMe (newMe) {
            if(window.localStorage.getItem('me')) {
                window.localStorage.setItem('me', newMe);
            }
            if(window.sessionStorage.getItem('me')) {
                window.sessionStorage.setItem('me', newMe);
            }
        },
        me () {
            return JSON.parse(window.localStorage.getItem('me') || window.sessionStorage.getItem('me'))
        },
        onSubmit () {
            this.loading = true;
            fetch(this.apipath + '/user/me', {
                body: JSON.stringify(this.body),
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': window.localStorage.getItem('token') || window.sessionStorage.getItem('token')
                }
            })
            .then(response => response.json())
            .then(json => {
                this.loading = false;
                if(json.good === true) {
                    this.$modal.hide('edit-me');
                    this.$modal.show('dialog', {
                        title: 'Success!',
                        buttons: [
                            {
                                title: 'Go back!',
                                default: true
                            }
                        ]
                    });
                    setMe(json.data);
                }
                else {
                    this.$modal.hide('edit-me');
                    this.$modal.show('dialog', {
                        title: 'Error!',
                        text: json.message,
                        buttons: [
                            {
                                title: 'Go back!',
                                default: true
                            }
                        ]
                    });
                }
            })
            .catch(err => {
                if(err) {
                    this.loading = false;
                    this.$modal.hide('edit-me');
                    this.$modal.show('dialog', {
                        title: 'Error!',
                        text: err.message,
                        buttons: [
                            {
                                title: 'Go back!',
                                default: true
                            }
                        ]
                    });
                }
            });
        }
    }
}
</script>

<style>

</style>