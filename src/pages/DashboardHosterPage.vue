<template>
    <q-page

class="q-pa-md"
>
<div class="q-pa-md">
    <q-table
      flat bordered
      title="Ventas"
      :rows="rows"
      :columns="columns"
      color="primary"
      row-key="name"
	  :filter="filter"
    >


      <template v-slot:body="props">
        <q-tr :props="props" @click="onRowClick(props.row)">
		 <q-td key="fecha" :props="props">

              {{FormatoFecha(props.row.fecha)}}

          </q-td>
		   <q-td key="marca" :props="props">

            {{ props.row.marca }}


          </q-td>
		   <q-td key="modelo" :props="props">

              {{ props.row.modelo }}

          </q-td>
          <q-td key="chasis" :props="props">

            {{ props.row.chasis }}


          </q-td>
         
		   <q-td key="color" :props="props">

              {{ props.row.color }}

          </q-td>
		  
		  
            <q-td key="nombreCliente" :props="props">

              {{ props.row.nombreCliente }}

          </q-td>
           <q-td key="documentoCliente" :props="props">

              {{ props.row.documentoCliente }}

          </q-td>
           <q-td key="telefonoCliente" :props="props">

              {{ props.row.telefonoCliente }}

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
  
 <template>
  <div class="q-pa-md q-gutter-sm">
  <q-dialog v-model="newCuestionario" persistent  full-width>

      <q-card class="my-card " flat bordered>
        <q-card-section>
          <div class="text-h6">Encuestar Al Cliente</div>
          
        </q-card-section>
        <q-card-section>
	   <P> Nombre del Cliente:	{{nombreCliente}}  Telefono: {{telefonoCliente}}</p>
     
		</q-card-section>



        <q-separator />
         <q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona la Encuesta *"
        v-model="selectedEncuesta"
        :options="encuestas"
		:change= "SelectedEncuestaInput()"
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"

        emit-value
        map-options
      
      />

</q-card-section>

      <q-card-section class="horizontal">
	  
          <div v-for="tof in preguntas" v-bind:key="tof.id" > 
           <q-item>
              
            <div class="row" >
			 <div >  
			 <q-item-section>
                <div class="q-gutter-sm justify-center" > 
      <q-radio v-model="tof.respuesta_ToF" val="true" label="SI" />
      <q-radio v-model="tof.respuesta_ToF" val="false" label="NO" />
     
   </div>
	 </q-item-section> 
	  </div>
            <q-separator spaced inset/>
            
                 <q-item-section>
          <q-item-label class="col-auto">  
            		  
          {{tof.text}}  
                  
           </q-item-label> 
             </q-item-section> 
   
        
         </div>
         </q-item>
		  <q-separator/>
			  </div>
			
</q-card-section>
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='AddCuestionario()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='newCuestionario=false' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>

</q-page>
 </template>

 <script>
 import { ref } from 'vue';
 import { api } from 'boot/axios'
 import { exportFile, useQuasar } from 'quasar'
import authenticate from '../logic/authenticate'

//import  {Usuario}  from 'components/models'
import moment from 'moment';
function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

const $q = useQuasar()

 export default {
  name: 'VentaPage',

 data(){
  return{
    denseOpts: false,
  stringOptions: ['SI','NO'],
    newCuestionario: false,
   selectedEncuesta: '',
  rows: [],

  columns: [
{   label: 'Fecha',
    name: 'fecha',
    required: true,
    align: 'center',
    field: row => row.fecha,
    format: val => `${val}`,
    sortable: true
  },
   {   label: 'Marca',
    name: 'marca',
    required: true,
    align: 'center',
    field: row => row.marca,
    format: val => `${val}`,
    sortable: true
  },
   {   label: 'Modelo',
    name: 'modelo',
    required: true,
    align: 'center',
    field: row => row.modelo,
    format: val => `${val}`,
    sortable: true
  },
  {   label: 'Chasis',
    name: 'chasis',
    required: true,
    align: 'center',
    field: row => row.chasis,
    format: val => `${val}`,
    sortable: true
  },
 
  {   label: 'Color',
    name: 'color',
    required: true,
    align: 'center',
    field: row => row.color,
    format: val => `${val}`,
    sortable: true
  },
  {   label: 'Nombre Cliente',
    name: 'nombreCliente',
    required: true,
    align: 'center',
    field: row => row.nombreCliente,
    format: val => `${val}`,
    sortable: true
  },
 
  {
    name: 'documentoCliente',
     align: 'center',
    label: 'Documento Cliente',
    field: row => row.documentoCliente,
    sortable: true
   },
 
  {   label: 'Teléfono Cliente',
    name: 'telefonoCliente',
    required: true,
    align: 'center',
    field: row => row.telefonoCliente,
    format: val => `${val}`,
    sortable: true
  }
  
  

],

ideselected: 0,
encuestas: [],
preguntas: [],
nombreCliente: '',
telefonoCliente: ''

}

 },
   components:{},
   methods: {
   FormatoFecha(fecha){
  return moment(String(fecha)).utc().format('MM/DD/YYYY')

 },
  async  loadVenta () {
   await api.get('/venta/ByUser',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
        this.rows = response.data
      })
      .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

  },

   async loadEncuesta() {
   await api.get('/encuesta/activas',{
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

SelectedEncuestaInput(){
 
var select  = this.encuestas.find(x=>x.id === this.selectedEncuesta);
 if(select){
  this.preguntas = select.preguntas;
  this.preguntas.forEach(
	  (element) => {  
      
	     element.respuesta_ToF = "";

});
  
  }
},
 


  onRowClick(row){
  
  this.ideselected = row.id;
this.newCuestionario = true;
this.nombreCliente = row.nombreCliente;
this.telefonoCliente =  row.telefonoCliente;

 

  },
 
  exportTable () {
        // naive encoding to csv format
        const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
          this.rows.map(row => this.columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[ col.field === void 0 ? col.name : col.field ],
            col.format,
            row
          )).join(','))
        ).join('\r\n')

        const status = exportFile(
          'Listado_Vendedores.csv',
          content,
          'text/csv'
        )

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      },
	async  AddCuestionario(){
	 
	  const listRespuesta = [];
	  this.preguntas.forEach(
	  (element) => {	
	  
      
		 listRespuesta.push({idpregunta: element.id,respuesta: element.respuesta_ToF?  element.respuesta_ToF: false   })});
	
	  
	  const value = { 
	   idEncuesta: this.selectedEncuesta,    
       idVenta: this.ideselected,
   
    respuestas: listRespuesta
	  
	  }
	  await api.post('/cuestionario/',value,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se creó la encuesta satisfactoriamente' ,
          icon: 'done'
        });
		
		this.newCuestionario = false;
		this.preguntas = [];
		this.loadVenta();
		
		
      }
	  
	  )

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',
		 
        message: error.response.data.message
      }));
	  
	  }
   },
   mounted(){
  
   
	this.loadVenta(),
	this.loadEncuesta()
	

   },
   setup () {
    return {
      selected: ref([]),
      selectedGrupos: ref(null),

     confirm: ref(false),
	  filter: ref(''),
	  selectedGrupo:ref('')



    }


  }
}
</script>
<style lang="sass">
.example-row-vertical-alignment
  .row
    height: 5rem
   
 
</style>