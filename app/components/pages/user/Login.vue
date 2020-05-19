<style scoped>
    Label{
        color: black;
    }
    
    .text_field{
        border: none;
        border-bottom: 1px solid black;
        border-width: 0 0 1px 0;
    }

    .box-1{
        /* background-image: url('~/assets/images/bg-login-1.png');
        background-position: center top;
        background-size: cover;
        background-repeat: no-repeat; */
        background-color: #2F4095;
        border-radius: 0 0 100px 0;
    }

    .box-2{
        /* background-image: url('~/assets/images/bg-login-2.png');
        background-size: cover;
        background-repeat: no-repeat; */
        border-radius: 100px 0 0 0;
    }
</style>

<template>
    <Page actionBarHidden="true" loaded="onLoaded" navigatedTo="onNavigatedTo">
        <GridLayout rows="*, 2*" colums="*">
            <StackLayout row="0" col="1">
                <FlexboxLayout width="100%" height="100%" class="box-1" padding="0 75" justifyContent="center" alignItems="center">
                    <Image src="~/assets/images/logo-completo.png" stretch="aspectFit" verticalAlignment="center" horizontalAlignment="center" />
                    
                </FlexboxLayout>
            </StackLayout>
            <StackLayout row="1" col="1" backgroundColor="#2F4095">
                <StackLayout class="box-2" width="100%" height="100%" backgroundColor="white">
                    <StackLayout width="70%">
                        <Label marginBottom="20" marginTop="20" horizontalAlignment="center" text="Iniciar sesión" fontSize="25" textWrap="true" />
                    
                        <TextField class="text_field" hint="E-mail" fontSize="14" v-model="user.email" text="" keyboardType="email" />
                        <TextField class="text_field" hint="Contraseña" fontSize="14" v-model="user.password" text="" keyboardType="password" secure="true" />
                        
                        <!-- <Label text="Olvide mi contraseña" fontSize="11" textWrap="true" /> -->
                        <Label text="¿No tienes una cuenta? Crea una." marginTop="20" textWrap="true" horizontalAlignment="center" @tap="goToRegister" />

                        <Button text="Iniciar sesión" borderRadius="20" backgroundColor="#2F4095" marginTop="20" color="white" @tap="loginEmail" />
                        
                        <Label text="Inciar sesión con:" marginTop="40" textWrap="true" horizontalAlignment="center" />
                        <FlexboxLayout justifyContent="center" alignItems="center" marginTop="10">
                            <Image src="~/assets/images/social-icon-1.png" width="30" marginRight="5" stretch="aspectFit" @tap="loginGoogle" />
                            <Image src="~/assets/images/social-icon-2.png" width="30" marginLeft="5" stretch="aspectFit" @tap="loginFacebook" />
                            
                        </FlexboxLayout>
                        <!-- <Button borderRadius="20" text="Login con Google" marginTop="20" color="white" backgroundColor="red" @tap="loginGoogle" />
                        <Button borderRadius="20" text="Login con Facebook" marginTop="10" color="white" backgroundColor="blue" @tap="loginFacebook" /> -->
                        <Button v-if="!android" borderRadius="20" text="Login con Apple" marginTop="10" color="white" backgroundColor="black" @tap="loginApple" />
                    </StackLayout>
                </StackLayout>
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Local notification
import { LocalNotifications } from "nativescript-local-notifications";
import { alert } from "tns-core-modules/ui/dialogs";
import { Color } from "tns-core-modules/color";

//Toast
const toast = require('nativescript-toasts')

const platformModule = require("tns-core-modules/platform");

//iOS or Android
import { isAndroid, isIOS } from "tns-core-modules/ui/page";

//Pages
import Home from '../Home.vue'
import Index from '../Index.vue'
import Form from '../Form.vue'
import Register from '../user/Register.vue'
import Terms from '../Terms'

export default {
    name: 'Login',

    data(){
        return{
            user: {
                email: '',
                password: '',
            },

            android: true,
        }
    },

    created(){
        if(isAndroid){
            this.android = true
            console.log(platformModule.device.sdkVersion)
        }else{
            this.android = false
            console.log(`La version de ios es: ${platformModule.device.osVersion}`)
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
                            cuestionario: false,
                        }

                        await firebase.firestore.collection('users').doc(user.uid).set(user)
                        this.getUserWelcome()
                        //await firebase.firestore.collection('user_locations').doc(user.uid).set(locations)
                    }

                    this.getUser(response.uid)

                }
            } catch(e) {
                console.log(e)
                // statements
                if(e == 'Logging in the user failed. com.google.firebase.auth.FirebaseAuthInvalidUserException: There is no user record corresponding to this identifier. The user may have been deleted.'){

                    console.log('USUARIO NO EXISTE')

                    var options = {
                        text: "USUARIO NO EXISTE",
                        duration : toast.DURATION.SHORT,
                        position : toast.POSITION.BOTTOM 
                    }
                    toast.show(options)
                }else if(e == 'Logging in the user failed. com.google.firebase.FirebaseTooManyRequestsException: We have blocked all requests from this device due to unusual activity. Try again later. [ Too many unsuccessful login attempts. Please try again later. ]'){
                    console.log('INTENTA MAS TARDE')

                    var options = {
                        text: "INTENTA MAS TARDE",
                        duration : toast.DURATION.SHORT,
                        position : toast.POSITION.BOTTOM 
                    }
                    toast.show(options)
                }else{
                    console.log('CONTRASEÑA INCORRECTA')

                    var options = {
                        text: "CONTRASEÑA INCORRECTA",
                        duration : toast.DURATION.SHORT,
                        position : toast.POSITION.BOTTOM 
                    }
                    toast.show(options)
                }
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
                            cuestionario: false,
                        }

                        await firebase.firestore.collection('users').doc(user.uid).set(user)
                        this.getUserWelcome()
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
                            cuestionario: false,
                        }

                        await firebase.firestore.collection('users').doc(user.uid).set(user)
                        this.getUserWelcome()
                        //await firebase.firestore.collection('user_locations').doc(user.uid).set(locations)
                    }

                    this.getUser(response.uid)
                }
            }
            catch(e){
                console.log(e)
            }
        },

        async loginApple(){
            try{
                let response = await firebase.login({
                    type: firebase.LoginType.APPLE,
                    
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
                            cuestionario: false,
                        }

                        await firebase.firestore.collection('users').doc(user.uid).set(user)
                        this.getUserWelcome()
                        //await firebase.firestore.collection('user_locations').doc(user.uid).set(locations)
                    }

                    this.getUser(response.uid)
                }
            }
            catch(e){
                console.log(e)
                alert({
                    title: "Error de version",
                    message: `El inicio con apple requiere una version de iOS 13 o superior, tu version es ${platformModule.device.osVersion}`,
                    okButtonText: "Entendido"
                }).then(() => {
                    console.log("Alert dialog closed");
                });
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
                        if(!user.cuestionario){
                            this.$navigateTo(Form)
                        }else{
                            this.$navigateTo(Index)
                        }
                    }else{
                        this.$store.commit('updateUser', user)
                        this.$navigateTo(Terms)
                    }
                    
                }
            } catch (error) {
                console.log(error)
            }
        },

        //Lanzamos la notificacion de bienvenida al usuario
        getUserWelcome() {
            LocalNotifications.schedule(
                [{
                    id: 1,
                    title: 'Bienvenido',
                    subtitle: 'Bienvenido a prevenapp',
                    body: 'Muchas gracias por registrarte en nuestra aplicación.',
                    bigTextStyle: false,
                    color: new Color("green"),
                    //image: "https://images-na.ssl-images-amazon.com/images/I/61mx-VbrS0L.jpg",
                    thumbnail: "https://i.ibb.co/jfb3LCh/logo.png",
                    forceShowWhenInForeground: true,
                    channel: "vue-channel",
                    ticker: "partnergrammer",
                    at: new Date(new Date().getTime() + (5 * 1000)), // 5 seconds from now
                    actions: [
                        {
                            id: "yes",
                            type: "button",
                            title: "Entendido",
                            launch: false
                        },
                        {
                            id: "no",
                            type: "button",
                            title: "Ignorar",
                            launch: false
                        }
                    ]
                }])
        },
    }
}
</script>