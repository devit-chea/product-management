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
                        <p>Username: admin</p>
                        <p>Password: Pa$$w0rd</p>
                        <v-form>
                            <v-text-field
                                outline
                                label="Username"
                                type="text"
                                v-model="input.username" 
                            >
                            </v-text-field>
                            <v-text-field
                                outline
                                hide-details
                                label="Password"
                                type="password"
                                v-model="input.password"
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

export default {
    name: "LoginForm",
    data() {
        return {
            input: {
                username: '',
                password: ''
            }
        }
    },

    methods: {
        login() {
            if (this.input.username === "admin" && this.input.password === "Pa$$w0rd") {
                this.$store.commit("setAuthentication", true);
                this.$router.replace({name: "Products"});
            } else {
                window.alert("Username or password incorrect!")
                console.log("The username or password is not correct!");
            }
        }
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