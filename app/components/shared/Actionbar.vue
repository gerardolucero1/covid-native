<template>
    <ActionBar>
        <GridLayout width="100%" columns="auto, *">
            <Label text="" class="font-awesome" fontSize="20" @tap="$emit('sideDrawer')" col="0"/>
        </GridLayout>
    </ActionBar>
</template>

<script>
export default {
    name: 'ActionBar',

    data(){
        return{

        }
    },

    methods: {
        
    }
}
</script>

<style>

</style>