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
                            <Label :text="'Hola, ' + user.name" fontSize="25" fontWeight="lighter" textWrap="true" horizontalAlignment="left" />
                            <FlexboxLayout marginTop="10">
                                <Label text="" class="font-awesome" textWrap="true" />
                                <Label text="Juan Leautaud 14710, Chihuahua 2000, Chihuahua" marginLeft="10" fontSize="12" textWrap="true" />
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
                                        <Label text="MEXICO" fontSize="18" color="white" textWrap="true" />
                                        <Label text="82" fontSize="16" color="white" fontWeight="bold" textWrap="true" />
                                    </FlexboxLayout>

                                    <FlexboxLayout row="0" col="1" flexDirection="column" justifyContent="center" alignItems="center">
                                        <Label text="CHIHUAHUA" fontSize="18" color="white" textWrap="true" />
                                        <Label text="6" fontSize="16" color="white" fontWeight="bold" textWrap="true" />
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>

                            <StackLayout width="100%" backgroundColor="orange" borderRadius="15" marginTop="20">
                                <Label text="Casos Sospechosos" fontSize="18" horizontalAlignment="center" textWrap="true" color="white" marginTop="10" />
                                
                                <GridLayout columns="*, *" rows="100">
                                    <FlexboxLayout row="0" col="0" flexDirection="column" justifyContent="center" alignItems="center">
                                        <Label text="MEXICO" fontSize="18" color="white" textWrap="true" />
                                        <Label text="82" fontSize="16" color="white" fontWeight="bold" textWrap="true" />
                                    </FlexboxLayout>

                                    <FlexboxLayout row="0" col="1" flexDirection="column" justifyContent="center" alignItems="center">
                                        <Label text="CHIHUAHUA" fontSize="18" color="white" textWrap="true" />
                                        <Label text="6" fontSize="16" color="white" fontWeight="bold" textWrap="true" />
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>

                            <StackLayout width="100%" backgroundColor="green" borderRadius="15" marginTop="20">
                                <Label text="Casos Negativos" fontSize="18" horizontalAlignment="center" textWrap="true" color="white" marginTop="10" />
                                
                                <GridLayout columns="*, *" rows="100">
                                    <FlexboxLayout row="0" col="0" flexDirection="column" justifyContent="center" alignItems="center">
                                        <Label text="MEXICO" fontSize="18" color="white" textWrap="true" />
                                        <Label text="82" fontSize="16" color="white" fontWeight="bold" textWrap="true" />
                                    </FlexboxLayout>

                                    <FlexboxLayout row="0" col="1" flexDirection="column" justifyContent="center" alignItems="center">
                                        <Label text="CHIHUAHUA" fontSize="18" color="white" textWrap="true" />
                                        <Label text="6" fontSize="16" color="white" fontWeight="bold" textWrap="true" />
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>
                        </StackLayout>

                        <!-- <GridLayout columns="*, *" rows="*, *, *" marginTop="20">
                            <FlexboxLayout row="0" col="0" flexDirection="column" justifyContent="center" alignItems="center">
                                <StackLayout backgroundColor="white" width="90%" padding="15 50" borderRadius="15" borderWidth="1" borderColor="#FFFFF">
                                    <Label horizontalAlignment="center" text="Mexico" fontSize="18" color="#FFFFF" fontWeight="bold" />
                                    <Label horizontalAlignment="center" text="82" fontSize="16" color="#FFFFF" />
                                </StackLayout>
                            </FlexboxLayout>
                            <FlexboxLayout row="0" col="1" flexDirection="column" justifyContent="center" alignItems="center">
                                <StackLayout backgroundColor="white" width="90%" padding="15 50" borderRadius="15" borderWidth="1" borderColor="#FFFFF">
                                    <Label horizontalAlignment="center" text="Mexico" fontSize="18" color="#FFFFF" fontWeight="bold" />
                                    <Label horizontalAlignment="center" text="7" fontSize="16" color="#FFFFF" />
                                </StackLayout>
                            </FlexboxLayout>
                            <FlexboxLayout row="1" col="0" flexDirection="column" justifyContent="center" alignItems="center">
                                <StackLayout backgroundColor="white" width="90%" padding="15 50" borderRadius="15" borderWidth="1" borderColor="#FFFFF">
                                    <Label horizontalAlignment="center" text="Chihuahua" fontSize="18" color="#FFFFF" fontWeight="bold" />
                                    <Label horizontalAlignment="center" text="6" fontSize="16" color="#FFFFF" />
                                </StackLayout>
                            </FlexboxLayout>
                            <FlexboxLayout row="1" col="1" flexDirection="column" justifyContent="center" alignItems="center">
                                <StackLayout backgroundColor="white" width="90%" padding="15 50" borderRadius="15" borderWidth="1" borderColor="#FFFFF">
                                    <Label horizontalAlignment="center" text="Chihuahua" fontSize="18" color="#FFFFF" fontWeight="bold" />
                                    <Label horizontalAlignment="center" text="2" fontSize="16" color="#FFFFF" />
                                </StackLayout>
                            </FlexboxLayout>
                        </GridLayout> -->
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

//Pages
import Login from './user/Login.vue'

export default {
    name: 'Home',

    data(){
        return{
            cosa: {
                nombre: 'gerardo',
                apellido: 'Lucero'
            }
        }
    },

    munted(){

    },

    computed: {
        ...mapState([
                'user'
            ]),
    },

    methods: {
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