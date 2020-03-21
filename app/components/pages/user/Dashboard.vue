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
                        <StackLayout orientation="vertical">
                            <TextField hint="User number" text="" fontSize="12" marginTop="20" v-model="uid" width="100%" />
                            <Button text="Obtener" @tap="getUser" width="100%" />
                        </StackLayout>

                        <StackLayout v-if="userData != null" marginTop="20">
                            <Label :text="userData.name" textWrap="true" fontSize="25" horizontalAlignment="center" />
                            <StackLayout marginTop="15">
                                <Label v-if="!userData.infection" text="NO INFECTADO" fontSize="20" fontWeight="bold" color="green" horizontalAlignment="center" textWrap="true" />
                                <Label v-else text="INFECTADO" fontSize="20" fontWeight="bold" color="red" horizontalAlignment="center" textWrap="true" />
                            </StackLayout>
                            
                            <Button text="CAMBIAR" marginTop="20" backgroundColor="red" color="black" width="150" height="150" borderRadius="100" @tap="updateUser" />
                            

                            <StackLayout v-if="ubications.lenght != 0">
                                <FlexboxLayout justifyContent="center" alignItems="center" marginTop="20">
                                    <Label text="" textWrap="true" fontSize="20" class="font-awesome" />
                                    <Label text="Historial de ubicaciones" textWrap="true" fontSize="20" marginLeft="10" />
                                </FlexboxLayout>

                                <Button text="Obtener" @tap="getUbications" width="100%" />
                                
                                
                                <StackLayout v-for="(item, index) in ubications" :key="index" marginTop="50">
                                    <StackLayout orientation="horizontal">
                                        <Switch checked="false" @checkedChange="setDate(item)" />
                                        <Label :text="item.name" textWrap="true" />
                                    </StackLayout>
                                    
                                    <!-- <StackLayout v-if="item.show">
                                        <DateTimePickerFields
                                            hintDate="tap to choose date" hintTime="tap to choose time"
                                            :minDate="minDatePicker" 
                                            :maxDate="maxDatePicker"></DateTimePickerFields>
                                    </StackLayout> -->
                                </StackLayout>
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

//Vuex
import { mapState } from 'vuex'

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

//Modals
import ModalDate from '../../modals/UbicationDate'

export default {
    name: 'Dashboard',

    components: [
        ModalDate,
    ],

    data(){
        return{
            uid: 'zBujRyClYTMym8lZsePuvxecwAr2',
            userData: null,
            ubications: [],
        }
    },

    created(){

    },

    mounted(){

    },

    watch: {

    },

    computed: {
        ...mapState([
                'user'
            ]),

        minDatePicker(){
            return new Date(2020, 0, 1)
        },

        maxDatePicker(){
            return new Date()
        },
    },

    methods: {
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

        async updateStatusUser(){
            try {
                let response = await firebase.firestore.collection('users')
                                                        .doc(this.uid)
                                                        .update({ infection: !this.userData.infection })

                this.getUser()
            } catch (error) {
                console.log(error)
            }
        },

        //Abrimos modal para seleciconar fecha
        setDate(item){
            this.$showModal(ModalDate, {
                props:{
                    item: item,
                }
            })
        },
    }
}
</script>

<style>
</style>