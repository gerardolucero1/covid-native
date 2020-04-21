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
    <Page actionBarHidden="false">
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
                        <GridLayout rows="*, 2*" colums="*">
                            <StackLayout row="0" col="0">
                                <Label text="NOTICIAS" horizontalAlignment="center" marginTop="20" fontSize="25" fontWeight="bold" textWrap="true" />
                                
                            </StackLayout>

                            <StackLayout row="1" col="0">
                                <StackLayout v-for="(item, index) in news" :key="index" width="100%" backgroundColor="#F8F9FA" padding="10" marginTop="10">
                                    <Image :src="item.Image" stretch="aspectFit" />
                                    <Label :text="item.Title" horizontalAlignment="center" fontSize="17" marginTop="5" fontWeight="bold" textWrap="true" />
                                    
                                    <StackLayout class="line" marginTop="10" />
                                    
                                    <Label class="excerpt" :text="item.Excerpt"  marginTop="10" textWrap="true" />
                                    <Button text="LEER MAS" marginTop="10" horizontalAlignment="center" backgroundColor="black" color="white" @tap="goToURL(item.Link)" />
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
import New from '../pages/New'

export default {
    name: 'News',

    data(){
        return{
            news: ''
        }
    },

    mounted(){
        this.getNews()
    },

    computed: {
        
    },

    methods: {

        //Obtenemos las noticias
        getNews(){
            // loader.show(options);
            httpModule.getJSON(`https://chih-scrap.herokuapp.com/polls/`).then((response) => {
                this.news = Object.keys(response).map(key => {
                    return response[key];
                })
                // loader.hide();
            }, (e) => {
                console.log(e)
                // loader.hide();
            });
        },

        goToURL(url){
            // utilsModule.openUrl(url)
            this.$navigateTo(New, {
                animated: true,
                transition: {
                    name: 'slideLeft',
                },
                props: {
                    url: url,
                }
            })
        }

    }
}
</script>