
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

  label="Selecciona El Usuario *"
        v-model="selectedUser"
        :options="hosters"
		
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'username' in opt ? opt.username : ''"

        emit-value
        map-options
      
      />

</q-card-section>
	  <q-card-section  class="horizontal">
        <q-btn flat color="positive" label="Buscar" icon = 'search' @click="generarReporte()"  />
      </q-card-section>
	  
	

  
  </q-card>
  </div>
    </q-expansion-item>
  </q-list>
   <div class="q-gutter-sm">
      <q-radio v-model="shape" val="c" label="Completadas" />
      <q-radio v-model="shape" val="p" label="Pendientes"  />
     

    </div>
	 <div class="q-pa-md flat bordered" v-if="shape=='c'">
    <q-table
      flat bordered
      title="Completadas"
      :rows="completadas"
      :columns="columnsCompletadas"
      color="primary"
      row-key="name"
	  :filter="filter"
    >
     

      <template v-slot:body="props">
        <q-tr :props="props"  @click="onRowClickCompleted(props.row)">
		 <q-td key="fecha" :props="props">

              {{ FormatoFecha(props.row.fecha)}}

          </q-td>
		 <q-td key="nombreCliente" :props="props">

              {{ props.row.nombreCliente}}

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
		    <q-td key="lastname" :props="props">

              {{ props.row.vendedor.lastname }}

          </q-td>
		  <q-td key="grupo" :props="props">

              {{ props.row.vendedor.grupo.name }}

          </q-td>
          <q-td key="cuestionarios" :props="props">

              {{ props.row.cuestionarios[0].resultado }}

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
  
   <div class="q-pa-md flat bordered" v-if="shape=='p'">
    <q-table
      flat bordered
      title="Pendientes"
      :rows="pendientes"
      :columns="columnsPendientes"
      color="primary"
      row-key="name"
	  :filter="filter"
    >
     

      <template v-slot:body="props">
        <q-tr :props="props"  @click="onRowClick(props.row)">
		<q-td key="fecha" :props="props">

              {{ FormatoFecha(props.row.fecha)}}

          </q-td>
		 <q-td key="nombreCliente" :props="props">

              {{ props.row.nombreCliente}}

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
		    <q-td key="lastname" :props="props">

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
  
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="priority_high" color="primary" text-color="white" />
          <span class="q-ml-sm">Desea Reasignar La Venta del vehiculo {{chasisSelected}}?.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="No" icon="cancel" type="cancel" color="secondary" flat class="q-ml-sm" v-close-popup />
          <q-btn label="Si" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click="openReasignarMetodo()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
 
  <div class="q-pa-md q-gutter-sm">
  <q-dialog v-model="openReasignar" persistent >

      <q-card class="my-card" flat bordered  style="width: 300px; max-width: 80vw;">
         <q-card-section class="horizontal">
          <div  class="text-h6">Elige un usuario</div>
		  

        </q-card-section>

        <q-separator />
      
   
   <q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona El Usuario *"
        v-model="userIdSelected"
        :options="hosters"
		
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'username' in opt ? opt.username : ''"

        emit-value
        map-options
      
      />

</q-card-section>
  
 <q-separator />
    
<!--Hasta Aqui -->	
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='EditVenta()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click="openReasignar = false" />

	

      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>

<template>
  <div class="q-pa-md q-gutter-sm">
  <q-dialog v-model="resultEncuesta" persistent  full-width>

      <q-card class="my-card " flat bordered>
        <q-card-section>
          <div class="text-h6">Resultado</div>
          
        </q-card-section>
      

  <q-card-section class="horizontal">
 <div class="q-pa-md">
    <q-table
      flat bordered
      title="Preguntas"
      :rows="preguntas"
      :columns="columnsRespuestas"
      color="primary"
      row-key="name"
	   :filter="filter"
    >





      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="enunciado" :props="props">

            {{ props.row.enunciado }}


          </q-td>
        

  


<q-td key="respuestaEsperada" :props="props">

{{ props.row.respuestaEsperada?'SI':'NO' }}


</q-td>
<q-td key="valor" :props="props">

{{ props.row.valor}}


</q-td>
<q-td key="respuesta" :props="props">

        {{ props.row.respuesta?'SI':'NO' }}


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
   
      </q-card-section >
	

      
       

     
            <q-separator />
            <q-card-actions>
   
    <q-btn label="Cerrar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='resultEncuesta=false' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>

  </q-page>
</template>




<script lang="ts">
import { api } from 'boot/axios';
import { Notify } from 'quasar';
import JWT from 'jwt-client';
import authenticate from "../logic/authenticate";
import { ref } from 'vue';
import moment from 'moment';


export default {
  name: 'ReporteEncuestaPage',
  
  data() {
    return {
	preguntas: [] = [],
	resultEncuesta: false,
	ventaIdSelected: '',
	chasisSelected: '',
	userIdSelected: '',
	openReasignar: false,
	confirm: false,
	selectedHoste: '',
	fecha_inicio: '',
	fecha_fin: '',
	hosters: [],
	encuestas: [],
	selectedEncuesta: '',
	selectedUser: '',
	completadas: [],
	pendientes: [],
	  shape: 'c',
	 columnsCompletadas: [
	 {
     name: 'fecha',
    align: 'center',
    label: 'Fecha',
    field: row =>row.fecha,
    sortable: true
   },
 {
     name: 'nombreCliente',
    align: 'lefth',
    label: 'Cliente',
    field: row =>row.nombreCliente,
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
    label: 'Nombre del Vendedor',
    field: row =>row.vendedor.name,
    sortable: true
   },
   
    {
    name: 'lastname',
     align: 'center',
    label: 'Apellidos del Vendedor',
    field: row =>row.vendedor.lastname,
    sortable: true
   },
    {
    name: 'grupo',
     align: 'center',
    label: 'Grupo',
    field: row => row.vendedor.grupo.name,
    sortable: true
   },  
   {
    name: 'cuestionarios',
     align: 'center',
    label: 'Resultado',
    field: row =>row.cuestionarios[0].resultado,
    sortable: true
   },
  
   

],
 columnsPendientes: [
 {
     name: 'fecha',
    align: 'center',
    label: 'Fecha',
    field: row =>row.fecha,
    sortable: true
   },
 {
     name: 'nombreCliente',
    align: 'lefth',
    label: 'Cliente',
    field: row =>row.nombreCliente,
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
    label: 'Nombre del Vendedor',
    field: row =>row.vendedor.name,
    sortable: true
   },
   
    {
    name: 'lastname',
     align: 'center',
    label: 'Apellidos del Vendedor',
    field: row =>row.vendedor.lastname,
    sortable: true
   },
    {
    name: 'grupo',
     align: 'center',
    label: 'Grupo',
    field: row => row.vendedor.grupo.name,
    sortable: true
   }  
  
  
   

],
columnsRespuestas: [
 {
     name: 'enunciado',
    align: 'lefth',
    label: 'Pregunta',
    field: row =>row.enunciado,
    sortable: true
   },
 {
     name: 'respuestaEsperada',
    align: 'center',
    label: 'Respuesta Pregunta',
    field: row =>row.respuestaEsperada,
    sortable: true
   },


  {
     name: 'valor',
    align: 'center',
    label: 'Valor Pregunta',
    field: row => row.valor,
    sortable: true
   },
    {
     name: 'respuesta',
    align: 'center',
    label: 'Respuesta Cliente',
    field: row => row.respuesta,
    sortable: true
   } 
  
   

],
	
	
    }
},
	
methods: {
 FormatoFecha(fecha){
  return moment(String(fecha)).utc().format('MM/DD/YYYY')

 },
	 async loadHoster () {
  await  api.get('/users/hosters',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
        this.hosters = response.data
      })
     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

  },
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
  
  async generarReporte(){

 if(this.fecha_inicio!==''& this.fecha_fin!==''& this.selectedEncuesta!=='' & this.selectedUser!==''){
 const value = {
 idEncuesta: this.selectedEncuesta,
 idUser: this.selectedUser,
 
 start: this.fecha_inicio,
 end: this.fecha_fin
 
 
 };
await api.post('/reporte-encuesta/',value,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
   
    this.completadas = response.data.completadas,
    this.pendientes = response.data.pendientes
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
  onRowClick(row){

  this.ventaIdSelected = row.id;
  this.confirm = true;
  this.chasisSelected = row.vehiculo.chasis;
  this.userIdSelected = row.iduser;
  
  },
  
  onRowClickCompleted(row){
 this.preguntas = [];
  this.getResult(row.id,this.selectedEncuesta);
 
  this.resultEncuesta = true;
  
  },
  
  
  openReasignarMetodo(){
  
  this.openReasignar = true;
  this.confirm = false;
  },
 async EditVenta(){
  const entity = {
  iduser: this.userIdSelected
  };
  
  await api.patch('/venta/reassign/' + this.ventaIdSelected ,entity,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
  this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Reasigno la encuesta del vendedor: ' + response.data.vendedor.name,
          icon: 'done'
        })
   
      }	  
	  )

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',
		 
        message: 'Error al reasignar la encuesta'
      }));
	   this.openReasignar = false;
	  this.generarReporte();
  },
  
   async getResult(idventa: string,idEncuesta: string){
   const value = {
   idVenta: idventa,
   idEncuesta: idEncuesta
   }
 
await api.post('/cuestionario/result/',value,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
   
    this.preguntas = response.data.result
   
      }	  
	  )

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',
		 
        message: 'Error al obtener la respuesta'
      }));
	  
	  


 
 

 
  
  
 
  
  },
  
 
   
  },
	
	mounted(){
    this.loadHoster(),
	this.loadencuesta()
	
	
	
   

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