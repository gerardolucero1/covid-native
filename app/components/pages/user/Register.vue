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
                        <Label marginBottom="20" marginTop="20" horizontalAlignment="center" text="Crear cuenta" fontSize="25" textWrap="true" />
                        
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

                        <Label col="0" row="0" class="forget-password" color="#9D9D9D" marginLeft="10" fontSize="10" text="Ver/Ocultar" @tap="showHidePassword" />
                        
                        <Label text="¿Ya tienes una cuenta? Inicia sesión" marginTop="20" textWrap="true" horizontalAlignment="center" @tap="goToLogin" />
                        
                        <Button text="Crear cuenta" borderRadius="20" backgroundColor="#2F4095" marginTop="20" color="white" @tap="createUser" />

                        <Label text="Crear cuenta con:" marginTop="40" textWrap="true" horizontalAlignment="center" />
                        
                        <FlexboxLayout justifyContent="center" alignItems="center" marginTop="10">
                            <Image src="~/assets/images/social-icon-1.png" width="30" marginRight="5" stretch="aspectFit" @tap="loginGoogle" />
                            <Image src="~/assets/images/social-icon-2.png" width="30" marginLeft="5" stretch="aspectFit" @tap="loginFacebook" />
                            
                        </FlexboxLayout>
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

//Vuelidate
import { required, email, minLength } from 'vuelidate/lib/validators'

//Toast
const toast = require('nativescript-toasts')

//Local notification
import { LocalNotifications } from "nativescript-local-notifications";
import { alert } from "tns-core-modules/ui/dialogs";
import { Color } from "tns-core-modules/color";

//iOS or Android
import { isAndroid, isIOS } from "tns-core-modules/ui/page";

//Pages
import Home from '../Home.vue'
import Index from '../Index.vue'
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
            },

            android: true
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

    created(){
        if(isAndroid){
            this.android = true
        }else{
            this.android = false
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
                            cuestionario: false,
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
                        this.$navigateTo(Index)
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