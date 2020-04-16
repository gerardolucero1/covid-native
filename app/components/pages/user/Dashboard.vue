<style>
    .text_field{
        border: none;
        border-bottom: 1px solid black;
        border-width: 0 0 1px 0;
    }

    Label{
        color: black;
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
                        <StackLayout orientation="vertical">
                            <TextField class="text_field" hint="User number" text="" fontSize="12" marginTop="20" v-model="uid" width="100%" />
                            <Button text="Obtener" marginTop="10" backgroundColor="#3883FB" color="white" @tap="getUser" width="100%" />

                            <MLKitBarcodeScanner
                                v-if="camera"
                                width="260"
                                height="380"
                                beepOnScan="true"
                                formats="QR_CODE, EAN_8, EAN_13"
                                preferFrontCamera="false"
                                supportInverseBarcodes="false"
                                @scanResult="getQRResult($event)">
                            </MLKitBarcodeScanner>
                            <Button text="" class="font-awesome" backgroundColor="#3883FB" marginTop="10" color="white" @tap="camera = !camera" width="100%" />
                        </StackLayout>

                        <StackLayout v-if="userData != null" marginTop="20">
                            <Label :text="userData.name" textWrap="true" fontSize="25" horizontalAlignment="center" />
                            <StackLayout marginTop="15">
                                <Label v-if="!userData.infection" text="NO EXPUESTO" fontSize="20" fontWeight="bold" color="green" horizontalAlignment="center" textWrap="true" />
                                <Label v-else text="EXPUESTO" fontSize="20" fontWeight="bold" color="red" horizontalAlignment="center" textWrap="true" />
                            </StackLayout>
                            
                            <Button text="CAMBIAR" marginTop="20" backgroundColor="red" color="black" width="150" height="150" borderRadius="100" @tap="updateUser" />
                            

                            <StackLayout v-if="ubications.lenght != 0">
                                <FlexboxLayout justifyContent="center" alignItems="center" marginTop="20">
                                    <Label text="" textWrap="true" fontSize="20" class="font-awesome" />
                                    <Label text="Historial de ubicaciones" textWrap="true" fontSize="20" marginLeft="10" />
                                </FlexboxLayout>

                                <Button text="Obtener" backgroundColor="#3883FB" color="white" @tap="getUbications" width="100%" />
                                
                                
                                <StackLayout v-for="(item, index) in ubications" :key="index" marginTop="50">
                                    <StackLayout orientation="horizontal">
                                        <Label :text="item.name" textWrap="true" />
                                    </StackLayout>
                                </StackLayout>

                            </StackLayout>
                        </StackLayout>

                        <StackLayout v-if="user.userType == 'webmaster'">
                            <StackLayout>
                                <Label horizontalAlignment="center" fontSize="22" text="Ciudad:" textWrap="true" />
                                <Label horizontalAlignment="center" fontSize="19" :text="city" textWrap="true" />
                                
                            </StackLayout>
                            <StackLayout>
                                <Label text="Confirmados" textWrap="true" />
                                <TextField class="text_field" hint="" text="" v-model="cases.confirmed" keyboardType="number" />
                            </StackLayout>

                            <StackLayout>
                                <Label text="Sospechosos" textWrap="true" />
                                <TextField class="text_field" hint="" text="" v-model="cases.suspect" keyboardType="number" />
                            </StackLayout>
                            <StackLayout>
                                <Label text="Recuperados" textWrap="true" />
                                <TextField class="text_field" hint="" text="" v-model="cases.recovered" keyboardType="number" />
                            </StackLayout>
                            <StackLayout>
                                <Label text="Muertes" textWrap="true" />
                                <TextField class="text_field" hint="" text="" v-model="cases.deaths" keyboardType="number" />
                            </StackLayout>

                            <Button text="Actualizar casos" marginTop="10" backgroundColor="#3883FB" color="white" @tap="confirmUpdate" />
                            
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

//HTTP
const httpModule = require("tns-core-modules/http");

//Access permissions
import * as permissions from 'nativescript-permissions'
import * as platform from 'platform'

//Moment
let moment = require('moment')

//Camera firebase
import { BarcodeFormat, MLKitScanBarcodesOnDeviceResult } from "nativescript-plugin-firebase/mlkit/barcodescanning";

//iOS or Android
import { isAndroid, isIOS } from "tns-core-modules/ui/page";

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

export default {
    name: 'Dashboard',

    data(){
        return{
            //uid: '76mL7dPrMoNi9yQJtZ7Y5GmAb8O2',
            uid: '',
            userData: null,
            ubications: [],
            camera: false,
            cases: '',
            update: true,
        }
    },

    created(){
        this.getCases()
        if (isAndroid) {
            /* list of permissions needed */
            let permissionsNeeded = [
                android.Manifest.permission.CAMERA,
            ]

            /* showing up permissions dialog */
            permissions
                .requestPermissions(permissionsNeeded, "Give it to me!")
                .then(() => {
                    this.allowExecution = true
                    this.getLocation()
                })
                .catch(() => this.allowExecution = false)
            } else if (isIOS) {
                // iOS code here
            }
    },

    mounted(){
        this.getCases()
    },

    watch: {

    },

    computed: {
        ...mapState([
                'user',
                'state',
                'city',
            ]),

        minDatePicker(){
            return new Date(2020, 0, 1)
        },

        maxDatePicker(){
            return new Date()
        },
    },

    methods: {
        //Obtener casos de covid
        async getCases(){
            try {

                let data = await firebase.firestore.collection('cases')
                                                        .doc(this.state)
                                                        .get()

                if(data.exists){
                    console.log('Existe el estado')
                    let response = await firebase.firestore.collection('cases')
                                                        .doc(this.state)
                                                        .collection('cities')
                                                        .doc(this.city)
                                                        .get()

                    if(response.exists){
                        console.log('Existe la ciudad')
                        this.cases = response.data()
                    }else{
                        this.update = false

                        this.cases = {
                            confirmed: 0,
                            suspect: 0,
                            recovered: 0,
                            deaths: 0,
                        }
                    }
                }else{
                    this.update = false

                    this.cases = {
                        confirmed: 0,
                        suspect: 0,
                        recovered: 0,
                        deaths: 0,
                    }
                }

            } catch (error) {
                console.log(error)
            }
        },

        confirmUpdate(){
            confirm({
                title: "¿Actualizar los datos?",
                message: `Se actualizaran los datos de la siguiente ciudad: ${this.city}.`,
                okButtonText: "Entendido",
                cancelButtonText: "Cancelar"
            }).then(result => {
                if(result){
                    this.updateCases()
                }
            });
        },

        async updateCases(){
            try {
                if(this.update){
                    let response = await firebase.firestore.collection('cases')
                                                        .doc(this.state)
                                                        .collection('cities')
                                                        .doc(this.city)
                                                        .update(this.cases)
                }else{
                    let response = await firebase.firestore.collection('cases')
                                                        .doc(this.state)
                                                        .collection('cities')
                                                        .doc(this.city)
                                                        .set(this.cases)
                }

                alert({
                    title: "Datos actualizados",
                    message: `Se han actualizado los datos de la siguiente ciudad: ${this.city}.`,
                    okButtonText: "Entendido"
                }).then(() => {
                    console.log("Alert dialog closed");
                });
            } catch (error) {
                console.log(error)
            }
        },

        //Lector QR
        getQRResult(args){
            if(args.value.barcodes[0] != undefined){
                console.log(args.value.barcodes[0].value)
                this.uid = args.value.barcodes[0].value
                this.camera = false
            }

        },

        //Obtenemos al usuario seleccionado
        async getUser(){
            try {
                let response = await firebase.firestore.collection('users')
                                                        .doc(this.uid)
                                                        .get()

                if(response.exists){
                    this.userData = response.data()
                }else{
                    alert({
                        title: "Error de usuario",
                        message: "El usuario no fue encontrado",
                        okButtonText: "ACEPTAR"
                    }).then(() => {
                        
                    });
                }
            } catch (error) {
                console.log(error)
            }
        },

        //Actualizamos el estado del usuario
        updateUser(){
            confirm({
                title: "¿Seguro?",
                message: "Cambiar el estatus del usuario",
                okButtonText: "ACEPTAR",
                cancelButtonText: "CANCELAR"
            }).then(result => {
                if(result){
                    this.updateStatusUser()
                }
            });
        },

        //Actualizamos el estatus del usuario
        async updateStatusUser(){
            try {
                let response = await firebase.firestore.collection('users')
                                                        .doc(this.uid)
                                                        .update({ infection: !this.userData.infection })
                if(this.userData.infection){
                    console.log('NO actualizar')
                }else{
                    console.log('Si actualizar')
                    this.getUbications()
                }
                
                this.getUser()
                
            } catch (error) {
                console.log(error)
            }
        },

        //Obtenemos todas las ubicaciones en las que ha estado
        async getUbications(){
            this.ubications = []
            try {
                let response = await firebase.firestore.collection('user_locations')
                                                        .doc(this.uid)
                                                        .collection('places')
                                                        .get()
                                                        .then(snapshot => {
                                                            snapshot.forEach(doc => {
                                                                this.ubications.push(doc.data())
                                                            })
                                                        }).catch(err => {
                                                            console.log("Error getting sub-collection documents", err);
                                                        })
                
                setTimeout(() => {
                        this.updateUbications()
                }, 5000)
            } catch (error) {
                console.log(error)
            }
            finally{
                
            }
        },

        updateUbications(){
            //Obtenemos la fecha de hoy y una de 12 dias atras
            let date_1 = moment(new Date()).format('L');
            let date_2 = moment(new Date()).subtract('12', 'days').format('L');

            let arrayUbications = []

            //Recorremos una por una las ubicaciones del usuario
            this.ubications.forEach((document) => {
                let ubication = document
                //Filtramos las fechas de visitas para obtener solo las que esten en el rango 
                //de hoy y doce dias atras
                let dates = document.dates.filter((doc) => {
                    let date_3 = moment(doc.createdAt).format('L')
                    return  date_3 >= date_2 && date_3 <= date_1
                })
                if(dates.length != 0){
                    ubication.dates = dates
                    arrayUbications.push(ubication)
                }
            })

            this.addNewUbications(arrayUbications)
        },
        
        //Dirigimos a una funcion especifica dependiendo si la ubicacion ya existe o es nueva
        async addNewUbications(args){
            try {
                args.forEach(async (document) => {
                    let response = await firebase.firestore.collection('infected_locations')
                                                        .doc(document.placeId)
                                                        .get()

                    //Si la ubicacion ya fue registrada, solamente actualizamos el registro de hora de infeccion,
                    //de caso contrario agregamos la ubicacion como nueva
                    if(response.exists){
                        this.updateUbication(document)
                    }else{
                        this.addNewUbication(document)
                    }
                })
            } catch (error) {
                console.log(error)
            }
            finally{
                console.log('Echo')
            }
        },

        //Si la ubicacion no ha sido marcada como zona de riesgo la agregamos
        async addNewUbication(document){
            try {

                let response = await firebase.firestore.collection('infected_locations')
                                                        .doc(document.placeId)
                                                        .set(document)

            } catch (error) {
                console.log(error)
            }
        },

        //Si la zona ya habia sido marcada simplemente agregamos la nueva fecha de exposicion
        async updateUbication(document){
            try {

                let newDate = document.dates

                let response = await firebase.firestore.collection('infected_locations')
                                                        .doc(document.placeId)
                                                        .update({dates: firebase.firestore.FieldValue.arrayUnion(newDate), origin: document.origin,})

            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>