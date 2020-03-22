import Vue from 'nativescript-vue'
import Login from './components/pages/user/Login.vue'
import Home from './components/pages/Home.vue'
import App from './components/App.vue'

import store from './store'
import VueDevtools from 'nativescript-vue-devtools'

//Components
import Sidedrawer from './components/shared/Sidedrawer.vue'
import Actionbar from './components/shared/Actionbar.vue'
import DateTimePicker from "nativescript-datetimepicker/vue";

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools, { host: '192.168.0.7' })
}

//Local notifications
require ("nativescript-local-notifications");

var firebase = require("nativescript-plugin-firebase")

firebase.init({

    //Push notifications
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
          .then(async (user) => {
            
              let response = await firebase.firestore.collection('users')
                                                      .doc(user.uid)
                                                      .get()

              this.$store.commit('updateUser', response.data())

              this.$navigateTo(Home)
            })
          .catch(error => console.log("Trouble in paradise: " + error));
  },
  render: h => h('frame', [h(Login)])
}).$start()
