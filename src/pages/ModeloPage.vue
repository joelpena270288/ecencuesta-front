<template>
    <q-page

class="q-pa-md"
>
<div class="q-pa-md">
    <q-table
      flat bordered
      title="Modelos"
      :rows="rows"
      :columns="columns"
      color="primary"
      row-key="name"
	  :filter="filter"
    >


      <template v-slot:body="props">
        <q-tr :props="props" @click="onRowClick(props.row)">
		
          <q-td key="name" :props="props">

            {{ props.row.name }}

          </q-td>



		   <q-td key="marca" :props="props">

              {{props.row.marca.name}}

          </q-td>
		   <q-td key="competencia" :props="props">

            {{ props.row.competencia?'SI':'NO' }}

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
  <q-dialog v-model="newModelo" persistent >

      <q-card class="my-card " flat bordered>
         <q-card-section class="horizontal">
          <div class="text-h6">Nuevo Modelo</div>

        </q-card-section>

        <q-separator />
        <q-card-section class="horizontal">


<q-input
    filled
    v-model="modelo.name"
    label="Modelo *"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un modelo ']"

  />
   </q-card-section>

 <q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona la Marca"
        v-model="selectedMarca"
        :options="marcas"
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"

        emit-value
        map-options
        style="min-width: 250px; max-width: 350px"
      />

</q-card-section>
 <q-card-section class="horizontal">
		   <div class="text-h6">Competencia</div>
      <q-radio v-model="competencia" val = 'si' label="SI" />
      <q-radio v-model="competencia" val= 'no' label="NO" />
     
   </q-card-section>

            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='AddModelo()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='ClosedNewModelo()' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>

<!-- Editar-->

<template>
  <div class="q-pa-md q-gutter-sm">
 <q-dialog v-model="editModelo" persistent >
      <q-card class="my-card " flat bordered>
        <q-card-section class="horizontal">
          <div class="text-h6">Editar Modelo</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="horizontal">


          <q-input
    filled
    v-model="modelo.name"
    label="Modelo *"

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un Modelo ']"

  />


</q-card-section>

 <q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona la Marca"
        v-model="selectedMarca"
        :options="marcas"
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"

        emit-value
        map-options
        style="min-width: 250px; max-width: 350px"
      />

</q-card-section>
 <q-card-section class="horizontal">
		   <div class="text-h6">Competencia</div>
      <q-radio v-model="competencia" val = 'si' label="SI" />
      <q-radio v-model="competencia" val= 'no' label="NO" />
     
   </q-card-section>
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='EditModelo()'/>
     <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="confirm = true"/>
    <q-btn label="Cerrar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" @click='ClosedEditModelo()' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>

<div class="q-pa-md">
<q-page-sticky position="bottom-center"  :offset="[18, 18]">
            <q-fab
              icon="keyboard_arrow_right"
              direction="right"
              color="primary"
              :disable="draggingFab"
              v-touch-pan.prevent.mouse="moveFab"
            >
            <q-fab-action @click="exportTable()" color="light-blue" icon="download" :disable="draggingFab" >
              <q-tooltip>
         Descargar
        </q-tooltip>
            </q-fab-action >
              <q-fab-action @click="OpenNewModelo()" color="light-blue" icon="add_box" :disable="draggingFab">
              <q-tooltip>
         Nuevo
        </q-tooltip>
            </q-fab-action >
            </q-fab>
          </q-page-sticky>

</div>



<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="priority_high" color="primary" text-color="white" />
          <span class="q-ml-sm">Desea desahabilitar el Modelo?.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="DeleteModelo()"/>
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
  name: 'ModeloPage',

 data(){
  return{
    competencia: 'no',
    newModelo: false,
    editModelo: false,

  rows: [],

  columns: [
{   label: 'Modelo',
    name: 'name',
    required: true,
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },


  {
    name: 'marca',
     align: 'center',
    label: 'Marca',
    field: row => row.marca.name,
    sortable: true
   },

 {
    name: 'competencia',
     align: 'center',
    label: 'Competencia',
    field: row => row.competencia,
    sortable: true
   },


],

modelos: [],
modelo: {
  name: '',
  idMarca: '',
  competencia: false


},
ideselected: 0,
marcas: [],


}
 },
   components:{},
   methods: {
  async  loadModelo () {
  await  api.get('/modelo/',{
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
  loadMarca () {
    api.get('/marca/',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
        this.marcas = response.data
      })
     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

  },

  OpenNewModelo(){
   this.modelo.name = '';
  
   this.competencia = 'no';
    this.newModelo = true;
  },
  ClosedNewModelo(){
    this.modelo.name = '';
    this.competencia = 'no';
   
    this.newModelo = false;

  },
 async AddModelo(){

if(this.modelo.name !=='' &  this.selectedMarca!=='' ){

 if(this.competencia == 'si'){
    this.modelo.competencia = true;
 }else{
  this.modelo.competencia = false;
 }

this.modelo.idMarca = this.selectedMarca;
await api.post('/modelo/',this.modelo,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se inserto el Modelo ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.newModelo = false;

 this.loadModelo();
   }
else{
  this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Llene los capos requeridos',
          icon: 'report_problem'
        });

}

  },
  OpenEdit(){
    this.editModelo = true;



  },
async  EditModelo(){


  if(this.modelo.name !=='' & this.selectedMarca!=='' ){
  if(this.competencia == 'si'){
    this.modelo.competencia = true;
 }else{
  this.modelo.competencia = false;
 }
  this.modelo.idMarca = this.selectedMarca;
await api.patch('/modelo/'+this.idselected,this.modelo,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se editó el Modelo ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.editModelo = false;

 this.loadModelo();
   }
else{
  this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Llene los capos requeridos',
          icon: 'report_problem'
        });

}


  },
  ClosedEditModelo(){
    this.modelo.name = '';
 this.editModelo = false;
  },
 async DeleteModelo(){
    await api.delete('/modelo/'+this.idselected,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Desahabilito el Modelo del sistema ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.confirm = false;
      this.editModelo = false;
      this.selectedMarca = '';
      this.modelo.name = "";
      this.modelo.idMarca = "";
      this.loadModelo();
  },

  onRowClick(row){
    this.idselected = row.id;

    this.modelo.name = row.name;

    this.selectedMarca = row.marca.id;

if( row.competencia){
	this.competencia = 'si';
	}
	else{
	this.competencia = 'no';
	}



this.editModelo = true;

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
          'Listado_Modelos.csv',
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
      }
   },
   mounted(){
    this.loadModelo(),
    this.loadMarca()

   },
   setup () {
    return {
      selected: ref([]),
      selectedModelo: ref(null),

     confirm: ref(false),
	  filter: ref(''),
	  selectedMarca:ref('')



    }


  }
}
</script>
