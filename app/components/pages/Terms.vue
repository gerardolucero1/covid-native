<template>
    <Page actionBarHidden="true">
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="Menú" class="font-awesome" fontSize="20" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <Sidedrawer />

            <GridLayout ~mainContent columns="*" rows="*" backgroundColor="#F3F3F3">
                <ScrollView col="0" row="0">
                    <WrapLayout orientation="vertical" width="90%" paddingBottom="20">
                        
                        <GridLayout rows="*, 2*" colums="*">
                            <StackLayout row="0" col="0">
                                <Label text="Terminos y condiciones" horizontalAlignment="center" marginTop="20" fontSize="25" fontWeight="bold" textWrap="true" />
                            </StackLayout>

                            <StackLayout row="1" col="0">
                                <StackLayout marginTop="20">
                                   <HtmlView html="https://prevencion.partnergrammer.com/index.php/terminos-y-condiciones/"></HtmlView>
                                </StackLayout>

                                <FlexboxLayout justifyContent="center" alignItems="space-around">
                                    <Button text="ACEPTAR" @tap="acceptTerms" />
                                    <Button text="DECLINAR" @tap="goToLogin" />
                                    
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

</style>