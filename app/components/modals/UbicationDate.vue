<template>
    <StackLayout width="300" height="500">
        <GridLayout rows="60, *" colums="*">
            <StackLayout row="0" col="0">
                <Label text="Horas de exposicion" textWrap="true" horizontalAlignment="center" fontSize="20" fontWeight="bold" />
            </StackLayout>

            <ScrollView row="1" col="0" height="440">
                <WrapLayout marginLeft="10">
                    <FlexboxLayout justifyContent="center" alignItems="center" marginTop="10" v-for="(item, index) in item.dates" :key="index">
                        <Switch checked="false" @checkedChange="addUbication(item.createdAt)" />
                        <Label :text="item.createdAt | formatDate" textWrap="true" fontSize="17" />
                    </FlexboxLayout>
                </WrapLayout>
            </ScrollView>
        </GridLayout>
    </StackLayout>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Moment
let moment = require('moment')

export default {
    name: 'ModalUbication',

    props: [
		'item'
	],

    data(){
        return{
            selectedDate: '',
            selectedTime: '',
        }
    },

    computed: {
        minDatePicker(){
            return new Date(2020, 0, 1)
        },

        maxDatePicker(){
            return new Date()
        },
    },

    filters:{
		formatDate(date){
            moment.locale('es'); 
			let fecha = moment(date).format('lll')
			return fecha

		}
	},

    methods: {
        //Agregamos la nueva ubicacion al grupo de ubicaciones infectadas
        async addUbication(date){
            try {
                let response = await firebase.firestore.collection('infected_locations')
                                                        .doc(this.item.placeId)
                                                        .get()

                //Si la ubicacion ya fue registrada, solamente actualizamos el registro de hora de infeccion,
                //de caso contrario agregamos la ubicacion como nueva
                if(response.exists){
                    this.updateUbication(date)
                }else{
                    this.addNewUbication(date)
                }
            } catch (error) {
                console.log(error)
            }
        },

        //Si el usuario no habia visitado essa direccion la guardamos como un registro nuevo
        async addNewUbication(date){
            try {
                let ubication = {
                    name: this.item.name,
                    origin: this.item.origin,
                    dates: [
                        {
                            createdAt: date,
                            updatedAt: null,
                        }
                    ],
                    placeId: this.item.placeId,
                }

                let response = await firebase.firestore.collection('infected_locations')
                                                        .doc(this.item.placeId)
                                                        .set(ubication)

            } catch (error) {
                console.log(error)
            }
        },

        //Si el usuario ya haia visitado esa direccion procedemos entonces a actualizar los registros 
        //de visita del lugar, agregando una nueva hora
        async updateUbication(date){
            try {

                let newDate = {
                    createdAt: date,
                    updatedAt: null,
                }

                let response = await firebase.firestore.collection('infected_locations')
                                                        .doc(this.item.placeId)
                                                        .update({dates: firebase.firestore.FieldValue.arrayUnion(newDate), origin: this.item.origin,})

            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>

</style>