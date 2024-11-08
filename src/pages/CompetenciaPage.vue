<template>
    <q-page

class="q-pa-md"
>
<div class="q-pa-md">
    <q-table
      flat bordered
      title="Colores"
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
  <q-dialog v-model="newColor" persistent >

      <q-card class="my-card " flat bordered>
        <q-card-section>
          <div class="text-h6">Nuevo Color</div>

        </q-card-section>

        <q-separator />
        <q-card-section class="horizontal">




<q-input
    filled
    v-model="color.name"
    label="Color *"

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un Color']"

  />
</q-card-section>

            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='AddColor()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='ClosedNewColor()' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>

<!-- Editar-->

<template>
  <div class="q-pa-md q-gutter-sm">
 <q-dialog v-model="editColor" persistent >
      <q-card class="my-card " flat bordered>
        <q-card-section>
          <div class="text-h6">Editar Color</div>
        </q-card-section>
        <q-separator />

 <q-card-section class="horizontal">


   <q-input
    filled
    v-model="color.name"
    label="Color *"

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un Color']"

  />
  </q-card-section>

            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='EditColor()'/>
     <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="confirm = true"/>
    <q-btn label="Cerrar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" @click='ClosedEditColor()' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>
<q-page-sticky position="top-right" :offset="[18, 18]">
            <q-fab
              icon="add"
              direction="down"
              color="primary"
              :disable="draggingFab"
              v-touch-pan.prevent.mouse="moveFab"
            >
			 <q-fab-action @click="exportTable()" color="positive" icon="download" :disable="draggingFab" >
              <q-tooltip>
         Descargar
        </q-tooltip>
		 </q-fab-action>

              <q-fab-action @click="OpenNewColor()" color="positive" icon="add_box" :disable="draggingFab" >
              <q-tooltip>
         Nuevo
        </q-tooltip>
		 </q-fab-action>
            </q-fab>
          </q-page-sticky>


<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="priority_high" color="primary" text-color="white" />
          <span class="q-ml-sm">Desea eliminar el Color?.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="DeleteColor()"/>
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
  name: 'ColorPage',

 data(){
  return{
    newColor: false,
    editColor: false,

  rows: [],

  columns: [
{   label: 'Color',
    name: 'name',
    required: true,
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },







],

colores: [],
color: {
  name: ''


},
 ideselected: 0,
}
 },
   components:{},
   methods: {
  async  loadColor() {
  await  api.get('/color/',{
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


  OpenNewColor(){

    this.color.name = '';




    this.newColor = true;

  },
  ClosedNewColor(){
    this.color.name = '';

    this.newColor = false;
  },
 async AddColor(){
if(this.color.name !=='' ){

await api.post('/color/',this.color,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se inserto el Color ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.newColor = false;

 this.loadColor();
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
    this.editColor = true;



  },
async  EditColor(){


    if(this.color.name !==''){

        await api.patch('/color/'+this.idselected,this.color,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Modifico el Color ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

      this.editColor = false;

      this.loadColor();
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
  ClosedEditColor(){
    this.color.name = '';
 this.editColor = false;
  },
 async DeleteColor(){
    await api.delete('/color/'+this.idselected,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Elimino el Color ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.confirm = false;
      this.editColor = false;
      this.loadColor();
  },
  onRowClick(row){


    this.color.name = row.name;


    this.idselected = row.id;

    this.editColor = true;
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
          'Listado_Coloress.csv',
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
    this.loadColor()

   },
   setup () {
    return {

      confirm: ref(false),
      filter: ref('')

    }


  }
}
</script>
