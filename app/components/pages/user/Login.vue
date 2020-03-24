<template>
    <Page actionBarHidden="true" loaded="onLoaded" navigatedTo="onNavigatedTo">
        <GridLayout rows="*, 2*" colums="*">
            <StackLayout width="70%" row="1" col="1">
                <Label marginBottom="20" horizontalAlignment="center" text="ACCEDER" fontSize="25" textWrap="true" />
                
                <TextField hint="E-mail" fontSize="14" v-model="user.email" text="" keyboardType="email" />
                <TextField hint="Contraseña" fontSize="14" v-model="user.password" text="" keyboardType="password" secure="true" />
                
                <!-- <Label text="Olvide mi contraseña" fontSize="11" textWrap="true" /> -->

                <Button text="Acceder" borderRadius="20" backgroundColor="white" marginTop="20" color="black" @tap="loginEmail" />
                
                <Label text="¿No tienes una cuenta? Registrate" marginTop="20" textWrap="true" horizontalAlignment="center" @tap="goToRegister" />
                
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
import Register from '../user/Register.vue'
import Terms from '../Terms'

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
        goToRegister(){
            this.$navigateTo(Register, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        //Login
        async loginUser(){
            try {
                let response = await ''
            } catch (error) {
                
            }
        },

        async loginEmail(){
            try {
                // statements
                let response = await firebase.login({
                    type: firebase.LoginType.PASSWORD,
                    passwordOptions: {
                        email: this.user.email,
                        password: this.user.password
                    }
                })

                if(response){

                    console.log(JSON.stringify(response.additionalUserInfo.isNewUser))

                    if(response.additionalUserInfo.isNewUser){

                        let user = {
                            uid: response.uid,
                            name: this.user.email,
                            email: this.user.email,
                            infection: false,
                            userType: 'user',
                            terms: false,
                        }

                        await firebase.firestore.collection('users').doc(user.uid).set(user)
                        //await firebase.firestore.collection('user_locations').doc(user.uid).set(locations)
                    }

                    this.getUser(response.uid)

                }
            } catch(e) {
                console.log(e)
                // statements
                // if(e == 'Logging in the user failed. com.google.firebase.auth.FirebaseAuthInvalidUserException: There is no user record corresponding to this identifier. The user may have been deleted.'){

                //     console.log('USUARIO NO EXISTE')

                //     var options = {
                //         text: "USUARIO NO EXISTE",
                //         duration : toast.DURATION.SHORT,
                //         position : toast.POSITION.BOTTOM 
                //     }
                //     toast.show(options)
                // }else if(e == 'Logging in the user failed. com.google.firebase.FirebaseTooManyRequestsException: We have blocked all requests from this device due to unusual activity. Try again later. [ Too many unsuccessful login attempts. Please try again later. ]'){
                //     console.log('INTENTA MAS TARDE')

                //     var options = {
                //         text: "INTENTA MAS TARDE",
                //         duration : toast.DURATION.SHORT,
                //         position : toast.POSITION.BOTTOM 
                //     }
                //     toast.show(options)
                // }else{
                //     console.log('CONTRASEÑA INCORRECTA')

                //     var options = {
                //         text: "CONTRASEÑA INCORRECTA",
                //         duration : toast.DURATION.SHORT,
                //         position : toast.POSITION.BOTTOM 
                //     }
                //     toast.show(options)
                // }
            }
        },

        async loginGoogle(){
            try{
                let response = await firebase.login({
                    type: firebase.LoginType.GOOGLE,
                })

                if(response){
                    console.log(JSON.stringify(response.additionalUserInfo.isNewUser))

                    if(response.additionalUserInfo.isNewUser){

                        let user = {
                            uid: response.uid,
                            name: response.displayName,
                            email: response.additionalUserInfo.profile.email,
                            infection: false,
                            userType: 'user',
                            terms: false,
                        }

                        await firebase.firestore.collection('users').doc(user.uid).set(user)
                        //await firebase.firestore.collection('user_locations').doc(user.uid).set(locations)
                    }

                    this.getUser(response.uid)
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

                    if(response.additionalUserInfo.isNewUser){
                        let user = {
                            uid: response.uid,
                            name: response.displayName,
                            email: response.additionalUserInfo.profile.email,
                            infection: false,
                            userType: 'user',
                            terms: false,
                        }

                        await firebase.firestore.collection('users').doc(user.uid).set(user)
                        //await firebase.firestore.collection('user_locations').doc(user.uid).set(locations)
                    }

                    this.getUser(response.uid)
                }
            }
            catch(e){
                console.log(e)
            }
        },

        //We get the user data from firebase
        async getUser(uid){
            try {
                let response = await firebase.firestore.collection('users').doc(uid).get()

                if(response.exists){
                    let user = response.data()

                    if(user.terms){
                        this.$store.commit('updateUser', user)
                        this.$navigateTo(Home)
                    }else{
                        this.$store.commit('updateUser', user)
                        this.$navigateTo(Terms)
                    }
                    
                }
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>

<style>

</style>