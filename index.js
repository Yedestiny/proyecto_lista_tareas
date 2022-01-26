var Lista_tareas = {
    data() {
        return {
            nueva_tarea: '',
            listado_tareas: [],
            prioridad: 'Media'
        }
    },
    mounted() {
        if (localStorage.listado_tareas) {
            this.listado_tareas = JSON.parse(localStorage.listado_tareas)
        }
    },
    methods: {
        añadir() {
            this.listado_tareas.push({
                tarea: this.nueva_tarea,
                prioridad: this.prioridad
            })
            this.actualizar_local_storage()
        },
        borra(index) {
            this.listado_tareas.splice(index, 1)
            this.actualizar_local_storage()
        },

        actualizar_local_storage() {
            localStorage.listado_tareas = JSON.stringify(this.listado_tareas)

        }

    },

}


window.onload = function() {
    Vue.createApp(Lista_tareas).mount('#app_tareas')

};