<template>
    <div>
        <Loading :active.sync="loading"></Loading>
        <v-dialog/>
        <h1 class="my-3">
            <i>Elektronski dnevnik</i>
        </h1>
        <div class="loginwrapper jumbotron p-0 mx-auto col-12 col-sm-10 col-md-10 col-lg-8 col-xl-6 container-fluid my-3">
            <div class="row">
                <div class="left p-5 mx-auto col-12 col-sm-10 col-md-10 col-lg-8 col-xl-6"></div>
                <div class="right p-5 mx-auto bg-dark col-12 col-sm-10 col-md-10 col-lg-8 col-xl-6 mb-5 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-0">
                    <form @submit.prevent="onSubmit">
                        <div class="form-group">
                            <label for="id">E-mail / Username</label>
                            <input v-model="loginData.identification" class="form-control" type="text" required name="Identification" id="id">
                        </div>
                        <div class="form-group">
                            <label for="pw">Password</label>
                            <input v-model="loginData.password" class="form-control" type="password" required name="Password" id="pw">
                        </div>
                        <div class="form-group checkbox">
                            <label for="remember"><input v-model="remember" type="checkbox" id="remember"> Remember me?</label>
                        </div>
                        <button class="btn btn-primary" type="submit">Log in</button>
                    </form>
                    <div class="mt-2">
                        <a title="Realtime application protection" href="https://www.sqreen.io/?utm_source=badge"><img style="width:109px;height:36px" src="https://s3-eu-west-1.amazonaws.com/sqreen-assets/badges/20171107/sqreen-dark-badge.svg" alt="Sqreen | Runtime Application Protection" /></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
div {
    color: white;
}
</style>


<style>
.wrapper {
    color: white;
}

.loginwrapper {
    clear: both;
    color: white;
    background-image: url('../assets/flowers.jpg');
    background-size: 101vh;
    margin: auto;
}
</style>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'Login',
    components: {
        Loading
    },
    data () {
        return {
            apipath: 'https://elektronski-dnevnik.herokuapp.com',
            remember: false,
            loginData: {
                identification: '',
                password: ''
            },
            loading: false
        }
    },
    created () {
        this.loading = true;
    },
    mounted () {
        this.loading = false;
        if(window.sessionStorage.getItem('token') || window.localStorage.getItem('token')) {
            this.$modal.show('dialog', {
                title: 'You\'re already logged in!',
                text: 'You are going to be redirected...',
                buttons: [
                    {
                        title: 'Go',
                        default: true,
                        handler: () => this.$router.push('dashboard')
                    }
                ]
            });
            this.loading = true;
            setTimeout(() => {
                this.$router.push('dashboard');
            }, 5000);
        }
    },
    methods : {
        onSubmit () {
            this.loading = true;
            console.log(this.loginData);
            fetch(this.apipath + '/auth/login', {
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(this.loginData),
                method: 'POST',
                mode: 'cors'
            })
            .then(result => result.json())
            .then(json => {
                this.loading = false;
                if(json.auth === false) {
                    this.$modal.show('dialog', {
                        title: 'Error',
                        text: json.message,
                        button: [
                            {
                                title: 'Close'
                            }
                        ]
                    });
                }
                else {
                    if(json.token) {
                        fetch(this.apipath + '/user/me', {
                            mode: 'cors',
                            headers: {
                                'x-access-token' : json.token,
                                'content-type': 'application/json'
                            }
                        })
                        .then(response => response.json())
                        .then(json2 => {
                            if(json2.good === false) {
                                this.$modal.show('dialog', {
                                    title: 'Error occured!',
                                    text: 'Something went wrong while trying to get your data!',
                                    buttons: [
                                        {
                                            title: 'Close'
                                        }
                                    ]
                                });
                            }
                            else {
                                if(this.remember) {
                                    window.localStorage.setItem('token', json.token);
                                    window.localStorage.setItem('me', JSON.stringify(json2.data[0]));
                                }
                                else {
                                    window.sessionStorage.setItem('token', json.token);
                                    window.sessionStorage.setItem('me', JSON.stringify(json2.data[0]));
                                }
                                this.$router.push('/dashboard');
                            }
                        })
                        .catch(err => {
                            this.$modal.show('dialog', {
                                title: 'Error occured!',
                                text: 'Something went wrong while trying to get your data!',
                                buttons: [
                                    {
                                        title: 'Close'
                                    }
                                ]
                            });
                        });
                    }
                    else {
                        this.$modal.show('dialog', {
                            title: 'Error occured!',
                            text: 'Something went wrong while the server was trying to authenticate you!',
                            buttons: [
                                {
                                    title: 'Close'
                                }
                            ]
                        });
                    }
                }
            })
            .catch(err => {
                this.loading = false;
                if(err) {
                    this.$modal.show('dialog', {
                        title: 'Error occured!',
                        text: err.message,
                        buttons: [
                            {
                                title: 'Close'
                            }
                        ]
                    });
                }
            });
        }
    }
}
</script>
