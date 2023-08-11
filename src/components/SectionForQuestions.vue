
<script setup>
import Box from './core/Box.vue'
import Text from './core/Text.vue'
import Title from './core/Title.vue'
import Button from './core/Button.vue'
import Question from './Question.vue'
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import userService from '../services/userService'

const store = useStore()
const steps = computed(() => store.state.step)
const userData = computed(() => store.state.userData)
const step = ref(1)
const showFullData = ref(false)

/*
const userData = reactive({
    nombre: "",
    segundo_nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_de_nacimiento_dia: "",
    fecha_de_nacimiento_mes: "",
    fecha_de_nacimiento_año: "",
    email: "",
    telefono: ""
})
*/


const labels_list = ref(
    [
        {
            step: 1,
            title: "¿Cual es tu nombre?",
            condition: (data) => data >= 2,
            data: (data) => data.nombre + " " + data.segundo_nombre, 
            labels: [
                       {value: "Nombre", handler: (e) => store.commit('setUserData', { nombre: e.target.value }) },
                        {value: "Segundo Nombre", handler: (e) => store.commit('setUserData', { segundo_nombre: e.target.value }) },
                        {value: "Apellido Paterno", handler: (e) => store.commit('setUserData', { apellido_paterno: e.target.value }) },
                        {value: "Apellido Materno", handler: (e) => store.commit('setUserData', { apellido_materno: e.target.value }) },
                  ]
        },
         {
             step:2,
             condition: (data) => data >= 3,
             title: "¿Cual es tu fecha de nacimiento?",
              data: (data) => `${data.fecha_de_nacimiento_dia} ${data.fecha_de_nacimiento_mes} ${data.fecha_de_nacimiento_año}`,
            labels: [
                {value: "Dia", handler: (e) => store.commit('setUserData', { fecha_de_nacimiento_dia: e.target.value }) },
                {value: "Mes", handler: (e) => store.commit('setUserData', { fecha_de_nacimiento_mes: e.target.value }) },
                {value: "Año", handler: (e) => store.commit('setUserData', { fecha_de_nacimiento_año: e.target.value }) },
            ]
        },
         {
             step: 3,
             condition: (data) => data >= 4,
              data: data => `Correo electronico: ${data.email}, Telefono Celular: ${data.telefono}`,
            title: "Datos de contacto",
            labels: [
                {value: "Correo electronico",  handler: e => store.commit('setUserData', { email: e.target.value }) },
                {value: "Telefono Celular", handler: e => store.commit('setUserData', { telefono: e.target.value }) }
            ]
        },
    ]
)


const handleClick = function () {
    step.value = step.value + 1;
    store.commit('nextStep')
}

const iniciar = async () => {

    const replacer = (key, value) => {
        if (typeof value === 'object' && value !== null) {
        // Check if the value is a proxy object
            if (Object.getPrototypeOf(value) === Object.prototype) {
        // Convert the proxy object to a regular object
        return { ...value };
            }
        }
        return value;
    };

    const body = {
    nombre: userData.nombre,
    segundo_nombre: userData.segundo_nombre,
    apellido_paterno: userData.apellido_paterno,
    apellido_materno: userData.apellido_materno,
    fecha_de_nacimiento:  `${userData.fecha_de_nacimiento_dia}-${userData.fecha_de_nacimiento_mes}-${userData.fecha_de_nacimiento_año}`,
    email: userData.email,
    telefono: userData.telefono
}

    const jsonString = JSON.stringify(body);
    const data = await userService.post(jsonString);
    showFullData.value = true;
}

</script>

<template>
    <Box col customClass="p-4 justify-center items-center bg-gray-100 w-4/12" >
        <Box  customClass="bg-pink-400 p-2 w-full justify-between">
           <Box col customClass="gap-4">
                <Title>Titulo del Formulario</Title>
               
                <Text class="flex items-center gap-2"><font-awesome-icon :icon="['fas', 'clock']" /> En menos de 5 minutos</Text>
           </Box>
            <Box>
                  <Text class="text-6xl text-white">
                   <font-awesome-icon :icon="['fas', 'clipboard-list']" /> 
                  </Text>
           </Box>
        </Box>
        <Box col customClass=" p-2">
            <Box col customClass="items-end">
                <template v-for="item in labels_list">
                  <template v-if="step >= item.step">
                     <Question :title="item.title" :labels="item.labels" :show="step === item.step" :step="item.step" >
                        <Box v-if="item.condition(step)" class="bg-pink-400 p-2 w-10/12 my-10">{{ item.data(userData) }}</Box>
                     </Question>
                  </template>
                  
                </template> 
            </Box>
             <template v-if="step >= 4">
                <Box customClass="bg-gray-200 p-2 my-2 w-8/12 justify-end">
                    <Text>Si tus datos son correctos por favor continuemos</Text>
                </Box>
                <Button @click="iniciar">Iniciar</Button>
                <Box v-if="showFullData" col customClass="bg-gray-200 p-2 my-2 gap-2">
                    <Text>Fecha de nacimiento: {{ userData.fecha_de_nacimiento_dia }} {{ userData.fecha_de_nacimiento_mes }} {{ userData.fecha_de_nacimiento_año }}</Text>
                    <Text>Correo Electronico: {{ userData.email }} </Text>
                    <Text>Telefono celular: {{ userData.telefono }} </Text>
                    <Text>Nombre: {{ userData.nombre }} {{ userData.segundo_nombre }} </Text>
                </Box>
             </template>
            <Box customClass="mt-4">
                <Button @onClick="handleClick" :disable="step >= 4">Siguiente</Button>
            </Box>
            
        </Box>
    </Box>
</template>