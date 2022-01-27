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
            this.ordenar()
        }
    },
    methods: {
        añadir() {
            this.listado_tareas.push({
                tarea: this.nueva_tarea,
                completada: false,
                prioridad: this.determinar_prioridad(),
                fecha_creacion: new Date()
            })
            this.ordenar()
            this.actualizar_local_storage()
        },
        borra(index) {
            this.listado_tareas.splice(index, 1)
            this.ordenar()
            this.actualizar_local_storage()
        },
        determinar_prioridad() {
            if (this.prioridad == "Alta") {
                return 3
            } else if (this.prioridad == "Media") {
                return 2
            } else {
                return 1
            }

        },
        poner_prio_alta(index) {
            this.listado_tareas[index].prioridad = 3;
            this.ordenar()
            this.actualizar_local_storage()

        },
        poner_prio_media(index) {
            this.listado_tareas[index].prioridad = 2;
            this.ordenar()
            this.actualizar_local_storage()

        },
        poner_prio_baja(index) {
            this.listado_tareas[index].prioridad = 1;
            this.ordenar()
            this.actualizar_local_storage()

        },
        fechaActual(fecha) {
            fecha_tarea = new Date(fecha);
            fechaActual_ahora = new Date().getTime() - fecha_tarea.getTime()
            return Math.round(fechaActual_ahora / 60000)

        },
        ver_estado(estado) {
            if (estado) {
                return "Completada"
            } else {
                return "No completada"
            }
        },
        devolver_tareas_completadas() {
            return this.listado_tareas.filter(listado_tareas => listado_tareas.completada == true).length;
        },
        cambiar_completada(index) {
            this.listado_tareas[index].completada = !this.listado_tareas[index].completada
            this.actualizar_local_storage()
        },

        actualizar_local_storage() {
            localStorage.listado_tareas = JSON.stringify(this.listado_tareas)

        },
        ordenar() {
            this.listado_tareas.sort((a, b) => { return b.prioridad - a.prioridad });
        },
        borrarCompletadas() {
            this.listado_tareas = this.listado_tareas.filter(tarea => tarea.completada == false)
            this.actualizar_local_storage()
        },

    },

}


window.onload = function() {
    Vue.createApp(Lista_tareas).mount('#app_tareas')


};