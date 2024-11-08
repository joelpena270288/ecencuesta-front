
<template>
 <q-page

class="q-pa-md"
>
<q-list bordered>
      <q-expansion-item
        group="somegroup"
        icon="filter_alt"
        label="Filtros"
        default-opened
        header-class="text-primary"
      >

<div class="q-pa-md flat bordered">
    <q-card class="my-card">
      <q-card-section  class="horizontal">
        <q-input v-model="fecha_inicio" filled type="date"  label="Fecha Inicio" />
      </q-card-section>
        <q-card-section  class="horizontal">
        <q-input v-model="fecha_fin" filled type="date"  label="Fecha Fin" />
      </q-card-section>	

	  <q-card-section  class="horizontal">
        <q-btn flat color="positive" label="Buscar" icon = 'search' @click="generarReporte()"  />
      </q-card-section>
	  <q-separator/>
	
  
  </q-card>
  </div>
   </q-expansion-item>
  </q-list>
  <div class="q-pa-md flat bordered">
     <Doughnut :data="datasetventa" :options="options" />
</div>	

 
   <div  class="q-pa-md flat bordered">
    <q-table
      flat bordered
      title="Ventas"
      :rows="resultado"
      :columns="columns"
      color="primary"
      row-key="name"
	  :filter="filter"
    >
     

      <template v-slot:body="props">
        <q-tr :props="props">
		 <q-td key="fecha" :props="props">

              {{ FormatoFecha(props.row.fecha)}}

          </q-td>
         <q-td key="chasis" :props="props">

              {{ props.row.vehiculo.chasis}}

          </q-td>
            <q-td key="marca" :props="props">

              {{ props.row.vehiculo.marca }}

          </q-td>
		   <q-td key="modelo" :props="props">

              {{ props.row.vehiculo.modelo }}

          </q-td>
		  
		   <q-td key="color" :props="props">

              {{ props.row.vehiculo.color }}

          </q-td>
		   <q-td key="name" :props="props">

              {{  props.row.vendedor.name }}

          </q-td>
		    <q-td key="apellido" :props="props">

              {{ props.row.vendedor.lastname }}

          </q-td>
		  <q-td key="grupo" :props="props">

              {{ props.row.vendedor.grupo.name }}

          </q-td>
		
		  
		
		  
		 
		 
        </q-tr>
      </template>
	   <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>

  </div>

  </q-page>
</template>




<script lang="ts">
import { api } from 'boot/axios';
import { Notify } from 'quasar';
import JWT from 'jwt-client';
import authenticate from "../logic/authenticate";
import moment from 'moment';
 import { ref } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'
import { Doughnut, Bar } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ArcElement)
export default {
  name: 'ReporteVentasPage',
   components: {
   
	Doughnut
  },
  data() {
    return {
	fecha_inicio: '',
	fecha_fin: '',
	
	resultado: [],
	
 
datasetventa:{
  labels: [
   
    

  ],
  datasets: [
    {
     
      backgroundColor: [],
      data: []
    }
  ]
},
options: {
  responsive: true,
  maintainAspectRatio: false
},
columns: [
{
     name: 'fecha',
    align: 'center',
    label: 'Fecha',
    field: row => row.fecha,
    sortable: true
   },
 {
     name: 'chasis',
    align: 'center',
    label: 'Chasis',
    field: row => row.vehiculo.chasis,
    sortable: true
   },
   {
     name: 'marca',
    align: 'center',
    label: 'Marca',
    field: row => row.vehiculo.marca,
    sortable: true
   },
   {
     name: 'modelo',
    align: 'center',
    label: 'Modelo',
    field: row => row.vehiculo.modelo,
    sortable: true
   },
    {
     name: 'color',
    align: 'center',
    label: 'Color',
    field: row => row.vehiculo.color,
    sortable: true
   },

  {
     name: 'name',
    align: 'center',
    label: 'Nombre',
    field: row => row.vendedor.name,
    sortable: true
   },
    {
     name: 'apellido',
    align: 'center',
    label: 'Apellidos',
    field: row => row.vendedor.lastname,
    sortable: true
   },
    {
     name: 'grupo',
    align: 'center',
    label: 'Grupo',
    field: row => row.vendedor.grupo.name,
    sortable: true
   },
  
  

],
grupos: [] 

	}
	},
	methods: {
	
   FormatoFecha(fecha){
  return moment(String(fecha)).utc().format('MM/DD/YYYY')

 },
 async generarReporte(){

 if(this.fecha_inicio!==''& this.fecha_fin!==''){
 const value = { 
 start: this.fecha_inicio,
 end: this.fecha_fin
 
 
 };
await api.post('/report-ventas/',value,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
   
    this.resultado = response.data,
    this.llenarGrafico()	
      }	  
	  )

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',
		 
        message: 'Error al generar el Reporte'
      }));
	  
	  


 
 }
 else{
 
 this.$q.notify({
        type: 'negative',
		 position: 'top',

        message:"Debe seleccionar todos los campos"
      })
 }
 
  
  },
    async loadGrupo() {
   await api.get('/grupo/',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
        this.grupos = response.data
      })
      .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

  },

 
  llenarGrafico(){
  const dataResult = [];
  const listadoColor = [];
  const valoresResultado = [];
  
  
  this.grupos.forEach((element)=>{
  
   listadoColor.push(element.color);
   
   let cont = this.resultado.filter(x=>
   x.vendedor.grupo.name === element.name
   
   ).length;

    valoresResultado.push(cont);
   dataResult.push(element.name + '('+ cont+')' );
  
  });



   this.datasetventa={
  labels: dataResult,
  
  datasets:[{

  backgroundColor: listadoColor,
    data: valoresResultado
 
  
  }]
}
  
  }
	
	}, 
	
	mounted(){
   
	this.loadGrupo()
   

   },
	 computed: {
      chartData() { return this.dataset },
      chartOptions() { return this.options },
	  
    },
	 setup () {
    return {
   
	  filter: ref('')



    }


  }

 
}

</script>
<style lang="sass">

</style>