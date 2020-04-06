<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="Menú" class="font-awesome" fontSize="20" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <Sidedrawer />

            <GridLayout ~mainContent columns="*" rows="*" backgroundColor="#F3F3F3">
                <ScrollView col="0" row="0">
                    <WrapLayout orientation="vertical" width="90%" paddingBottom="20">
                        
                        <GridLayout rows="*, 2*" colums="*">
                            <StackLayout row="0" col="0">
                                <Label text="CONSERVA LA CALMA" horizontalAlignment="center" marginTop="20" fontSize="25" fontWeight="bold" textWrap="true" />
                                <Label text="ESTAS SON ALGUNAS RECOMENDACIONES A SEGUIR" textAlignment="center" marginTop="10" fontSize="16" textWrap="true" />
                                
                            </StackLayout>

                            <StackLayout row="1" col="0">
                                <StackLayout marginTop="20">
                                    <StackLayout orientation="horizontal">
                                        <Label text=">" textWrap="true" class="font-awesome" />
                                        <Label marginLeft="10" text="Se recomienda permanecer en el domicilio por 14 días (después de último contacto) aun cuando se encuentren asintomáticos, esto para evitar la propagación del virus." textWrap="true" />
                                    </StackLayout>
                                    
                                    <StackLayout orientation="horizontal" marginTop="10">
                                        <Label text=">" textWrap="true" class="font-awesome" />
                                        <Label marginLeft="10" text="Lleva un registro de las personas con las que tengas contacto de manera cotidiana y contacta de manera inmediata a la DGE a través de la Unidad de Inteligencia Epidemiológica y Sanitaria (UIES) marcando al 800 00 44800." textWrap="true" />
                                    </StackLayout>

                                    <StackLayout orientation="horizontal" marginTop="10">
                                        <Label text=">" textWrap="true" class="font-awesome" />
                                        <Label marginLeft="10" text="Sigue las medidas de protección recomendadas para todas las personas (lavarse las manos con agua y jabón o usando un desinfectante a base de alcohol; evita tocarte los ojos, la nariz y la boca; cubre tu boca con un pañuelo al estornudar y toser)." textWrap="true" />
                                    </StackLayout>

                                    <StackLayout orientation="horizontal" marginTop="10">
                                        <Label text=">" textWrap="true" class="font-awesome" />
                                        <Label marginLeft="10" text="Cuando te laves las manos, usa jabón y agua y sécalas con toallas de papel desechables; si no están disponibles, usa toallas de tela exclusivas para ti mismo y rémplazalas cuando estén húmedas." textWrap="true" />
                                    </StackLayout>

                                    <StackLayout orientation="horizontal" marginTop="10">
                                        <Label text=">" textWrap="true" class="font-awesome" />
                                        <Label marginLeft="10" text="Permanece en casa si empiezas a sentirte mal, aún si solo es un dolor de cabeza, fiebre ligera o rinorrea leve hasta que te recuperes. Si tienes que salir, o recibir una visita, utiliza una mascarilla para evitar contagiar a otras personas." textWrap="true" />
                                    </StackLayout>

                                    <StackLayout orientation="horizontal" marginTop="10">
                                        <Label text=">" textWrap="true" class="font-awesome" />
                                        <Label marginLeft="10" text="Si tienes fiebre, tos y dificultad para respirar, busca rápidamente una valoración médica. Es posible que tenga una infección respiratoria que podría agravarse." textWrap="true" />
                                    </StackLayout>

                                    <StackLayout orientation="horizontal" marginTop="10">
                                        <Label text=">" textWrap="true" class="font-awesome" />
                                        <Label marginLeft="10" text="Llama con antelación a tu dispensador de atención de salud para que te dirija al lugar adecuado." textWrap="true" />
                                    </StackLayout>

                                    <StackLayout orientation="horizontal" marginTop="10">
                                        <Label text=">" textWrap="true" class="font-awesome" />
                                        <Label marginLeft="10" text="Si usas un cubrebocas, ajústalo al tamaño de tu cara." textWrap="true" />
                                    </StackLayout>

                                    <StackLayout orientation="horizontal" marginTop="10">
                                        <Label text=">" textWrap="true" class="font-awesome" />
                                        <Label marginLeft="10" text="Si el cubrebocas se humedece o ensucia con secreciones, es importante cambiarlo inmediatamente." textWrap="true" />
                                    </StackLayout>

                                    <StackLayout orientation="horizontal" marginTop="10">
                                        <Label text=">" textWrap="true" class="font-awesome" />
                                        <Label marginLeft="10" textAlignment="left" text="Se deben limpiar y desinfectar una vez al día las superficies tocadas con frecuencia, como mesas de noche, cabecera de la cama, y otros muebles del dormitorio. Hay que hacerlo con una solución de cloro diluido (1 parte de cloro doméstico o comercial por 99 partes de agua). También se deben limpiar y desinfectar las superficies del baño y el inodoro al menos una vez al día, con la misma solución." textWrap="true" />
                                    </StackLayout>
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
    name: 'Recomendations',

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