<template>
    <modal name="edit-user-facility" height="200px">
        <Loading :active.sync="loading"/>
        <b-form @submit.prevent="onSubmit">
            <div class="jumbotron py-3 bg-dark">
                <b-form-group>
                    <b-form-radio-group stacked v-model="selected">
                        <b-form-radio :value="{choice: 'nofacility', facility: ''}">
                            Set user to have no facility
                        </b-form-radio>
                        <b-form-radio :value="{choice: 'yesfacility', facility: text}">
                            Set user to have a facility
                        </b-form-radio>
                        <input v-if="selected.choice === 'yesfacility'" v-bind="text" type="text" name="facilityname" id="fcname" disabled/>
                    </b-form-radio-group>
                </b-form-group>

                <b-button type="submit" class="btn-dark">
                    Submit
                </b-button>
                <b-button variant="danger" @click="$modal.hide('edit-user-facility')">
                    Exit
                </b-button>
            </div>
        </b-form>
    </modal>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'facility-edit',
    props: ['profile','user'],
    components: {
        Loading
    },
    data () {
        return {
            apipath: 'https://elektronski-dnevnik.herokuapp.com',
            selected: {},
            text: '',
            loading: false
        }
    },
    created () {
        this.loading = true;
    },
    mounted () {
        this.loading = false;
    },
    watch : {
        selected () {
            if(this.selected.choice !== 'nofacility') {
                $('fcname').ready(() => {
                    document.getElementById('fcname').placeholder = this.user.facility || 'type facility here!';
                    if(this.user.accountType === 'Administrator') {
                        document.getElementById('fcname').disabled = false;
                    }
                    else {
                        document.getElementById('fcname').defaultValue = this.user.facility;
                    }
                });
            }
        }
    },
    methods : {
        onSubmit () {
            if(this.selected === {}) {
                this.$modal.hide('edit-user-facility');
            }
            else {
                this.loading = true;
                if(document.getElementById('fcname')) {
                    this.selected.facility = document.getElementById('fcname').value;
                }
                else {
                    this.selected.facility = '';
                }
                fetch(this.apipath + '/user/' + this.profile.username +'/facility', {
                    method : 'PUT',
                    body : JSON.stringify({
                        facility : this.selected.facility
                    }),
                    mode : 'cors',
                    headers : {
                        'content-type' : 'application/json',
                        'x-access-token' : window.localStorage.getItem('token') || window.sessionStorage.getItem('token')
                    }
                })
                .then(res => res.json())
                .then(json => {
                    if(json.good === true) {
                        this.loading = false;
                        this.$modal.hide('edit-user-facility');
                    }
                    else {
                        this.loading = false;
                        this.$modal.hide('edit-user-facility');
                        this.$modal.show('dialog', {
                            title: 'Error!',
                            text: json.message,
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
                    this.$modal.hide('edit-user-facility');
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
            }
        }
    }
}
</script>

<style>
.jumbotron {
    color: white;
    width: 100vw;
    height: 100vh;
}
</style>
