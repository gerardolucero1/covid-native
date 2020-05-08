<style scoped>
    Label{
        color: black;
    }
    
    .drawer-body{
        background: rgb(255,255,255);
        background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 33%, rgba(250,250,250,1) 100%);
    }

    .drawer-layer{
        background-image: url('https://img.wallpapersafari.com/desktop/1280/1024/14/66/raICAv.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }

    .drawer-header {
        width: 100%;
        height: 20%;
    }

    .drawer-item-container{
        width: 100%;
        padding-left: 100px;
    }

    .drawer-item {
        color: #333333;
        font-size: 16;
        margin-left: 40px;
    }

    .line{
        width: 80%;
        border-width: 1 0 0 0;
        border-color: #1D5A7B;
    }
</style>

<template>
    <GridLayout class="drawer-body" ~drawerContent rows="*, 60">
        <StackLayout row="0">
            <FlexboxLayout v-if="android" height="200" justifyContent="center" alignItems="center" flexDirection="column">
                <Image width="50" marginBottom="10" src="http://partnergrammer.com/img/logoHeaderBlack.png" />

                <Label color="black" :text="user.name" fontWeight="bold" fontSize="5" />
                <Label color="#5FA5C4" :text="user.email" fontWeight="bold" fontSize="5" />
            </FlexboxLayout>

            <FlexboxLayout v-else height="100" justifyContent="center" alignItems="center" flexDirection="column">
                <Label color="black" :text="user.name" fontWeight="bold" fontSize="18" />
                <Label color="#5FA5C4" :text="user.email" fontWeight="bold" fontSize="16" />
            </FlexboxLayout>

            <FlexboxLayout class="drawer-item-container" justifyContent="flex-start" alignItems="center" @tap="goToHome">
                <Label text="" textWrap="true" fontSize="18" color="black" class="font-awesome" />
                <Label color="black" fontSize="13" class="drawer-item" text="Inicio" />
            </FlexboxLayout>

            <!-- <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center">
                <Label text="" textWrap="true" fontSize="18" color="black" class="font-awesome" />
                <Label color="black" fontSize="13" class="drawer-item" text="Global" />
            </FlexboxLayout> -->

            <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center" @tap="goToRecomendations">
                <Label text="" textWrap="true" fontSize="18" color="black" class="font-awesome" />
                <Label color="black" fontSize="13" class="drawer-item" text="Información" />
            </FlexboxLayout>

            <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center" @tap="goToNews">
                <Label text="" textWrap="true" fontSize="18" color="black" class="font-awesome" />
                <Label color="black" fontSize="13" class="drawer-item" text="Noticias" />
            </FlexboxLayout>

            <StackLayout class="line" marginTop="20" />

            <!-- <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center" @tap="logout">
                <Label text="" textWrap="true" fontSize="18" color="black" class="font-awesome" />
                <Label color="black" fontSize="13" class="drawer-item" text="Añadir Ubicacion"/>
            </FlexboxLayout> -->

            <FlexboxLayout v-if="user.userType == 'admin' || user.userType == 'webmaster'" class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center" @tap="goToDashboard">
                <Label text="" textWrap="true" fontSize="18" color="black" class="font-awesome" />
                <Label color="black" fontSize="13" class="drawer-item" text="Estado"/>
            </FlexboxLayout>

            <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center" @tap="goToQR">
                <Label text="" textWrap="true" fontSize="18" color="black" class="font-awesome" />
                <Label color="black" fontSize="13" class="drawer-item" text="Compartir ID"/>
            </FlexboxLayout>

            <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center" @tap="logout">
                <Label text="" textWrap="true" fontSize="18" color="black" class="font-awesome" />
                <Label color="black" fontSize="13" class="drawer-item" text="Salir"/>
            </FlexboxLayout>

            <!-- <StackLayout class="line" marginTop="20" />

            <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="center" alignItems="center">
                <Label color="black" fontSize="13" text="Si presentas sintomas o requieres ayuda, marca el siguiente numero:" textWrap="true"/>
            </FlexboxLayout>

            <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center" @tap="goToPhone">
                <Label text="" textWrap="true" fontSize="18" color="black" class="font-awesome" />
                <Label color="black" fontSize="13" class="drawer-item" text="200-48-10"/>
            </FlexboxLayout> -->
        </StackLayout>

        <FlexboxLayout row="1" justifyContent="center" alignItems="center" flexDirection="column">
            <Label color="#43809D" fontSize="20" fontWeight="bold" text="PrevenApp" />
            <Label class="font-awesome" color="#43809D" fontSize="9" text="Crafted with  by PartnerGrammer" />
        </FlexboxLayout>
    </GridLayout>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Vuex
import { mapState } from 'vuex'

//Telephone
import * as TNSPhone from 'nativescript-phone'

//iOS or Android
import { isAndroid, isIOS } from "tns-core-modules/ui/page";

//Pages
import Login from '../pages/user/Login'
import QR from '../pages/user/QR'
import Home from '../pages/Home'
import Index from '../pages/Index'
import Recomendations from '../pages/Recomendations'
import Global from '../pages/Global'
import Dashboard from '../pages/user/Dashboard'
import News from '../pages/News'

export default {
    name: 'Navbar',

    data() {
        return {
            android: true,
        }
    },

    created(){
        if(isAndroid){
            this.android = true
        }else{
            this.android = false
        }
    },

    computed:{
        ...mapState([
                'user'
            ]),
    },

    methods:{
        logout(){
            firebase.logout()

            this.$navigateTo(Login, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        goToDashboard(){
            this.$navigateTo(Dashboard, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        goToQR(){
            this.$navigateTo(QR, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        goToGlobal(){
            this.$navigateTo(Global, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        goToRecomendations(){
            this.$navigateTo(Recomendations, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        goToHome(){
            this.$navigateTo(Index, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        goToNews(){
            this.$navigateTo(News, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        goToPhone(){
            console.log('Hola Mundo')
            const phoneNumber = '614-200-48-10'

            TNSPhone.requestCallPermission('You should accept the permission to be able to make a direct phone call.')
                .then(() => TNSPhone.dial(phoneNumber, false))
                .catch(() => TNSPhone.dial(phoneNumber, true))
        },
    }
}
</script>














