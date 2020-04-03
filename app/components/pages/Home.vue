<template>
    <Page actionBarHidden="false">
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="" class="font-awesome" fontSize="20" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <!-- <Label text="" class="font-awesome" fontSize="20" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/> -->
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <Sidedrawer />

            <GridLayout ~mainContent columns="*" rows="*" backgroundColor="#F3F3F3">
                <ScrollView col="0" row="0">
                    <WrapLayout orientation="vertical" width="90%" paddingBottom="20">
                        <StackLayout marginTop="20">
                            <Label :text="'Hola, ' + user.name" fontSize="25" fontWeight="lighter" textWrap="true" horizontalAlignment="left" />
                            <FlexboxLayout marginTop="10">
                                <Label text="" class="font-awesome" textWrap="true" />
                                <Label :text="infoDirection.direction" marginLeft="10" fontSize="12" textWrap="true" />
                                <Label text="" class="font-awesome" textWrap="true" marginLeft="10" @tap="getLocation" />
                            </FlexboxLayout>
                            <!-- <Label v-if="origin" :text="locationDescription" textWrap="true" /> -->
                        </StackLayout>

                        <StackLayout>
                            <FlexboxLayout marginTop="40">
                                <Label text="" class="font-awesome" textWrap="true" />
                                <Label text="Estado" marginLeft="10" fontSize="14" fontWeight="lighter" textWrap="true" />
                            </FlexboxLayout>

                            <Label v-if="!user.infection" text="SIN EXPOSICIÓN" marginLeft="20" fontSize="25" fontWeight="bold" color="black" textWrap="true" />
                            <Label v-else text="EXPUESTO" marginLeft="20" fontSize="25" fontWeight="bold" textWrap="true" color="red" />
                            
                            <StackLayout marginTop="20" borderWidth="1 0 0 0" borderColor="black" width="100%" />
                            <StackLayout marginTop="5" borderWidth="1 0 0 0" borderColor="black" width="100%" />

                            <Label horizontalAlignment="center" marginTop="10" fontSize="25" color="black" text="CASOS EN CHIHUAHUA" fontWeight="bold"  textWrap="true" />

                            <StackLayout verticalAlignment="center" marginTop="10">
                                <Label horizontalAlignment="center" fontSize="18" text="Confirmados" textWrap="true" />

                                <StackLayout verticalAlignment="center" width="100" height="100" backgroundColor="#EC462F" borderRadius="150" marginTop="5">
                                    <Label :text="cases.confirmed" color="white" fontSize="25" textWrap="true" horizontalAlignment="center" />
                                </StackLayout>
                            </StackLayout>

                            <StackLayout verticalAlignment="center" marginTop="10">
                                <Label horizontalAlignment="center" fontSize="18" text="Sospechosos" textWrap="true" />

                                <StackLayout verticalAlignment="center" width="100" height="100" backgroundColor="#E6A82E" borderRadius="150" marginTop="5">
                                    <Label :text="cases.suspect" color="white" fontSize="25" textWrap="true" horizontalAlignment="center" />
                                </StackLayout>
                            </StackLayout>

                            <StackLayout verticalAlignment="center" marginTop="10">
                                <Label horizontalAlignment="center" fontSize="18" text="Negativos" textWrap="true" />

                                <StackLayout verticalAlignment="center" width="100" height="100" backgroundColor="#3C8106" borderRadius="150" marginTop="5">
                                    <Label :text="cases.recovered" color="white" fontSize="25" textWrap="true" horizontalAlignment="center" />
                                </StackLayout>
                            </StackLayout>
                            
                            <!-- <StackLayout width="100%" backgroundColor="red" borderRadius="15" marginTop="20">
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
                            </StackLayout> -->

                            <StackLayout width="100%" marginTop="20">
                                <Button text="Analizar" @tap="startAnalysis" backgroundColor="black" color="white" width="100%" />
                                
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

//API KEY
import apiKeyHelper from '../key.js'

//Moment
let moment = require('moment')

//Local notification
import { LocalNotifications } from "nativescript-local-notifications";
import { alert } from "tns-core-modules/ui/dialogs";
import { Color } from "tns-core-modules/color";

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

export default {
    name: 'Home',

    data(){
        return{
            origin: { 
                latitude: 0, 
                longitude: 0 
            },
            infoDirection: {
                direction: 'No se puede obtener tu direccion...',
                country: '',
                state: '',
                placeId: '',
            },
            breakTime: false,
            watchId: '',
            saveUbicationVar: '',
            infectedLocations: [],
            userLocations: [],
            flag: false,
            cases: '',
            selectedUbications: [],
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

        // userLocations(){
        //     this.getDatesInfection()
        // }
    },

    computed: {
        ...mapState([
                'user'
            ]),

        locationDescription() {
            return `You are at ${this.origin.latitude}, ${this.origin.longitude}.`;
        }
    },

    methods: {

        //Obtener el contador de casos infectados de firebase
        async getCases(){
            try {
                let response = await firebase.firestore.collection('cases')
                                                        .doc('chihuahua')
                                                        .onSnapshot((doc) => {
                                                            this.cases = doc.data()
                                                            console.log(this.cases)
                                                        })
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
            //Loader activate
            //loader.show(options)

            geolocation.getCurrentLocation({
                desiredAccuracy: Accuracy.high,
                maximumAge: 5000,
                timeout: 10000
            }).then((location) => {
                if (location) {
                    this.origin.latitude = location.latitude
                    this.origin.longitude = location.longitude

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
                if(r.results[0].address_components.length == 6){
                    this.infoDirection.direction = r.results[0].formatted_address
                    this.infoDirection.country = r.results[0].address_components[5].long_name
                    this.infoDirection.state = r.results[0].address_components[4].long_name
                    this.infoDirection.placeId = r.results[0].place_id
                }else{
                    this.infoDirection.direction = r.results[0].formatted_address
                    this.infoDirection.country = r.results[0].address_components[6].long_name
                    this.infoDirection.state = r.results[0].address_components[5].long_name
                    this.infoDirection.placeId = r.results[0].place_id
                }
                

                //Despues de obtener la direccion nos dirigimos a guardarla en la BDD
                this.saveUbication()

                //Loader deactivate
                //loader.hide()
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
        startAnalysis(){
            alert({
                title: "Iniciar Analisis",
                message: "Esto comenzara un analisis de tus ubicaciones, porfavor no cierres la aplicacion.",
                okButtonText: "Entendido"
            }).then(() => {
                this.getInfectedLocations()
            });
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
            console.log(this.selectedUbications.length)
            if(this.selectedUbications.length != 0){
                this.getNotification(1)
            }else{
                this.getNotification(2)
            }
        },

        //Lanzamos la notificacion de aviso de infeccion
        getNotification(args) {
            switch (args) {
                case 1:
                    LocalNotifications.schedule(
                    [{
                        id: 1,
                        title: 'Alerta de exposicion',
                        subtitle: 'Posible riesgo de exposicion',
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
                        title: 'Analisis finalizado',
                        subtitle: 'Se ha terminado el analisis',
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
                        title: 'Analisis finalizado',
                        subtitle: 'Se ha terminado el analisis',
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
    }
}
</script>

<style>
</style>