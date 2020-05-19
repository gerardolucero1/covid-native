<style>
    Label{
        color: black;
    }

    .under-line{
        border-width: 0 0 4px 0;
        border-color: black;
        width: 80%;
        text-align: center;
    }

    .excerpt{
        text-align: left;
    }

    .line{
        width: 80%;
        border-width: 1 0 0 0;
        border-color: #1D5A7B;
    }
</style>

<template>
    <Page actionBarHidden="true">
        <GridLayout ~mainContent columns="*" rows="*" backgroundColor="#F3F3F3">
            <StackLayout col="0" row="0">
                <GridLayout rows="60, *" columns="*">
                    <StackLayout row="0" col="0">
                        <GridLayout rows="*" columns="60, *">
                            <FlexboxLayout justifyContent="center" alignItems="center" row="0" col="0" @tap="goToNews">
                                <Label class="font-awesome" text="" textWrap="false" color="#339AF0" fontSize="17" />
                            </FlexboxLayout>
                            <FlexboxLayout justifyContent="center" alignItems="center" row="0" col="1" padding="0 10">
                                <Label :text="url" textWrap="false" />
                            </FlexboxLayout>
                        </GridLayout>
                    </StackLayout>
                    <ScrollView row="1" col="0">
                        <WrapLayout orientation="vertical" paddingBottom="20">
                            <StackLayout row="1" col="0">
                                <WebView :src="url" />
                            </StackLayout>
                        </WrapLayout>
                    </ScrollView>
                </GridLayout>
            </StackLayout>
            
        </GridLayout>
    </Page>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Access permissions
import * as permissions from 'nativescript-permissions'
import * as platform from 'platform'

//Vuex
import { mapState } from 'vuex'

//Axios
import axios from 'axios'

//HTTP
const httpModule = require("tns-core-modules/http");
const utilsModule = require("tns-core-modules/utils/utils");

//Moment
let moment = require('moment')

//Loader
const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
const loader = new LoadingIndicator();

const options = {
    message: 'Cargando...',
    details: 'Recuperando noticias',
    progress: 0.65,
    margin: 10,
    dimBackground: true,
    color: '#4B9ED6', // color of indicator and labels
    // background box around indicator
    // hideBezel will override this if true
    backgroundColor: 'white',
    userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
    hideBezel: true, // default false, can hide the surrounding bezel
    mode: Mode.AnnularDeterminate, // see options below
    // android: {
    //     view: android.view.View, // Target view to show on top of (Defaults to entire window)
    //     cancelable: true,
    //     cancelListener: function(dialog) {
    //         console.log('Loading cancelled');
    //     }
    // },
    // ios: {
    //     view: UIView // Target view to show on top of (Defaults to entire window)
    // }
};

//Pages
import Login from './user/Login.vue'
import Recomendations from '../pages/Recomendations'
import Info from '../pages/Info'
import News from '../pages/News'

export default {
    name: 'New',

    props: ['url'],

    data(){
        return{
            
        }
    },

    mounted(){
    },

    computed: {
        
    },

    methods: {
        goToNews(){
            this.$navigateTo(News, {
                animated: true,
                transition: {
                    name: 'slideRight',
                },
            })
        }
    }
}
</script>