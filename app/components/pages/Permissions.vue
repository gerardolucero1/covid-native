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
                                <Label text="La aplicacion requiere los siguientes permisos" horizontalAlignment="center" marginTop="20" fontSize="25" fontWeight="bold" textWrap="true" />
                            </StackLayout>

                            <StackLayout row="1" col="0">
                                
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

//Access permissions
import * as permissions from 'nativescript-permissions'
import * as platform from 'platform'

//Geolocation
import * as geolocation from 'nativescript-geolocation'
import { Accuracy } from 'tns-core-modules/ui/enums'

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

    created(){
        /* list of permissions needed */
        let permissionsNeeded = [
            android.Manifest.permission.ACCESS_FINE_LOCATION,
            android.Manifest.permission.ACCESS_COARSE_LOCATION
        ]

        /* showing up permissions dialog */
        permissions
            .requestPermissions(permissionsNeeded, "Give it to me!")
            .then((args) => {
                this.allowExecution = true
                console.log(args)
                this.goToHome()
            })
            .catch(() => this.allowExecution = false)
    },

    computed: {
        ...mapState([
                'user'
            ]),
    },

    methods: {
        goToHome(){
            this.$navigateTo(Home)
        },
    }
}
</script>

<style>

</style>