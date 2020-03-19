<template>
    <Page actionBarHidden="true" loaded="onLoaded" navigatedTo="onNavigatedTo">
        <GridLayout rows="*, 2*" colums="*">
            <StackLayout width="70%" row="1" col="1">
                <Label marginBottom="20" horizontalAlignment="center" text="REGISTRO" fontSize="25" textWrap="true" />
                
                <TextField hint="E-mail" fontSize="14" v-model="user.email" text="" keyboardType="email" />
                <TextField ref="pw" hint="Contraseña" fontSize="14" v-model="user.password" text="" keyboardType="password" secure="true" />
                <Label col="0" row="0" class="forget-password" fontSize="12" text="Ver/Ocultar" @tap="showHidePassword" />

                <Button text="Registrarse" borderRadius="20" backgroundColor="white" marginTop="20" color="black" @tap="createUser" />
                
                <Label text="¿Ya tienes una cuenta? Inicia sesion" marginTop="20" textWrap="true" horizontalAlignment="center" @tap="goToLogin" />
                
                <Button borderRadius="20" text="Login con Google" marginTop="20" color="white" backgroundColor="red" @tap="loginGoogle" />
                <Button borderRadius="20" text="Login con Facebook" marginTop="10" color="white" backgroundColor="blue" @tap="loginFacebook" />
                
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Pages
import Home from '../Home.vue'
import Login from '../user/Login'

export default {
    name: 'Login',

    data(){
        return{
            user: {
                email: '',
                password: '',
            }
        }
    },

    munted(){

    },

    computed: {

    },

    methods: {
        //Router
        goToLogin(){
            this.$navigateTo(Login)
        },

        //Show password
        showHidePassword(){
            console.log(this.$refs.pw.nativeView.secure)
            this.$refs.pw.nativeView.secure= !this.$refs.pw.nativeView.secure
        },

        //Register
        async createUser(){
            try {
                let response = await firebase.createUser({
                    email: this.user.email,
                    password: this.user.password
                })

                if(response){
                    let user = {
                            uid: response.uid,
                            nombre: 'User-' + response.uid,
                            email: this.user.email,
                            infection: false,
                        }

                    if(response.additionalUserInfo.isNewUser){

                        firebase.firestore.collection('users').doc(user.uid).set(user)
                    }

                    this.$store.commit('updateUser', user)
                    this.$navigateTo(Home)

                }
            } catch(e) {
                console.log(e);
            }
        },

        async loginGoogle(){
            try{
                let response = await firebase.login({
                    type: firebase.LoginType.GOOGLE,
                })

                if(response){
                    console.log(JSON.stringify(response.additionalUserInfo.isNewUser))

                    let user = {
                        uid: response.uid,
                        name: response.displayName,
                        email: response.additionalUserInfo.profile.email,
                        infection: false,
                    }

                    if(response.additionalUserInfo.isNewUser){

                        firebase.firestore.collection('users').doc(user.uid).set(user)
                    }

                    this.$store.commit('updateUser', user)
                    this.$navigateTo(Home)
                }
            }
            catch(e){
                console.log(e)
            }
        },

        async loginFacebook(){

            try{
                let response = await firebase.login({
                    type: firebase.LoginType.FACEBOOK,
                })

                if(response){
                    console.log(JSON.stringify(response.additionalUserInfo.isNewUser))

                    let user = {
                        uid: response.uid,
                        name: response.displayName,
                        email: response.additionalUserInfo.profile.email,
                        infection: false,
                    }

                    if(response.additionalUserInfo.isNewUser){

                        firebase.firestore.collection('users').doc(user.uid).set(user)
                    }

                    this.$store.commit('updateUser', user)
                    this.$navigateTo(Home)
                }
            }
            catch(e){
                console.log(e)
            }
        },
    }
}
</script>

<style>

</style>