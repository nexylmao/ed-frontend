<template>
    <modal name="create-user" height="80%">
        <Loading :active.sync="loading"/>
        <div class="jumbotron py-3 bg-dark">
            <b-form @submit.prevent="onSubmit">
                <h4 class="my-2">Change data </h4>
                <b-form-group class="m-1">
                    <p>Username : <input required type="text" id="username" v-model="body.username"/></p>
                </b-form-group>
                <b-form-group class="m-1">
                    <p>Password : <input required type="text" id="password" v-model="body.password"/></p>
                </b-form-group>
                <b-form-group class="m-1">
                    <p>Full name : <input type="text" id="fullname" v-model="body.fullname"/></p>
                </b-form-group>
                <b-form-group class="m-1">
                    <p>Account type : <select required v-model="body.accountType">
                        <option value="Student">Student</option>
                        <option value="Parent">Parent</option>
                        <option value="Profesor">Profesor</option>
                        <option v-if="me().accountType === 'Administrator'" value="Moderator">Moderator</option>
                        <option v-if="me().accountType === 'Administrator'" value="Administrator">Administrator</option>
                    </select></p>
                </b-form-group>
                <b-form-group class="m-1">
                    <p>Facility : <input type="text" id="facility" v-model="body.facility"/></p>
                </b-form-group>
                <b-form-group class="m-1">
                    <p>email : <input required type="text" id="email" v-model="body.email"/></p>
                </b-form-group>
                <b-form-group v-if="body.accountType === 'Student'" class="m-1">
                    <p>Homeclass : <input required type="text" id="class" v-model="body.class"/></p>
                </b-form-group>

                <b-button type="submit" class="btn-dark">
                    Submit
                </b-button>
                <b-button variant="danger" @click="$modal.hide('create-user')">
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
    components : {
        Loading
    },
    data () {
        return {
            loading: false,
            apipath: 'https://elektronski-dnevnik.herokuapp.com',
            body: {}
        }
    },
    methods : {
        me () {
            return JSON.parse(window.localStorage.getItem('me') || window.sessionStorage.getItem('me'))
        },
        onSubmit () {
            this.loading = true;
            fetch(this.apipath + '/user/', {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(this.body),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': window.localStorage.getItem('token') || window.sessionStorage.getItem('token')
                }
            })
            .then(result => result.json())
            .then(json => {
                this.loading = false;
                if(json.good === true) {
                    this.$modal.hide('create-user');
                    this.$modal.show('dialog', {
                        title: 'Success!',
                        buttons: [
                            {
                                title: 'Go back!',
                                default: true
                            }
                        ]
                    });
                }
                else {
                    this.$modal.hide('create-user');
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
                    this.$modal.hide('create-user');
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
