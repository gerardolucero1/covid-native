<template>
    <Page actionBarHidden="true" loaded="onLoaded" navigatedTo="onNavigatedTo">
        <GridLayout rows="*, 2*" colums="*">
            <StackLayout width="70%" row="1" col="1">
                <Label marginBottom="20" horizontalAlignment="center" text="REGISTRO" fontSize="25" textWrap="true" />
                
                <TextField class="text_field" hint="Nombre" fontSize="14" v-model="user.name" text="" keyboardType="text" />
                <!-- <StackLayout>
                    <Label v-if="!$v.user.name.required" text="Obligatorio" textWrap="true" fontSize="9" marginLeft="5" color="red" />
                </StackLayout> -->
                
                <TextField class="text_field" hint="E-mail" fontSize="14" v-model="user.email" text="" keyboardType="email" />
                <!-- <StackLayout>
                    <Label v-if="!$v.user.email.email" text="Ingresa un email valido" textWrap="true" fontSize="9" marginLeft="5" color="red" />
                </StackLayout> -->

                <TextField class="text_field" ref="pw" hint="Contraseña" fontSize="14" v-model="user.password" text="" keyboardType="password" secure="true" />
                <!-- <StackLayout>
                    <Label v-if="!$v.user.password.required" text="Obligatorio" textWrap="true" fontSize="9" marginLeft="5" color="red" />
                </StackLayout> -->

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

//Vuelidate
import { required, email, minLength } from 'vuelidate/lib/validators'

//Toast
const toast = require('nativescript-toasts')

//Local notification
import { LocalNotifications } from "nativescript-local-notifications";
import { alert } from "tns-core-modules/ui/dialogs";
import { Color } from "tns-core-modules/color";

//Pages
import Home from '../Home.vue'
import Login from '../user/Login'
import Terms from '../Terms'

export default {
    name: 'Login',

    data(){
        return{
            user: {
                name:  '',
                email: '',
                password: '',
            }
        }
    },

    validations: {
        user: {
            name: {
                required,
            },

            email: {
                required,
                email
            },

            password: {
                required,
                minLength: minLength(6)
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
            if(this.$v.user.$invalid){
                if(!this.$v.user.name.required){
                    var options = {
                        text: "Nombre obligatorio",
                        duration : toast.DURATION.SHORT,
                        position : toast.POSITION.BOTTOM //optional
                    }
                    toast.show(options)
                }

                if(!this.$v.user.email.required){
                    var options = {
                        text: "Email obligatorio",
                        duration : toast.DURATION.SHORT,
                        position : toast.POSITION.BOTTOM //optional
                    }
                    toast.show(options)
                }

                if(!this.$v.user.email.email){
                    var options = {
                        text: "Ingresa un email valido",
                        duration : toast.DURATION.SHORT,
                        position : toast.POSITION.BOTTOM //optional
                    }
                    toast.show(options)
                }

                if(!this.$v.user.password.required){
                    var options = {
                        text: "Contraseña obligatoria",
                        duration : toast.DURATION.SHORT,
                        position : toast.POSITION.BOTTOM //optional
                    }
                    toast.show(options)
                }

                if(!this.$v.user.password.minLength){
                    var options = {
                        text: "Contraseña minimo 6 caracteres",
                        duration : toast.DURATION.SHORT,
                        position : toast.POSITION.BOTTOM //optional
                    }
                    toast.show(options)
                }
                return
            }

            try {
                let response = await firebase.createUser({
                    email: this.user.email,
                    password: this.user.password
                })

                if(response){

                    let user = {
                            uid: response.uid,
                            name: this.user.name,
                            email: this.user.email,
                            infection: false,
                            userType: 'user',
                            terms: false,
                        }

                    if(response.additionalUserInfo.isNewUser){

                        await firebase.firestore.collection('users').doc(user.uid).set(user)
                        this.getUserWelcome()
                    }
                    
                    //Lanzar Toast
                    var options = {
                        text: "Cuenta creada con exito",
                        duration : toast.DURATION.SHORT,
                        position : toast.POSITION.BOTTOM //optional
                    }
                    toast.show(options)

                    this.getUser(response.uid)

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

        //Lanzamos la notificacion de bienvenida al usuario
        getUserWelcome() {
            LocalNotifications.schedule(
                [{
                    id: 1,
                    title: 'Bienvenido',
                    subtitle: 'Bienvenido a prevenapp',
                    body: 'Muchas gracias por registrarte en nuestra aplicacion.',
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

<style>
    .text_field{
        border: none;
        border-bottom: 1px solid black;
        border-width: 0 0 1px 0;
    }
</style>