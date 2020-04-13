<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="*, *">
                <StackLayout col="0" paddingBottom="10" paddingTop="10" paddingLeft="10" @tap="$refs.drawer.nativeView.showDrawer()">
                    <Label text="" class="font-awesome" fontSize="20" />
                </StackLayout>
                <!-- <Label text="" class="font-awesome" fontSize="20" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/> -->
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <Sidedrawer />

            <GridLayout ~mainContent columns="*" rows="*" backgroundColor="#F3F3F3">
                <ScrollView col="0" row="0">
                    <WrapLayout orientation="vertical" width="90%" paddingBottom="20">
                        <StackLayout width="100%">
                            <Label text="PERMANECE EN CASA s" fontSize="25" horizontalAlignment="center" textWrap="true" />

                            <!-- <Image src="~/assets/images/info-1.png" stretch="none" /> -->
                            <Image src="https://ep01.epimg.net/elpais/imagenes/2019/10/30/album/1572424649_614672_1572453030_noticia_normal.jpg" stretch="none" />
                            
                        </StackLayout>
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

export default {
    name: 'Info',

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
        
    }
}
</script>

<style>
    Label{
        color: black;
    }
</style>