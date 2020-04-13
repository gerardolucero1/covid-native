<template>
    <Page actionBarHidden="true">
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="" class="font-awesome" fontSize="20" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <Sidedrawer />

            <GridLayout ~mainContent columns="*" rows="*" backgroundColor="#F3F3F3">
                <ScrollView col="0" row="0">
                    <WrapLayout orientation="vertical" width="90%" paddingBottom="20">
                        
                        <GridLayout rows="*, 2*" colums="*">
                            <StackLayout row="0" col="0">
                                <Label class="font-awesome" text="" horizontalAlignment="center" marginTop="20" fontSize="50" fontWeight="bold" textWrap="true" />
                            </StackLayout>

                            <StackLayout row="1" col="0">
                                
                                <StackLayout marginTop="20">
                                   <Label textAlignemnt="center" text="Antes de usar esta aplicación revisa los términos  y condiciones del servicio en el siguiente enlace:" textWrap="true" />
                                    <HtmlView html="https://prevencion.partnergrammer.com/index.php/terminos-y-condiciones/"></HtmlView>
                                </StackLayout>

                                <FlexboxLayout justifyContent="center" alignItems="space-around" marginTop="15">
                                    <Button text="ACEPTAR" backgroundColor="green" marginRight="10" borderRadius="20" padding="10 20" color="white" @tap="acceptTerms" />
                                    <Button text="DECLINAR" backgroundColor="red" borderRadius="20" padding="10 20" color="white" @tap="goToLogin" />
                                    
                                </FlexboxLayout>
                            </StackLayout>
                        </GridLayout>
                        
                    </WrapLayout>
                </ScrollView>
            </GridLayout>
        </RadSideDrawer>

        
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
import Home from '../pages/Home'
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

                this.goToHome()
            } catch (error) {
                console.lgo(error)
            }
        },

        goToHome(){
            this.$navigateTo(Home)
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