<template>
    <div class="panel-login">
        <v-container>
            <v-layout wrap>
                <v-flex sm12 md6 offset-md3>
                    <v-card elevation="4" tag="section">
                        <v-card-title>
                            <v-layout align-center justify-space-between>
                                <h3 class="headline">
                                Login
                                </h3>
                            </v-layout>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                        <p>Sign in with your username and password:</p>
                        <v-form>
                            <v-text-field
                                outline
                                label="Username"
                                type="text"
                                v-model="input.username"
                                :error-messages="usernameErrors"
                                required
                                @input="$v.username.$touch()"
                                @blur="$v.username.$touch()"    
                            >
                            </v-text-field>
                            <v-text-field
                                outline
                                hide-details
                                label="Password"
                                type="password"
                                v-model="input.password"
                                :error-messages="passwordErrors"
                                required
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"  
                            >
                            </v-text-field>
                        </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="info" @click="login">
                                <v-icon left>lock</v-icon>
                                Login
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
    name: "LoginForm",
    data() {
        return {
            input: {
                username: 'admin',
                password: 'Pa$$w0rd'
            }
        }
    },

    methods: {
        login() {
            if (this.input.username === "admin" && this.input.password === "Pa$$w0rd") {
                this.$store.commit("setAuthentication", true);
                this.$router.replace({name: "Products"});
            } else {
                console.log("The username or password is not correct!");
            }
        }
    },
    validations: {
        username: {
            required,
        },
        password: {
            required,
        },
    },

    computed: {
    /* Validation Create/Update form */
        usernameErrors () {
            const errors = []
            if (!this.$v.username.$dirty) return errors
            !this.$v.username.required && errors.push('Username is required.')
            return errors
        },
        passwordErrors () {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required.')
            return errors
        },
    },
}
</script>

<style scoped>
.panel-login {
    padding: 100px;
}
.v-btn, .v-card {
    border-radius: '4px';
} 
    
.v-card__title {
    text-transform: uppercase;
}
</style>