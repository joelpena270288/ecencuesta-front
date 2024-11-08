
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
	   <q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona la Encuesta *"
        v-model="selectedEncuesta"
        :options="encuestas"
		
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"

        emit-value
        map-options
      
      />

</q-card-section>
 <q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona El Kpi *"
        v-model="selectedKpi"
        :options="kpis"
		
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"

        emit-value
        map-options
      
      />

</q-card-section>
	 
	  <q-card-section class="horizontal">
	 <q-btn flat color="positive" label="Buscar" icon = 'search' @click="generarReporte()"  />
    </q-card-section>
  
  </q-card>
  
  </div>
   </q-expansion-item>
  </q-list>
 <div class="q-pa-md flat bordered">
     <Bar :data="chartData" :options="chartOptions" ref="bar" />
	 </div>
	 
	 <div class="q-pa-md flat bordered">
    <q-table
      flat bordered
      title="Resultados"
      :rows="resultado"
      :columns="columns"
      color="primary"
      row-key="name"
	  :filter="filter"
    >
     

      <template v-slot:body="props">
        <q-tr :props="props">
		 <q-td key="grupo" :props="props">

              {{ props.row.grupo}}

          </q-td>
         <q-td key="nombre" :props="props">

              {{ props.row.nombre}}

          </q-td>
            <q-td key="apellido" :props="props">

              {{ props.row.apellido }}

          </q-td>
		   <q-td key="resultadoKpi" :props="props">

              {{ props.row.resultadoKpi }}

          </q-td>
		  
		   <q-td key="cantidadVentas" :props="props">

              {{ props.row.cantidadVentas }}

          </q-td>
		   <q-td key="resultadoVentas" :props="props">

              {{  props.row.resultadoVentas }}

          </q-td>
		    <q-td key="cantidadDescuento" :props="props">

              {{ props.row.cantidadDescuento }}

          </q-td>
		  <q-td key="resultadoDescuento" :props="props">

              {{ props.row.resultadoDescuento }}

          </q-td>
		
		  
		   <q-td key="cantidadEncuesta" :props="props">

              {{  props.row.cantidadEncuesta }}

          </q-td>
		   <q-td key="resultadoEncuesta" :props="props">

              {{  props.row.resultadoEncuesta }}

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
 import { ref } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { Bar } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
export default {
  name: 'DashboardAdministracionPage',
   components: {
    Bar
  },
  data() {
    return {
	fecha_inicio: '',
	fecha_fin: '',
	kpis: [],
	selectedKpi: '',
	encuestas: [],
	selectedEncuesta: '',
	resultado: [],
	grupos: [],
	 dataset:{
  labels: [
    

  ],
  datasets: [
    {
      label: 'Resultados KPI',
      backgroundColor: '#f87979',
      data: []
    }
  ]
},
options: {
  responsive: true,
  maintainAspectRatio: false
}, columns: [
 {
     name: 'grupo',
    align: 'center',
    label: 'Grupo',
    field: row => row.grupo,
    sortable: true
   },

  {
     name: 'nombre',
    align: 'center',
    label: 'Nombre',
    field: row => row.nombre,
    sortable: true
   },
    {
     name: 'apellido',
    align: 'center',
    label: 'Apellidos',
    field: row => row.apellido,
    sortable: true
   },
    {
    name: 'resultadoKpi',
     align: 'center',
    label: 'Resultado General',
    field: row => row.resultadoKpi,
    sortable: true
   },
  {
    name: 'cantidadVentas',
     align: 'center',
    label: 'Ventas',
    field: row => row.cantidadVentas,
    sortable: true
   },
    {
    name: 'resultadoVentas',
     align: 'center',
    label: 'Puntos por Ventas',
    field: row =>row.resultadoVentas,
    sortable: true
   },
   
    {
    name: 'cantidadDescuento',
     align: 'center',
    label: 'Descuentos',
    field: row =>row.cantidadDescuento,
    sortable: true
   },
    {
    name: 'resultadoDescuento',
     align: 'center',
    label: 'Puntos por Descuento',
    field: row => row.resultadoDescuento,
    sortable: true
   },  
   {
    name: 'cantidadEncuesta',
     align: 'center',
    label: 'Encuestas',
    field: row =>row.cantidadEncuesta,
    sortable: true
   },
  
    {
    name: 'resultadoEncuesta',
     align: 'center',
    label: 'Puntos por Encuesta',
    field: row =>row.resultadoEncuesta,
    sortable: true
   }
    

],

	}
	},
	methods: {
	 async loadencuesta() {
   await api.get('/encuesta/',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
        this.encuestas = response.data
      })
      .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',
		 
        message: error.response.data.message
      }));

  },
   async loadKpi() {
   await api.get('/kpi/',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
        this.kpis = response.data
      })
      .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

  },
 async generarReporte(){

 if(this.fecha_inicio!==''& this.fecha_fin!==''& this.selectedKpi!=='' & this.selectedEncuesta!==''){
 const value = {
 idEncuesta: this.selectedEncuesta,
 idKpi: this.selectedKpi,
 filtroFecha: {
 start: this.fecha_inicio,
 end: this.fecha_fin
 
 }
 };
await api.post('/competencia/',value,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
   
    this.resultado = response.data.vendedores,
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
 const dataResultData = [];

 const listadoPorgrupos = [];
 const datasetResult = [];
 const listadoColor = [];
 const listadoKpi = [];
 this.grupos.forEach((element)=>{
  listadoPorgrupos.push({grupo: element.name, color: element.color, data: [],resultdata:[]});

  
 
 });
 this.resultado.forEach((element)=>{ 
 
   listadoColor.push(element.color);
   listadoKpi.push(element.resultadoKpi);
    dataResult.push(element.nombre + ' ' + element.apellido + ' ('+element.grupo+')' );
  
 });
 
 // listadoPorgrupos.forEach((element)=>{
   // 
// datasetResult.push({label: 'KPI de: ' + element.grupo, backgroundColor: element.color,
 //   data: element.resultdata
 // }
 
 //)
 
// });



   this.dataset={
  labels: dataResult,
  datasets:[{
  label: "Resultado KPI",
  backgroundColor: listadoColor,
    data: listadoKpi
 
  
  }]
}
  
  }
	
	}, 
	
	mounted(){
    this.loadKpi(),
	this.loadencuesta(),
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