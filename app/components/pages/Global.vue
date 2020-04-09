<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *" backgroundColor="red">
                <Label backgroundColor="red" text="" class="font-awesome" fontSize="20" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
            </GridLayout>
        </ActionBar>
        
        <RadSideDrawer ref="drawer">
            <Sidedrawer />

            <GridLayout ~mainContent columns="*" rows="*" backgroundColor="#F3F3F3">
                <ScrollView col="0" row="0">
                    <WrapLayout orientation="vertical" width="90%" paddingBottom="20">
                        
                        <GridLayout rows="*, 2*" colums="*">
                            <StackLayout row="0" col="0">
                                <Label text="ESTATUS GLOBAL" horizontalAlignment="center" marginTop="20" fontSize="25" fontWeight="bold" textWrap="true" />
                            </StackLayout>

                            <StackLayout row="1" col="0">
                                <StackLayout marginTop="20">
                                   
                                </StackLayout>
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

export default {
    name: 'Global',

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

</style>