import Vue from 'nativescript-vue'
import Login from './components/pages/user/Login.vue'
import Home from './components/pages/Home.vue'

import store from './store'
import VueDevtools from 'nativescript-vue-devtools'

//Components
import Sidedrawer from './components/shared/Sidedrawer.vue'
import Actionbar from './components/shared/Actionbar.vue'
import DateTimePicker from "nativescript-datetimepicker/vue";

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools, { host: '192.168.0.7' })
}

var firebase = require("nativescript-plugin-firebase")

firebase.init({
    showNotifications: true,
    showNotificationsWhenInForeground: true,

    onPushTokenReceivedCallback: (token) => {
        console.log('[Firebase] onPushTokenReceivedCallback:', { token });
        //store.commit('updateToken', token)
    },

    onMessageReceivedCallback: (message) => {
        console.log('[Firebase] onMessageReceivedCallback:', { message });
    }
}).then(
    function() {
        console.log("firebase.init done")
    },
    function(error) {
        console.log("firebase.init error: " + error)
    }
)


  
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
// Prints Colored logs when --env.production is *NOT* set while building
Vue.config.debug = (TNS_ENV !== 'production')

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)
Vue.component('Sidedrawer', Sidedrawer)
Vue.component('Actionbar', Actionbar)
Vue.use(DateTimePicker)


new Vue({
  store,
  mounted(){
    firebase.getCurrentUser()
          .then(user => {
            console.log('Existe una sesion')

              console.log(JSON.stringify(user))
              
              let userInfo = {
                  uid: user.uid,
                  name: user.displayName,
                  email: user.email,
              }
              this.$store.commit('updateUser', userInfo)

              this.$navigateTo(Home)
            })
          .catch(error => console.log("Trouble in paradise: " + error));
  },
  render: h => h('frame', [h(Login)])
}).$start()
