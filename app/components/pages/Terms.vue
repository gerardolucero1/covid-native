<template>
    <Page actionBarHidden="true">
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="" class="font-awesome" fontSize="20" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
            </GridLayout>
        </ActionBar>


        <GridLayout rows="*, 2*" colums="*" backgroundColor="#F3F3F3">   
            <StackLayout row="0" col="1">
                <FlexboxLayout width="100%" height="100%" class="box-1" justifyContent="center" alignItems="flex-end">
                    <Image src="~/assets/images/terms.png" width="150" stretch="aspectFit" verticalAlignment="center" horizontalAlignment="center" />
                    
                </FlexboxLayout>
            </StackLayout>

            <StackLayout row="1" col="0" width="70%">
                
                <StackLayout marginTop="20">
                    <Label textAlignment="center" color="#9D9D9D" text="Antes de usar esta aplicación revisa los términos  y condiciones del servicio en el siguiente enlace:" textWrap="true" />
                    <HtmlView html="https://prevencion.partnergrammer.com/index.php/terminos-y-condiciones/"></HtmlView>
                </StackLayout>

                <FlexboxLayout justifyContent="center" alignItems="space-around" marginTop="15">
                    <Button text="ACEPTAR" backgroundColor="#2F4095" marginRight="10" borderRadius="20" padding="10 20" color="white" @tap="acceptTerms" />
                    <Button text="DECLINAR" backgroundColor="red" borderRadius="20" padding="10 20" color="white" @tap="goToLogin" />
                    
                </FlexboxLayout>
            </StackLayout>
        </GridLayout>

        
    </Page>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Vuex
import { mapState } from 'vuex'

//Axios
import axios from 'axios'

//HTTP
const httpModule = require("tns-core-modules/http");

//Moment
let moment = require('moment')

//Pages
import Index from '../pages/Index'
import Form from '../pages/Form'
import Login from '../pages/user/Login'

export default {
    name: 'Terms',

    data(){
        return{
            
        }
    },

    computed: {
        ...mapState([
                'user'
            ]),
    },

    methods: {
        async acceptTerms(){
            try {
                let response = await firebase.firestore.collection('users')
                                                        .doc(this.user.uid)
                                                        .update({ terms: true })

                this.goToForm()
            } catch (error) {
                console.log(error)
            }
        },

        goToForm(){
            this.$navigateTo(Form)
        },

        goToLogin(){
            firebase.logout()

            this.$navigateTo(Login)
        }
    }
}
</script>

<style>
    Label{
        color: black;
    }
</style>