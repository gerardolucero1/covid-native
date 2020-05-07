<template>
    <Page>
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
                <StackLayout row="0" col="0" @swipe="changeCount">
                    <GridLayout rows="*, 50" columns="*">
                        <!-- infografia 1 -->
                        <StackLayout v-if="count == 1" row="0" col="0">
                            <GridLayout rows="100, *, *" columns="*">
                                <StackLayout marginTop="10" row="0" col="0">
                                    <Label textAlignment="center" text="PERMANECE EN CASA" fontSize="25" horizontalAlignment="center" textWrap="true" />
                                </StackLayout>

                                <StackLayout marginTop="10" row="1" col="0" width="80%">
                                    <Image src="~/assets/images/info-1.png" stretch="aspectFit" />
                                </StackLayout>

                                <StackLayout marginTop="10" row="2" col="0" width="70%">
                                    <Label textAlignment="center" text="Permanece en casa por 14 días (después del úlitmo contacto) AÚN SI NO PRESENTAS SÍNTOMAS, esto para evitar la propagación del virus.  " textWrap="true" />
                                    <Label marginTop="10" textAlignment="center" text="Lleva un registro de las personas con las que tengas contacto de manera cotidiana y contacta de manera inmediata a la DGE a través de la Unidad de Inteligencia Epidemiológica y Sanitaria (UIES) marcando al 800 00 44800." textWrap="true" />
                                    
                                </StackLayout>
                            </GridLayout>
                        </StackLayout>

                        <!-- infografia 2 -->
                        <StackLayout v-if="count == 2" row="0" col="0">
                            <GridLayout rows="100, *, *" columns="*">
                                <StackLayout marginTop="10" row="0" col="0">
                                    <Label textAlignment="center" text="SIGUE LAS MEDIDAS DE PROTECCIÓN" fontSize="25" horizontalAlignment="center" textWrap="true" />
                                </StackLayout>

                                <StackLayout marginTop="10" row="1" col="0" width="80%">
                                    <Image src="~/assets/images/info-2.png" stretch="aspectFit" />
                                </StackLayout>

                                <StackLayout marginTop="10" row="2" col="0" width="70%">
                                    <Label textAlignment="center" text="Sigue las medidas de protección recomendadas para todas las personas (lavarse las manos con agua y jabón o usando un desinfectante a base de alcohol; evita tocarte los ojos, la nariz y la boca; cubre tu boca con un pañuelo al estornudar y toser)." textWrap="true" />                                    
                                </StackLayout>
                            </GridLayout>
                        </StackLayout>

                        <!-- infografia 3 -->
                        <StackLayout v-if="count == 3" row="0" col="0">
                            <GridLayout rows="100, *, *" columns="*">
                                <StackLayout marginTop="10" row="0" col="0">
                                    <Label textAlignment="center" text="LAVA TUS MANOS" fontSize="25" horizontalAlignment="center" textWrap="true" />
                                </StackLayout>

                                <StackLayout marginTop="10" row="1" col="0" width="80%">
                                    <Image src="~/assets/images/info-3.png" stretch="aspectFit" />
                                </StackLayout>

                                <StackLayout marginTop="10" row="2" col="0" width="70%">
                                    <Label textAlignment="center" text="Cuando te laves las manos, usa jabón y agua y sécalas con toallas de papel desechables; si no están disponibles, usa toallas de tela exclusivas para ti y remplazalas cuando estén húmedas." textWrap="true" />                                    
                                </StackLayout>
                            </GridLayout>
                        </StackLayout>

                        <!-- infografia 4 -->
                        <StackLayout v-if="count == 4" row="0" col="0">
                            <GridLayout rows="100, *, *" columns="*">
                                <StackLayout marginTop="10" row="0" col="0">
                                    <Label textAlignment="center" text="DESINFECTA SUPERFICIES" fontSize="25" horizontalAlignment="center" textWrap="true" />
                                </StackLayout>

                                <StackLayout marginTop="10" row="1" col="0" width="80%">
                                    <Image src="~/assets/images/info-4.png" stretch="aspectFit" />
                                </StackLayout>

                                <StackLayout marginTop="10" row="2" col="0" width="70%">
                                    <Label textAlignment="center" text="Se deben limpiar y desinfectar una vez al día las superficies tocadas con frecuencia, como mesas de noche, cabecera de la cama, y otros muebles del dormitorio; así como las superficies del baño y el inodoro. Hay que hacerlo con una solución de cloro diluido (1 parte de cloro doméstico o comercial por 99 partes de agua)." textWrap="true" />                                    
                                </StackLayout>
                            </GridLayout>
                        </StackLayout>

                        <!-- infografia 5 -->
                        <StackLayout v-if="count == 5" row="0" col="0">
                            <GridLayout rows="100, *, *" columns="*">
                                <StackLayout marginTop="10" row="0" col="0">
                                    <Label textAlignment="center" text="UTILIZA CUBREBOCAS" fontSize="25" horizontalAlignment="center" textWrap="true" />
                                </StackLayout>

                                <StackLayout marginTop="10" row="1" col="0" width="80%">
                                    <Image src="~/assets/images/info-5.png" stretch="aspectFit" />
                                </StackLayout>

                                <StackLayout marginTop="10" row="2" col="0" width="70%">
                                    <Label textAlignment="center" text="Si comienzas a sentirte mal, aún si solo es un dolor de cabeza, fiebre ligera o rinorrea leve, quédate en casa hasta que te recuperes. Si tienes que salir o recibir visitas, utiliza cubrebocas para evitar contagiar a otras personas y ajústalo  al tamaño de tu cara. Si el cubrebocas se humedece o ensucia con secreciones, es importante cambiarlo inmediatamente.  " textWrap="true" />                                    
                                </StackLayout>
                            </GridLayout>
                        </StackLayout>

                        <!-- infografia 6 -->
                        <StackLayout v-if="count == 6" row="0" col="0">
                            <GridLayout rows="100, *, *" columns="*">
                                <StackLayout marginTop="10" row="0" col="0">
                                    <Label textAlignment="center" text="BUSCA VALORACIÓN MÉDICA" fontSize="25" horizontalAlignment="center" textWrap="true" />
                                </StackLayout>

                                <StackLayout marginTop="10" row="1" col="0" width="80%">
                                    <Image src="~/assets/images/info-6.png" stretch="aspectFit" />
                                </StackLayout>

                                <StackLayout marginTop="10" row="2" col="0" width="70%">
                                    <Label textAlignment="center" text="Si tienes fiebre, tos y dificultad para respirar, busca rápidamente una valoraición médica. Es posible que tengas una infeccón respiratoria que podría agravarse. Llama con antelación a tu dispensador de atención de salud para que te diriga al lugar adecuado." textWrap="true" />                                    
                                </StackLayout>
                            </GridLayout>
                        </StackLayout>

                        <!-- controles -->
                        <FlexboxLayout row="1" col="0" justifyContent="center" alignItems="center">
                            <Label v-show="count != 1" fontSize="20" marginRight="10" class="font-awesome" text="" textWrap="true" @tap="count--" />
                            <Label v-show="count != 6" fontSize="20" marginLeft="10" class="font-awesome" text="" textWrap="true" @tap="count++" />
                        </FlexboxLayout>
                    </GridLayout>
                    
                </StackLayout>
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
    name: 'Info',

    data(){
        return{
            count: 1,
        }
    },

    computed: {
        ...mapState([
                'user'
            ]),
    },

    methods: {
        changeCount(args){
            if(args.direction == 2 && this.count < 6){
                
                this.count++ 

            }else if(args.direction == 1 && this.count > 1){
                this.count--
            }
            console.log(args.direction)
        }
    }
}
</script>

<style>
    Label{
        color: black;
    }
</style>