<template>
    <modal name="create-grade" :scrollable="true" height="auto" @before-open="beforeOpen" @opened="onOpened">
        <Loading :active.sync="loading"/>
        <div class="jumbotron bg-dark h-100 mb-0">
            <b-form @submit.prevent="onSubmit">
                <h5>Give as : 
                    <select v-if="prepost.choices && prepost.choices.profesorGives" v-model="body.givenBy">
                        <option @click="body.profesorGives = prof" v-for="prof in prepost.choices.profesorGives" v-bind:key="prof.profesor" :value="prof.profesor">{{prof.profesor}}</option>
                    </select>
                    <select v-else v-model="body.givenBy">
                        <option selected="selected" :value="me().username">{{me().username}}</option>
                    </select>
                </h5>
                <h5 v-if="body.givenBy">
                    Subject :
                    <select v-if="prepost.choice" v-model="body.subject">
                        <option v-if="prepost.choice" v-for="subject in prepost.choice.subject" v-bind:key="subject">
                            {{subject}}
                        </option>
                    </select>
                    <select v-else v-model="body.subject">
                        <option v-if="prepost.choices && body.profesorGives" v-for="subject in body.profesorGives.subjects" :key="subject" :value="subject">
                            {{subject}}
                        </option>
                    </select>
                </h5>
                <h5>Give to : <select v-if="prepost.choices" v-model="body.student">
                    <option v-for="student in prepost.choices.givenTo" v-bind:key="student" :value="student">
                        {{student}}
                    </option>
                </select>
                <select v-if="prepost.choice" v-model="body.student">
                    <option v-for="student in prepost.choice.student" v-bind:key="student" :value="student">
                        {{student}}
                    </option>
                </select>
                </h5>
                <h5>Grade : <select v-model="body.grade">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select></h5>
                <h5>Points : <input type="number" name="points" id="ptn" v-model="body.points"></h5>
                <h5>Description :
                    <textarea v-model="body.description"></textarea></h5>
                <br/>
                <b-button type="submit" class="mt-3 btn-dark">
                    Submit
                </b-button>
                <b-button variant="danger" class="mt-3" @click="$modal.hide('create-grade')">
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
            body: {},
            prepost: {},
            syheader: '',
            classheader: ''
        }
    },
    methods : {
        subjects () {
            this.prepost.choices.profesorGives.forEach(element => {
                if(element.profesor === this.body.givenBy) {
                    return element.subjects;
                }    
            });
        },
        me () {
            return JSON.parse(window.localStorage.getItem('me') || window.sessionStorage.getItem('me'))
        },
        onSubmit () {
            this.loading = true;
            console.log(JSON.stringify(this.body));
            fetch(this.apipath + '/grade', {
                method: 'POST',
                body: JSON.stringify(this.body),
                mode: 'cors',
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': window.localStorage.getItem('token') || window.sessionStorage.getItem('token'),
                    'x-school-year': this.syheader,
                    'x-class': this.classheader
                }
            })
            .then(res => res.json())
            .then(json => {
                this.loading = false;
                console.log(json);
                if(json.good === true) {
                    this.$modal.hide('create-grade');
                    this.$modal.show('dialog', {
                        title: 'Success!',
                        text: json.message || 'No users found!',
                        buttons: [
                            {
                                title: 'Close',
                                default: true
                            }
                        ]
                    });
                }
                else {
                    this.$modal.hide('create-grade');
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
                this.loading = false;
                this.$modal.hide('create-grade');
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
        beforeOpen (event) {
            if(event.params) {
                this.syheader = event.params.schoolyear;
                this.classheader = event.params.class;
            }
        },
        onOpened () {
            this.loading = true;
            fetch(this.apipath + '/grade/prepost', {
                mode: 'cors',
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': window.localStorage.getItem('token') || window.sessionStorage.getItem('token'),
                    'x-school-year': this.syheader,
                    'x-class': this.classheader
                }
            })
            .then(res => res.json())
            .then(json => {
                this.loading = false;
                if(json.good === true) {
                    this.prepost = json.data;
                }
                else {
                    this.$modal.hide('create-grade');
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
                this.loading = false;
                this.$modal.hide('create-grade');
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
</script>

<style>

</style>
