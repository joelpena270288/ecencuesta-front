<template>
    <q-page

class="q-pa-md"
>
<div class="q-pa-md">
    <q-table
      flat bordered
      title="Marcas"
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
  <q-dialog v-model="newMarca" persistent >

      <q-card class="my-card " flat bordered>
        <q-card-section>
          <div class="text-h6">Nueva Marca</div>

        </q-card-section>

        <q-separator />
        <q-card-section class="horizontal">




<q-input
    filled
    v-model="marca.name"
    label="Marca *"

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un Marca']"

  />
</q-card-section>
  <q-card-section class="horizontal">
		   <div class="text-h6">Competencia</div>
      <q-radio v-model="competencia" val = 'si' label="SI" />
      <q-radio v-model="competencia" val= 'no' label="NO" />
     
   </q-card-section>
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='AddMarca()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='ClosedNewMarca()' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>

<!-- Editar-->

<template>
  <div class="q-pa-md q-gutter-sm">
 <q-dialog v-model="editMarca" persistent >
      <q-card class="my-card " flat bordered>
        <q-card-section>
          <div class="text-h6">Editar Marca</div>
        </q-card-section>
        <q-separator />

 <q-card-section class="horizontal">


   <q-input
    filled
    v-model="marca.name"
    label="Marca *"

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un Marca']"

  />
  </q-card-section>
 <q-card-section class="horizontal">
		   <div class="text-h6">Competencia</div>
      <q-radio v-model="competencia" val = 'si' label="SI" />
      <q-radio v-model="competencia" val= 'no' label="NO" />
     
   </q-card-section>
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='EditMarca()'/>
     <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="confirm = true"/>
    <q-btn label="Cerrar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" @click='ClosedEditMarca()' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>
<div class="q-pa-md">
<q-page-sticky position="bottom-center" :offset="[18, 18]">
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
		 </q-fab-action>

              <q-fab-action @click="OpenNewMarca()" color="light-blue" icon="add_box" :disable="draggingFab" >
              <q-tooltip>
         Nuevo
        </q-tooltip>
		 </q-fab-action>
            </q-fab>
          </q-page-sticky>

</div>
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="priority_high" color="primary" text-color="white" />
          <span class="q-ml-sm">Desea eliminar la Marca?.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="DeleteMarca()"/>
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
  name: 'MarcaPage',

 data(){
  return{
    newMarca: false,
    editMarca: false,
    competencia: 'no',
  rows: [],

  columns: [
{   label: 'Marca',
    name: 'name',
    required: true,
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },


{   label: 'Competencia',
    name: 'competencia',
    required: true,
    align: 'center',
    field: row => row.competencia,
    format: val => `${val}`,
    sortable: true
  }





],

marcas: [],
marca: {
  name: '',
  competencia: false


},
 ideselected: 0,
}
 },
   components:{},
   methods: {
    loadMarca() {
    api.get('/marca/',{
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


  OpenNewMarca(){

    this.marca.name = '';
    this.competencia = 'no';



    this.newMarca = true;

  },
  ClosedNewMarca(){
    this.marca.name = '';
	this.competencia = 'no';

    this.newMarca = false;
  },
 async AddMarca(){
if(this.marca.name !=='' ){

 if(this.competencia == 'si'){
    this.marca.competencia = true;
 }
await api.post('/marca/',this.marca,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se inserto la Marca ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.newMarca = false;

 this.loadMarca();
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
    this.editMarca = true;



  },
async  EditMarca(){

 if(this.competencia == 'si'){
    this.marca.competencia = true;
 }

    if(this.marca.name !==''){

        await api.patch('/marca/'+this.idselected,this.marca,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Modifico la Marca ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

      this.editMarca = false;

      this.loadMarca();
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
  ClosedEditMarca(){
    this.marca.name = '';
 this.editMarca = false;
  },
 async DeleteMarca(){
    await api.delete('/marca/'+this.idselected,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Elimino la Marca ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.confirm = false;
      this.editMarca = false;
      this.loadMarca();
  },
  onRowClick(row){


    this.marca.name = row.name;


    this.idselected = row.id;
	if( row.competencia){
	this.competencia = 'si';
	}
	else{
	this.competencia = 'no';
	}

    this.editMarca = true;
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
          'Listado_Marcas.csv',
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
    this.loadMarca()

   },
   setup () {
    return {

      confirm: ref(false),
      filter: ref('')

    }


  }
}
</script>
