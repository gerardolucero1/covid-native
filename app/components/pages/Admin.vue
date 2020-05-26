<template>
    <Page actionBarHidden="true">
        <GridLayout rows="*" columns="*">
            <FlexboxLayout justifyContent="center" alignItems="center">
                <Button text="Dale!!" @tap="getAdmin" />
                <Button text="Update" @tap="getUpdate" />
            </FlexboxLayout>
        </GridLayout>
    </Page>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

export default {
    data(){
        return{
            users: []
        }
    },

    methods: {
        async getAdmin(){
            console.log(1)
            try {
                let response = await firebase.firestore.collection('users')
                                                .get()
                                                .then(query => {
                                                    console.log(2)
                                                    query.forEach(doc => {
                                                        this.users.push(doc.data())
                                                    })
                                                })
                
                if(response){
                    console.log('echo')
                }

            } catch (error) {
                console.log(error)
            }
        },

        getUpdate(){
            try {
                let contador = 0
                this.users.forEach(async document => {
                    let response = await firebase.firestore.collection('users')
                                                            .doc(document.uid)
                                                            .update({ cuestionario: false })
                    contador++
                    console.log(contador)
                })
                console.log('Terminado')
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>

</style>