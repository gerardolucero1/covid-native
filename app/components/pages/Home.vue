<template>
    <Page actionBarHidden="false">
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
                        <StackLayout marginTop="20">
                            <Label :text="'Hola, ' + user.name" fontSize="25" fontWeight="lighter" textWrap="true" horizontalAlignment="left" @tap="reverseGeo" />
                            <FlexboxLayout marginTop="10">
                                <Label text="" class="font-awesome" textWrap="true" />
                                <Label :text="infoDirection.direction" marginLeft="10" fontSize="12" textWrap="true" />
                                <Label text="" class="font-awesome" textWrap="true" marginLeft="10" @tap="getLocation" />
                            </FlexboxLayout>
                        </StackLayout>

                        <StackLayout>
                            <FlexboxLayout marginTop="40">
                                <Label text="" class="font-awesome" textWrap="true" />
                                <Label text="Estado" marginLeft="10" fontSize="14" fontWeight="lighter" textWrap="true" />
                            </FlexboxLayout>

                            <Label text="SIN EXPOSICION" marginLeft="20" fontSize="25" fontWeight="bold" textWrap="true" />
                            
                            <StackLayout marginTop="20" borderWidth="1 0 0 0" borderColor="black" width="100%" />
                            <StackLayout marginTop="5" borderWidth="1 0 0 0" borderColor="black" width="100%" />
                            
                            <StackLayout width="100%" backgroundColor="red" borderRadius="15" marginTop="20">
                                <Label text="Casos Confirmados" fontSize="18" horizontalAlignment="center" textWrap="true" color="white" marginTop="10" />
                                
                                <GridLayout columns="*, *" rows="100">
                                    <FlexboxLayout row="0" col="0" flexDirection="column" justifyContent="center" alignItems="center">
                                        <Label :text="infoDirection.country" fontSize="18" color="white" textWrap="true" />
                                        <Label text="82" fontSize="16" color="white" fontWeight="bold" textWrap="true" />
                                    </FlexboxLayout>

                                    <FlexboxLayout row="0" col="1" flexDirection="column" justifyContent="center" alignItems="center">
                                        <Label :text="infoDirection.state" fontSize="18" color="white" textWrap="true" />
                                        <Label text="6" fontSize="16" color="white" fontWeight="bold" textWrap="true" />
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>

                            <StackLayout width="100%" backgroundColor="orange" borderRadius="15" marginTop="20">
                                <Label text="Casos Sospechosos" fontSize="18" horizontalAlignment="center" textWrap="true" color="white" marginTop="10" />
                                
                                <GridLayout columns="*, *" rows="100">
                                    <FlexboxLayout row="0" col="0" flexDirection="column" justifyContent="center" alignItems="center">
                                        <Label :text="infoDirection.country" fontSize="18" color="white" textWrap="true" />
                                        <Label text="82" fontSize="16" color="white" fontWeight="bold" textWrap="true" />
                                    </FlexboxLayout>

                                    <FlexboxLayout row="0" col="1" flexDirection="column" justifyContent="center" alignItems="center">
                                        <Label :text="infoDirection.state" fontSize="18" color="white" textWrap="true" />
                                        <Label text="6" fontSize="16" color="white" fontWeight="bold" textWrap="true" />
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>

                            <StackLayout width="100%" backgroundColor="green" borderRadius="15" marginTop="20">
                                <Label text="Casos Negativos" fontSize="18" horizontalAlignment="center" textWrap="true" color="white" marginTop="10" />
                                
                                <GridLayout columns="*, *" rows="100">
                                    <FlexboxLayout row="0" col="0" flexDirection="column" justifyContent="center" alignItems="center">
                                        <Label :text="infoDirection.country" fontSize="18" color="white" textWrap="true" />
                                        <Label text="82" fontSize="16" color="white" fontWeight="bold" textWrap="true" />
                                    </FlexboxLayout>

                                    <FlexboxLayout row="0" col="1" flexDirection="column" justifyContent="center" alignItems="center">
                                        <Label :text="infoDirection.state" fontSize="18" color="white" textWrap="true" />
                                        <Label text="6" fontSize="16" color="white" fontWeight="bold" textWrap="true" />
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>
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

//Access permissions
import * as permissions from 'nativescript-permissions'
import * as platform from 'platform'

//Geolocation
import * as geolocation from 'nativescript-geolocation'
import { Accuracy } from 'tns-core-modules/ui/enums'

//Vuex
import { mapState } from 'vuex'

//Axios
import axios from 'axios'

//HTTP
const httpModule = require("tns-core-modules/http");

//Loader
const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
const loader = new LoadingIndicator();

const options = {
    message: 'Cargando...',
    details: 'Recuperando informacion',
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

export default {
    name: 'Home',

    data(){
        return{
            origin: { 
                latitude: 0, 
                longitude: 0 
            },
            api_key: 'api_key',
            infoDirection: {
                direction: 'No se puede obtener tu direccion...',
                country: '',
                state: ''
            },
            permissions: false,
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
            .then(() => {
                this.allowExecution = true
                this.getLocation()
            })
            .catch(() => this.allowExecution = false)
    },

    mounted(){
        if(this.allowExecution){
            this.getLocation()
        }
    },

    computed: {
        ...mapState([
                'user'
            ]),
    },

    methods: {
        //Geolocalizacion
        getLocation(){
            //Loader activate
            loader.show(options)

            geolocation.getCurrentLocation({
                desiredAccuracy: Accuracy.high,
                maximumAge: 5000,
                timeout: 10000
            }).then((location) => {
                if (location) {
                    this.origin.latitude = location.latitude
                    this.origin.longitude = location.longitude

                    this.reverseGeo()
                }
            }, (e) => {
                console.log(e);
            })
        },

        reverseGeo(){
            httpModule.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.origin.latitude},${this.origin.longitude}&key=${this.api_key}`).then((r) => {
                this.infoDirection.direction = r.results[0].formatted_address
                this.infoDirection.country = r.results[0].address_components[6].long_name
                this.infoDirection.state = r.results[0].address_components[5].long_name

                //Loader deactivate
                loader.hide()
            }, (e) => {
                console.log(e)
            });
        },

        //Exit
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