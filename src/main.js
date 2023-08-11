import { createApp } from 'vue'
import { createStore } from 'vuex'
import './style.css'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faClipboardList, faClock } from '@fortawesome/free-solid-svg-icons'


/* add icons to the library */
library.add(faUserSecret, faClipboardList, faClock)

// Create a new store instance.
const store = createStore({
  state () {
    return {
      step: 1,
      userData: {
        nombre: "",
      segundo_nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      fecha_de_nacimiento_dia: "",
      fecha_de_nacimiento_mes: "",
      fecha_de_nacimiento_año: "",
      email: "",
      telefono: ""
      }
    }
  },
  mutations: {
    nextStep (state) {
      state.step++
    },
    setUserData(state, payload) {
      state.userData = {...state.userData, ...payload}
    },
  }
})

const app = createApp(App)

app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
