<style scoped>
    Label{
        color: black;
    }

    .under-line{
        border-width: 0 0 4px 0;
        border-color: black;
        width: 80%;
        text-align: center;
    }

    .box-1{
        background-image: url('~/assets/images/waves.png');
        background-position: center;
        background-size: cover;
    }

    .box-2{
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }

    .bgColorBlue{
        background-color: #2F4095;
    }

    .bgColorGray{
        background-color: #E65B50;
    }

    .pulse-1, .pulse-2{
        width: 100px;
        height: 100px;
        background-color: white;
        border-radius: 500%;
        margin-left: -10px;
    }

    .pulse-special{
        width: 100px;
        height: 100px;
        background-color: white;
        border-radius: 500%;
        margin-left: -10px;
    }
    
</style>

<template>
    <Page actionBarHidden="false" @loaded="navigatingTo($event)">
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
                <AbsoluteLayout class="box-1" row="0" col="0" v-bind:class="[(!analyzing && !infected || analyzing ) ? bgColorBlue : bgColorGray]">
                    <AbsoluteLayout width="100%" height="100%">
                        <!-- Animaciones, se podrian hacer con solo dos stacks y una clase...pero si ya funciona... -->
                        <FlexboxLayout width="100%" height="100%" justifyContent="center" alignItems="center" >
                            <StackLayout id="pulse-1" v-show="analyzing" class="pulse-1" />
                        </FlexboxLayout>
                        <FlexboxLayout width="100%" height="100%" justifyContent="center" alignItems="center" >
                            <StackLayout id="pulse-2" v-show="analyzing" class="pulse-2" />
                        </FlexboxLayout>

                        <FlexboxLayout width="100%" height="100%" justifyContent="center" alignItems="center" >
                            <StackLayout id="pulse-danger" v-show="!analyzing && infected" class="pulse-special" />
                        </FlexboxLayout>

                        <FlexboxLayout width="100%" height="100%" justifyContent="center" alignItems="center" >
                            <StackLayout id="pulse-special" v-show="!analyzing && !infected" class="pulse-special" />
                        </FlexboxLayout>
                    </AbsoluteLayout>
                    <AbsoluteLayout width="100%" height="100%">
                        <StackLayout width="100%" height="100%">
                            <GridLayout rows="*, *, *" columns="*">
                                <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center">
                                    <StackLayout width="90%">
                                        <Label color="white" :text="'Hola, ' + user.name" fontSize="25" fontWeight="lighter" textWrap="true" horizontalAlignment="left" />
                                        <FlexboxLayout marginTop="20">
                                            <Label color="white" width="50" text="" class="font-awesome" textWrap="true" />
                                            <Label color="white" :text="infoDirection.direction" fontSize="12" textWrap="true" />
                                            <!-- <Label text="" class="font-awesome" textWrap="true" marginLeft="10" @tap="getLocation" /> -->
                                        </FlexboxLayout>
                                    </StackLayout>
                                </FlexboxLayout>
                                <FlexboxLayout row="1" col="0" justifyContent="center" alignItems="center">
                                        <Image v-if="!analyzing && !infected" id="image-1" src="~/assets/images/fase-1.png" width="150" stretch="aspectFit" @touch="startAnalysis($event)" />
                                        <Image v-if="analyzing" id="image-1" src="~/assets/images/fase-2.png" width="150" stretch="aspectFit" />
                                        <Image v-if="!analyzing && infected" id="image-1" src="~/assets/images/fase-3.png" width="150" stretch="aspectFit" @touch="startAnalysis($event)" />
                                </FlexboxLayout>
                                <StackLayout row="2" col="0">
                                    <StackLayout width="90%">
                                        <FlexboxLayout marginTop="40">
                                            <Label color="white" text="" class="font-awesome" textWrap="true" />
                                            <Label color="white" text="Estado" marginLeft="10" fontSize="14" fontWeight="lighter" textWrap="true" />
                                        </FlexboxLayout>

                                        <StackLayout v-if="!analyzing && !infected">
                                            <Label color="white" v-if="!user.infection" text="SIN EXPOSICIÓN" marginLeft="20" fontSize="25" fontWeight="bold" textWrap="true" />
                                            <Label color="white" v-else text="EXPUESTO" marginLeft="20" fontSize="25" fontWeight="bold" textWrap="true" />
                                        </StackLayout>
                                        <StackLayout v-if="analyzing">
                                            <Label color="white" text="ANALIZANDO" marginLeft="20" fontSize="25" fontWeight="bold" textWrap="true" />
                                        </StackLayout>
                                        <StackLayout v-if="!analyzing && infected">
                                            <Label color="white" text="EXPUESTO" marginLeft="20" fontSize="25" fontWeight="bold" textWrap="true" />
                                        </StackLayout>
                                        
                                    </StackLayout>
                                </StackLayout>
                            </GridLayout>
                        </StackLayout>
                    </AbsoluteLayout>
                    
                </AbsoluteLayout>
                <StackLayout id="box-2" ref="box2" class="box-2" row="0" col="0" backgroundColor="#F3F3F3">
                    <GridLayout rows="50, *" columns="*">
                        <FlexboxLayout justifyContent="center" alignItems="center" row="0" col="0"  @swipe="swipeBox2">
                            <Label class="font-awesome" text="" fontSize="25" textWrap="true" />
                        </FlexboxLayout>
                        <ScrollView row="1" col="0">
                            <WrapLayout orientation="vertical" width="90%" paddingBottom="20">
                                <!-- Estadisticas -->
                                <StackLayout>
                                    <Label horizontalAlignment="center" marginTop="10" fontSize="25" textAlignment="center" color="black" :text="nameState" fontWeight="bold" textWrap="true" v-if="registeredState" />

                                    <StackLayout marginTop="10" v-if="registeredState">
                                        <GridLayout columns="*, *" rows="50">
                                            <StackLayout row="0" col="0" @tap="selectedIndex = 0">
                                                <Label fontSize="17" :class="[ selectedIndex == 0 ? activeClass : '' ]" text="CIUDAD" horizontalAlignment="center" />
                                            </StackLayout>
                                            <StackLayout row="0" col="1" @tap="selectedIndex = 1">
                                                <Label fontSize="17" :class="[ selectedIndex == 1 ? activeClass : '' ]" text="ESTADO" horizontalAlignment="center" />
                                            </StackLayout>
                                        </GridLayout>
                                    </StackLayout>

                                    <StackLayout v-if="registeredState">
                                        <StackLayout v-if="selectedIndex == 0">
                                            <StackLayout v-if="registeredCity">
                                                <GridLayout rows="100" columns="*, *" backgroundColor="white" borderRadius="10">
                                                    <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center">
                                                        <Label color="#EC462F" fontSize="35" fontWeight="bold" :text="casesCity.confirmed" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout row="0" col="1" justifyContent="center" alignItems="center">
                                                        <Label text="Confirmados" fontSize="20" color="black" textWrap="true" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout marginTop="10" rows="100" columns="*, *" backgroundColor="white" borderRadius="10">
                                                    <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center">
                                                        <Label color="#E6A82E" fontSize="35" fontWeight="bold" :text="casesCity.suspect" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout row="0" col="1" justifyContent="center" alignItems="center">
                                                        <Label text="Sospechosos" fontSize="20" color="black" textWrap="true" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout marginTop="10" rows="100" columns="*, *" backgroundColor="white" borderRadius="10">
                                                    <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center">
                                                        <Label color="#3C8106" fontSize="35" fontWeight="bold" :text="casesCity.recovered" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout row="0" col="1" justifyContent="center" alignItems="center">
                                                        <Label text="Recuperados" fontSize="20" color="black" textWrap="true" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout marginTop="10" rows="100" columns="*, *" backgroundColor="white" borderRadius="10">
                                                    <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center">
                                                        <Label color="black" fontSize="35" fontWeight="bold" :text="casesCity.deaths" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout row="0" col="1" justifyContent="center" alignItems="center">
                                                        <Label text="Defunciones" fontSize="20" color="black" textWrap="true" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                            </StackLayout>
                                            <StackLayout v-else backgroundColor="#EC462F" borderRadius="10" padding="10">
                                                <Label color="white" :text="`Detectamos que te encuentras en un municipio del cual no contamos con información oficial. Por el momento, los datos mostrados aquí y PrevenApp solo se encuentran disponibles para algunos municipios del estado de Chihuahua.`" textWrap="true" />
                                            </StackLayout>
                                        </StackLayout>
                                        
                                        
                                        <StackLayout v-if="selectedIndex == 1">
                                            <GridLayout rows="100" columns="*, *" backgroundColor="white" borderRadius="10">
                                                <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center">
                                                    <Label color="#EC462F" fontSize="35" fontWeight="bold" :text="cases.confirmed" textWrap="true" />
                                                </FlexboxLayout>
                                                <FlexboxLayout row="0" col="1" justifyContent="center" alignItems="center">
                                                    <Label text="Confirmados" fontSize="20" color="black" textWrap="true" />
                                                </FlexboxLayout>
                                            </GridLayout>
                                            <GridLayout marginTop="10" rows="100" columns="*, *" backgroundColor="white" borderRadius="10">
                                                <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center">
                                                    <Label color="#E6A82E" fontSize="35" fontWeight="bold" :text="cases.suspect" textWrap="true" />
                                                </FlexboxLayout>
                                                <FlexboxLayout row="0" col="1" justifyContent="center" alignItems="center">
                                                    <Label text="Sospechosos" fontSize="20" color="black" textWrap="true" />
                                                </FlexboxLayout>
                                            </GridLayout>
                                            <GridLayout marginTop="10" rows="100" columns="*, *" backgroundColor="white" borderRadius="10">
                                                <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center">
                                                    <Label color="#3C8106" fontSize="35" fontWeight="bold" :text="cases.recovered" textWrap="true" />
                                                </FlexboxLayout>
                                                <FlexboxLayout row="0" col="1" justifyContent="center" alignItems="center">
                                                    <Label text="Recuperados" fontSize="20" color="black" textWrap="true" />
                                                </FlexboxLayout>
                                            </GridLayout>
                                            <GridLayout marginTop="10" rows="100" columns="*, *" backgroundColor="white" borderRadius="10">
                                                <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center">
                                                    <Label color="black" fontSize="35" fontWeight="bold" :text="cases.deaths" textWrap="true" />
                                                </FlexboxLayout>
                                                <FlexboxLayout row="0" col="1" justifyContent="center" alignItems="center">
                                                    <Label text="Defunciones" fontSize="20" color="black" textWrap="true" />
                                                </FlexboxLayout>
                                            </GridLayout>
                                        </StackLayout>
                                    </StackLayout>
                                </StackLayout>

                                <!-- Mensaje de alerta -->
                                <StackLayout marginTop="20">
                                    <StackLayout v-if="!registeredState" backgroundColor="#EC462F" borderRadius="10" padding="10">
                                        <Label color="white" :text="`Detectamos que te encuentras fuera del estado de Chihuahua. Por el momento, los datos mostrados aquí y PrevenApp solo se encuentran disponibles dentro del estado de Chihuahua.`" textWrap="true" />
                                    </StackLayout>
                                </StackLayout>

                                <!-- Fecha de actualizacion -->
                                <StackLayout marginTop="10" v-if="registeredState">
                                    <Label text="Ultima actualización:" horizontalAlignment="center" textWrap="true" />
                                    
                                    <Label :text="casesCity.date | formatDate" horizontalAlignment="center" textWrap="true" />
                                </StackLayout>

                                <!-- Telefono -->
                                <StackLayout marginTop="10" v-if="registeredState">
                                    <FlexboxLayout justifyContent="center" alignItems="center" marginTop="5">
                                        <Label class="font-awesome" fontSize="25" color="black" text="" textWrap="true" />
                                        <Label marginLeft="10" fontWeight="normal" fontSize="25" color="black" text="MARCA AL:" textWrap="true" />
                                    </FlexboxLayout>
                                    <StackLayout>
                                        <Label horizontalAlignment="center" marginTop="5" fontWeight="bold" color="#707070" fontSize="40" text="200-48-10" textWrap="true" @tap="goToPhone" />
                                    </StackLayout>

                                    <Label horizontalAlignment="center" marginTop="5" color="#707070" fontSize="13" text="PARA RECIBIR ATENCIÓN MEDICA Y PSICOLÓGICA" textWrap="true" />
                                </StackLayout>
                            </WrapLayout>
                        </ScrollView>
                    </GridLayout>
                </StackLayout>
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

//API KEY
import apiKeyHelper from '../key.js'

//Moment
let moment = require('moment')

//Telephone
import * as TNSPhone from 'nativescript-phone'

//Local notification
import { LocalNotifications } from "nativescript-local-notifications";
import { alert } from "tns-core-modules/ui/dialogs";
import { Color } from "tns-core-modules/color";

import { AnimationCurve } from "tns-core-modules/ui/enums";
//Platform
const platformModule = require("tns-core-modules/platform");

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
import Recomendations from '../pages/Recomendations'
import Info from '../pages/Info'

export default {
    name: 'Index',

    data(){
        return{
            origin: { 
                latitude: 0, 
                longitude: 0 
            },
            infoDirection: {
                direction: 'No se puede obtener tu direccion...',
                placeId: '',
            },
            breakTime: false,
            watchId: '',
            saveUbicationVar: '',
            infectedLocations: [],
            userLocations: [],
            flag: false,
            cases: '',
            casesCity: '',
            selectedUbications: [],

            selectedIndex: 0,
            activeClass: 'under-line',

            city: '',
            state: '',

            bgColorBlue: 'bgColorBlue',
            bgColorGray: 'bgColorGray',

            analyzing:  false,
            infected: false,

            registeredState: true,
            registeredCity: true,
        }
    },

    mixins: [ 
        apiKeyHelper,
    ],

    created(){
        /* list of permissions needed */
        // let permissionsNeeded = [
        //     android.Manifest.permission.ACCESS_FINE_LOCATION,
        //     android.Manifest.permission.ACCESS_COARSE_LOCATION
        // ]

        // /* showing up permissions dialog */
        // permissions
        //     .requestPermissions(permissionsNeeded, "Give it to me!")
        //     .then((args) => {
        //         console.log(args)
        //         this.allowExecution = true
        //     })
        //     .catch(() => this.allowExecution = false)

        LocalNotifications.addOnMessageReceivedCallback(notificationData => {
            this.$navigateTo(Recomendations)
        });
    },

    mounted(){
        this.getLocation()
        this.getCases()

        if(this.user.infection){
            this.infected = true
        }
    },

    filters: {
        formatDate(date){
            moment.locale('es')
            
            return moment(date).format('LL')
        }
    },

    watch: {
        'origin.latitude': function (newVal, oldVal) {
            let number_1 = this.truncarNumbers(oldVal, 3)
            let number_2 = this.truncarNumbers(newVal, 3)

            console.log(number_1)
            console.log(number_2)

            if(number_1 != number_2){
                if(this.breakTime){
                    clearTimeout(this.saveUbicationVar)
                    this.breakTime = false
                }
                this.getNewUbication()
            }
        },

        'origin.longitude': function (newVal, oldVal) {
            let number_1 = this.truncarNumbers(oldVal, 3)
            let number_2 = this.truncarNumbers(newVal, 3)

            console.log(number_1)
            console.log(number_2)

            if(number_1 != number_2){
                if(this.breakTime){
                    clearTimeout(this.saveUbicationVar)
                    this.breakTime = false
                }
                this.getNewUbication()
            }
        },

        state(){
            this.getCases()
            
            this.$store.commit('updateState', this.state)
            this.$store.commit('updateCity', this.city)
        },

    },

    computed: {
        ...mapState([
                'user'
            ]),

        locationDescription() {
            return `Estas en ${this.origin.latitude}, ${this.origin.longitude}.`;
        },

        nameState(){
            let text = ''
            if(this.selectedIndex == 0){
                text = `CASOS EN LA CIUDAD DE ${this.city.toUpperCase()}`
            }else{
                text = `CASOS EN EL ESTADO DE ${this.state.toUpperCase()}`
            }
            
            return text
        }
    },

    methods: {
        navigatingTo(args){
            const page = args.object.page
            const box = page.getViewById('box-2')
            const pulse = page.getViewById('pulse-special')

            const pulse_1 = page.getViewById('pulse-1')
            const pulse_2 = page.getViewById('pulse-2')
            const pulse_danger = page.getViewById('pulse-danger')

            box.animate({
                translate: {
                    x: 0,
                    y: platformModule.screen.mainScreen.heightDIPs - 140
                },
                curve: AnimationCurve.easeIn,
                duration: 100,
            })

            if(this.infected){
                pulse_danger.animate({
                    scale: { x: 9, y: 9},
                    opacity: 0,
                    curve: AnimationCurve.easeIn,
                    duration: 1000,
                    iterations: Number.POSITIVE_INFINITY,
                })
            }else{
                pulse.animate({
                    scale: { x: 6, y: 6},
                    opacity: 0,
                    curve: AnimationCurve.easeIn,
                    duration: 2000,
                    iterations: Number.POSITIVE_INFINITY,
                })
            }

        },
        
        swipeBox2(args){
            const page = args.object.page
            const box = page.getViewById('box-2')
            if (args.direction == 4) {
                box.animate({
                    translate: {
                        x: 0,
                        y: 0
                    },
                    curve: AnimationCurve.easeIn,
                    duration: 400,
                })
            }

            if (args.direction == 8) {
                box.animate({
                    translate: {
                        x: 0,
                        y: platformModule.screen.mainScreen.heightDIPs - 140
                    },
                    curve: AnimationCurve.easeIn,
                    duration: 400,
                })
            }
        },

        //Obtener el contador de casos infectados de firebase a nivel estado
        async getCases(){
            try {
                let data = await firebase.firestore.collection('cases')
                                                        .doc(this.state)
                                                        .get()

                if(data.exists){
                    console.log('Existe el estado')
                    this.registeredState = true

                    let response = await firebase.firestore.collection('cases')
                                                        .doc(this.state)
                                                        .onSnapshot((doc) => {
                                                            this.cases = doc.data()
                                                        })

                    this.getCasesCity()
                }else{
                    this.registeredState = false
                    this.registeredCity = false

                    this.cases = {
                        confirmed: 0,
                        suspect: 0,
                        recovered: 0,
                        deaths: 0,
                        date: new Date(),
                    }

                    this.casesCity = {
                        confirmed: 0,
                        suspect: 0,
                        recovered: 0,
                        deaths: 0,
                        date: new Date(),
                    }
                }

            } catch (error) {
                console.log(error)
            }
        },

        //Obtener el contador de casos infectados de firebase a nivel ciudad
        async getCasesCity(){
            try {
                let data = await firebase.firestore.collection('cases')
                                                        .doc(this.state)
                                                        .collection('cities')
                                                        .doc(this.city)
                                                        .get()

                if(data.exists){
                    console.log('Existe la ciudad')
                    this.registeredCity = true

                    let response = await firebase.firestore.collection('cases')
                                                        .doc(this.state)
                                                        .collection('cities')
                                                        .doc(this.city)
                                                        .onSnapshot((doc) => {
                                                            this.casesCity = doc.data()
                                                        })
                }else{
                    this.registeredCity = false

                    this.casesCity = {
                        confirmed: 0,
                        suspect: 0,
                        recovered: 0,
                        deaths: 0,
                        date: new Date(),
                    }
                }
                
            } catch (error) {
                console.log(error)
            }
        },

        //Truncar numeros
        truncarNumbers(x, posiciones = 0) {
            var s = x.toString()
            var l = s.length
            var decimalLength = s.indexOf('.') + 1

            if (l - decimalLength <= posiciones){
                return x
            }
            // Parte decimal del número
            var isNeg  = x < 0
            var decimal =  x % 1
            var entera  = isNeg ? Math.ceil(x) : Math.floor(x)
            // Parte decimal como número entero
            // Ejemplo: parte decimal = 0.77
            // decimalFormated = 0.77 * (10^posiciones)
            // si posiciones es 2 ==> 0.77 * 100
            // si posiciones es 3 ==> 0.77 * 1000
            var decimalFormated = Math.floor(
                Math.abs(decimal) * Math.pow(10, posiciones)
            )
            // Sustraemos del número original la parte decimal
            // y le sumamos la parte decimal que hemos formateado
            var finalNum = entera + 
                ((decimalFormated / Math.pow(10, posiciones))*(isNeg ? -1 : 1))
            
            return finalNum
        },

        //Geolocalizacion
        getLocation(){
            geolocation.getCurrentLocation({
                desiredAccuracy: Accuracy.high,
                maximumAge: 5000,
                timeout: 10000
            }).then((location) => {
                if (location) {
                    this.origin.latitude = location.latitude
                    this.origin.longitude = location.longitude

                    // this.getState()
                    this.reverseGeo()
                    this.watchLocation()
                }
            }, (e) => {
                console.log(e);
            })
        },

        //Obtenemos la direccion por medio de las coordenadas dadas
        reverseGeo(){
            httpModule.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.origin.latitude},${this.origin.longitude}&key=${this.apiKey}`).then((r) => {
                r.results[0].address_components.forEach(element => {
                    if (element.types.includes('locality')){
                       this.city = element.long_name
                    }

                    if (element.types.includes('administrative_area_level_1')){
                       this.state = element.long_name
                    }

                    console.log(`Este es el estado: ${this.state}`)
                    console.log(`Esta es la ciudad: ${this.city}`)

                });

                this.infoDirection.direction = r.results[0].formatted_address
                this.infoDirection.placeId = r.results[0].place_id
                
                // if(r.results[0].address_components){
                //     this.infoDirection.direction = r.results[0].formatted_address
                //     this.infoDirection.country = r.results[0].address_components[5].long_name
                //     this.infoDirection.state = r.results[0].address_components[4].long_name
                //     this.infoDirection.placeId = r.results[0].place_id
                // }else{
                //     this.infoDirection.direction = r.results[0].formatted_address
                //     this.infoDirection.country = r.results[0].address_components[6].long_name
                //     this.infoDirection.state = r.results[0].address_components[5].long_name
                //     this.infoDirection.placeId = r.results[0].place_id
                // }

                //Despues de obtener la direccion nos dirigimos a guardarla en la BDD
                this.saveUbication()

            }, (e) => {
                console.log(e)
            });
        },

        async watchLocation(){
            try {
                this.watchId = await geolocation.watchLocation(
                loc => {
                    if (loc) {
                        this.origin.latitude = loc.latitude
                        this.origin.longitude = loc.longitude
                    }
                },
                e => {
                    console.log(e)
                    alert(ErrorFormatter(e))
                },
                {
                    desiredAccuracy: Accuracy.HIGH,
                    updateDistance: 1,
                    updateTime: 3000,
                    minimumUpdateTime: 100
                }
                )

            } catch (ex) {
                console.log(ex)
                alert(ErrorFormatter(ex))
            }
        },

        //Iniciamos un contador de 60 segundos, despues de eso obtenemos la posicion actual
        getNewUbication(){
            this.breakTime = true
            this.saveUbicationVar = setTimeout(() => {
                //Obtenemos la ubicacion
                this.getLocation()
                
            }, 60000)
        },

        //Antes de guardar la nueva direccion primero verificamos si el usuario ya ha visitado ese lugar
        async saveUbication(){
            try {

                //Generamos un objeto con los datos de la ubicacion
                let ubication = {
                    name: this.infoDirection.direction,
                    dates: [
                        {
                            createdAt: new Date(),
                            updatedAt: null,
                        }
                    ],
                    placeId: this.infoDirection.placeId,
                }
                
                //Obtenemos el documento que corresponde a la direccion que queremos almacenar
                let response = await firebase.firestore.collection('user_locations')
                                                        .doc(this.user.uid)
                                                        .collection('places')
                                                        .doc(ubication.placeId)
                                                        .get()

                //Si el usuario ya ha visitado esa direccion procedemos a actualizarla, de caso contrario
                //guardaremos la direccion como un nuevo registro
                if(response.exists){
                    this.updateUbication(ubication.placeId)
                }else{
                    this.addNewUbication(ubication.placeId)
                }
                
            } catch (error) {
                console.log(error)
            }
        },

        //Si el usuario no habia visitado essa direccion la guardamos como un registro nuevo
        async addNewUbication(id){
            try {
                let ubication = {
                    name: this.infoDirection.direction,
                    dates: [
                        {
                            createdAt: new Date(),
                            updatedAt: null,
                        }
                    ],
                    placeId: this.infoDirection.placeId,
                    origin: this.origin,
                }

                let response = await firebase.firestore.collection('user_locations')
                                                        .doc(this.user.uid)
                                                        .collection('places')
                                                        .doc(id)
                                                        .set(ubication)

                this.breakTime = false
            } catch (error) {
                console.log(error)
            }
        },

        //Si el usuario ya haia visitado esa direccion procedemos entonces a actualizar los registros 
        //de visita del lugar, agregando una nueva hora
        async updateUbication(id){
            try {

                let date = {
                    createdAt: new Date(),
                    updatedAt: null,
                }

                let response = await firebase.firestore.collection('user_locations')
                                                        .doc(this.user.uid)
                                                        .collection('places')
                                                        .doc(id)
                                                        .update({dates: firebase.firestore.FieldValue.arrayUnion(date), origin: this.origin,})

                this.breakTime = false
            } catch (error) {
                console.log(error)
            }
        },

        //Alert de iniciar analizis
        startAnalysis(args){
            console.log(args.action)

            const page = args.object.page
            const image = page.getViewById('image-1')


            const pulse_1 = page.getViewById('pulse-1')
            const pulse_2 = page.getViewById('pulse-2')
            const pulse_danger = page.getViewById('pulse-danger')

            if(args.action === 'down'){
                image.animate({
                    scale: {
                        x: 0.90,
                        y: 0.90
                    },
                    opacity: 0.8,
                    curve: AnimationCurve.easeIn,
                    duration: 80,
                })
            }

            if(args.action === 'up'){
                image.animate({
                    scale: {
                        x: 1,
                        y: 1
                    },
                    opacity: 1,
                    curve: AnimationCurve.easeIn,
                    duration: 80,
                })

                pulse_1.animate({
                    scale: { x: 9, y: 9},
                    opacity: 0,
                    curve: AnimationCurve.easeIn,
                    duration: 1300,
                    iterations: Number.POSITIVE_INFINITY,
                })

                pulse_2.animate({
                    scale: { x: 9, y: 9},
                    opacity: 0,
                    curve: AnimationCurve.easeIn,
                    duration: 1300,
                    delay: 500,
                    iterations: Number.POSITIVE_INFINITY,
                })

                pulse_danger.animate({
                    scale: { x: 9, y: 9},
                    opacity: 0,
                    curve: AnimationCurve.easeIn,
                    duration: 1000,
                    iterations: Number.POSITIVE_INFINITY,
                })

                this.analyzing = true
                this.getInfectedLocations()

                // confirm({
                //     title: "Iniciar Análisis",
                //     message: "Esto comenzará un análisis de tus ubicaciones, por favor no cierres la aplicación.",
                //     okButtonText: "Entendido",
                //     cancelButtonText: "Cancelar"
                // }).then((result) => {
                //     const page = args.object.page
                //     const image = page.getViewById('image-2')
                    
                //     if(result){
                //         this.analyzing = true
                //         this.getInfectedLocations()
                //     }
                    
                // });
            }
            
            
        },

        //Obtenemos las zonas infectadas hasta el momento, y despues pasamos a compararlas con
        //las ubicaciones del usuario
        async getInfectedLocations(){
            console.log('1')
            this.infectedLocations = []
            this.userLocations = []
            try {
                let response = await firebase.firestore.collection('infected_locations')
                                                            .get()
                                                            .then((query) => {
                                                                query.forEach((doc) => {
                                                                    this.infectedLocations.push(doc.data())
                                                                })
                                                            })
                this.getUserLocations()

            } catch (error) {
                console.log(error)
            }
        },

        //Obtenemos las ubicaciones en las que ha estado el usuario que han estado infectadas
        getUserLocations(){
            console.log('2')
            this.infectedLocations.forEach(async (doc, index) => {
                let response = await firebase.firestore.collection('user_locations')
                                                        .doc(this.user.uid)
                                                        .collection('places')
                                                        .doc(doc.placeId)
                                                        .get()

                if(response.exists){
                    this.userLocations.push(response.data())
                }
            })

            setTimeout(() => {
                this.getDatesInfection();
            }, 10000)
        },

        //Si detectamos una zona infectada dentro de las ubicaciones del usuario, pasamos
        //a verificar las fechas de infeccion
        getDatesInfection(){
            console.log('3')
            try {
                this.userLocations.forEach((doc) => {
                    let ubicationFound = this.infectedLocations.find((document) => {
                        return document.placeId == doc.placeId
                    })

                    //Si encuentra una ubicacion
                    if(ubicationFound != undefined){
                        doc.dates.forEach((val, index) => {
                            let date_1 = moment(val.createdAt).format('L')
                            let dateFound = ubicationFound.dates.find((value, index) => {
                                let date_2 = moment(value.createdAt).format('L')
                                return date_1 == date_2
                            })

                            //Si encuentra una fecha
                            if(dateFound != undefined){
                                let diff_1 = moment(val.createdAt)
                                let diff_2 = moment(dateFound.createdAt)

                                console.log(moment(val.createdAt).format('LT'))
                                console.log(moment(dateFound.createdAt).format('LT'))
                                //Calcular la diferencia entre las horas
                                // let hour_1 = moment(val.createdAt)
                                // var hour_2 = moment(dateFound.createdAt)

                                let duration = moment.duration(diff_1.diff(diff_2))
                                let diference = duration.asMinutes()
                                
                                if(Math.sign(diference) == (-1)){
                                    diference = diference * (-1)
                                }

                                if(diference < 10){
                                    //this.getNotification()
                                    let selectUbication = {
                                        name: ubicationFound.name,
                                        dateUser: diff_1,
                                        dateRegister: diff_2,
                                    }

                                    this.selectedUbications.push(selectUbication)
                                }
                            }
                        })
                    }
                    
                })
                this.getResults()
                console.log('Termino el analizis')
            } catch (error) {
                console.log(error)
            }
            
        },

        getResults(){
            this.analyzing = false
            console.log(this.selectedUbications.length)
            if(this.selectedUbications.length != 0){
                this.getNotification(1)
                this.infected = true
            }else{
                this.getNotification(2)
                //Cambiar a false
                this.infected = false

                //Solo si el usuario ya se encontraba expuesto es que cambiamos la variable
                //para tener el background naranja
                if(this.user.infection){
                    this.infected = true
                }
            }
        },

        //Lanzamos la notificacion de aviso de infeccion
        getNotification(args) {
            switch (args) {
                case 1:
                    LocalNotifications.schedule(
                    [{
                        id: 1,
                        title: 'Alerta de exposición',
                        subtitle: 'Posible riesgo de exposición',
                        body: 'Se detecto que una de las zonas que visitaste recientemente pudiera haber estado expuesta.',
                        bigTextStyle: false,
                        color: new Color("green"),
                        //image: "https://images-na.ssl-images-amazon.com/images/I/61mx-VbrS0L.jpg",
                        thumbnail: "https://i.ibb.co/jfb3LCh/logo.png",
                        forceShowWhenInForeground: true,
                        channel: "vue-channel",
                        ticker: "partnergrammer",
                        at: new Date(new Date().getTime() + (5 * 1000)), // 5 seconds from now
                        actions: [
                            {
                                id: "yes",
                                type: "button",
                                title: "Entendido",
                                launch: true
                            },
                            {
                                id: "no",
                                type: "button",
                                title: "Ignorar",
                                launch: false
                            }
                        ]
                    }])
                    break;

                case 2:
                    LocalNotifications.schedule(
                    [{
                        id: 1,
                        title: 'Análisis finalizado',
                        subtitle: 'Se ha terminado el análisis',
                        body: 'No se detectaron zonas expuestas en tus ubicaciones.',
                        bigTextStyle: false,
                        color: new Color("green"),
                        //image: "https://images-na.ssl-images-amazon.com/images/I/61mx-VbrS0L.jpg",
                        thumbnail: "https://i.ibb.co/jfb3LCh/logo.png",
                        forceShowWhenInForeground: true,
                        channel: "vue-channel",
                        ticker: "partnergrammer",
                        at: new Date(new Date().getTime() + (5 * 1000)), // 5 seconds from now
                        actions: [
                            {
                                id: "yes",
                                type: "button",
                                title: "Entendido",
                                launch: false
                            },
                            {
                                id: "no",
                                type: "button",
                                title: "Ignorar",
                                launch: false
                            }
                        ]
                    }])
                    break;
            
                default:
                    LocalNotifications.schedule(
                    [{
                        id: 1,
                        title: 'Análisis finalizado',
                        subtitle: 'Se ha terminado el análisis',
                        body: 'No se detectaron zonas expuestas en tus ubicaciones.',
                        bigTextStyle: false,
                        color: new Color("green"),
                        //image: "https://images-na.ssl-images-amazon.com/images/I/61mx-VbrS0L.jpg",
                        thumbnail: "https://i.ibb.co/jfb3LCh/logo.png",
                        forceShowWhenInForeground: true,
                        channel: "vue-channel",
                        ticker: "partnergrammer",
                        at: new Date(new Date().getTime() + (5 * 1000)), // 5 seconds from now
                        actions: [
                            {
                                id: "yes",
                                type: "button",
                                title: "Entendido",
                                launch: false
                            },
                            {
                                id: "no",
                                type: "button",
                                title: "Ignorar",
                                launch: false
                            }
                        ]
                    }])
                    break;
            }
            
        },

        goToPhone(){
            console.log('Hola Mundo')
            const phoneNumber = '200-48-10'

            TNSPhone.requestCallPermission('You should accept the permission to be able to make a direct phone call.')
                .then(() => TNSPhone.dial(phoneNumber, false))
                .catch(() => TNSPhone.dial(phoneNumber, true))
        },
    }
}
</script>