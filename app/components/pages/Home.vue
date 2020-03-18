<template>
    <Page actionBarHidden="false">
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="" class="font-awesome" fontSize="20" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <Sidedrawer />

            <GridLayout ~mainContent columns="*" rows="*">
                <!-- <Button text="Logout" @tap="logout" /> -->
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Pages
import Login from './user/Login.vue'

export default {
    name: 'Home',

    data(){
        return{
            cosa: {
                nombre: 'gerardo',
                apellido: 'Lucero'
            }
        }
    },

    munted(){

    },

    computed: {

    },

    methods: {
        logout(){
            
            firebase.logout()

            this.$navigateTo(Login, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
            
        }
    }
}
</script>

<style>

</style>