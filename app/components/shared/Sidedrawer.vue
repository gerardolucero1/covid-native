<style scoped>
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
            <FlexboxLayout height="200" justifyContent="center" alignItems="center" flexDirection="column">
                <Image width="70" borderRadius="100" src="https://www.nunuoropesa.com/wp-content/uploads/2018/03/profile-img-1.jpg" />

                <Label color="black" :text="user.name" fontWeight="bold" fontSize="15" />
                <Label color="#5FA5C4" :text="user.email" fontWeight="bold" fontSize="12" />
            </FlexboxLayout>

            <FlexboxLayout class="drawer-item-container" justifyContent="flex-start" alignItems="center">
                <Label text="" textWrap="true" fontSize="18" color="black" class="font-awesome" />
                <Label color="black" fontSize="13" class="drawer-item" text="Inicio" />
            </FlexboxLayout>

            <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center">
                <Label text="" textWrap="true" fontSize="18" color="black" class="font-awesome" />
                <Label color="black" fontSize="13" class="drawer-item" text="Global" />
            </FlexboxLayout>

            <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center">
                <Label text="" textWrap="true" fontSize="18" color="black" class="font-awesome" />
                <Label color="black" fontSize="13" class="drawer-item" text="Informacion" />
            </FlexboxLayout>

            <StackLayout class="line" marginTop="20" />

            <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center" @tap="logout">
                <Label text="" textWrap="true" fontSize="18" color="black" class="font-awesome" />
                <Label color="black" fontSize="13" class="drawer-item" text="Salir"/>
            </FlexboxLayout>
        </StackLayout>

        <FlexboxLayout row="1" justifyContent="center" alignItems="center">
            <Label color="#43809D" fontSize="20" fontWeight="bold" text="COVID-Native" />
        </FlexboxLayout>
    </GridLayout>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Vuex
import { mapState } from 'vuex'

//Pages
import Login from '../pages/user/Login'

export default {
    name: 'Navbar',

    data() {
        return {
            
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
        }
    }
}
</script>














