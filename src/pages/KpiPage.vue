<template>
    <q-page

class="q-pa-md"
>
<div class="q-pa-md">
    <q-table
      flat bordered
      title="KPI"
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
  <q-dialog v-model="newKpi" persistent >

      <q-card class="my-card " flat bordered>
        <q-card-section>
          <div class="text-h6">Nuevo KPI</div>

        </q-card-section>
		 

        <q-separator />
        <q-card-section class="horizontal">




<q-input
    filled
    v-model="kpi.name"
    label="Nombre *"

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un Color']"

  />
</q-card-section>
 <q-card-section class="horizontal">
 
<q-input
      v-model.number="kpi.indiceEncuesta"
      type="number"
      filled
      label = "Indice Encuesta"
      style="max-width: 300px"
    />
    
    </q-card-section>
	
	<q-card-section class="horizontal">
 
<q-input
      v-model.number="kpi.indiceVenta"
      type="number"
      filled
      label = "Indice Venta"
      style="max-width: 300px"
    />
    
    </q-card-section>
	<q-card-section class="horizontal">
 
<q-input
      v-model.number="kpi.indiceDescuesto"
      type="number"
      filled
      label = "Indice Descuento"
      style="max-width: 300px"
    />
    
    </q-card-section>
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='AddKpi()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='ClosedNewKpi()' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>

<!-- Editar-->

<template>
  <div class="q-pa-md q-gutter-sm">
 <q-dialog v-model="editKpi" persistent >
      <q-card class="my-card " flat bordered>
        <q-card-section>
          <div class="text-h6">Editar KPI</div>
        </q-card-section>
        <q-separator />

 <q-card-section class="horizontal">


   <q-input
    filled
    v-model="kpi.name"
    label="Nombre *"

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un Color']"

  />
  </q-card-section>
  <q-card-section class="horizontal">
 
<q-input
      v-model.number="kpi.indiceEncuesta"
      type="number"
      filled
      label = "Indice Encuesta"
      style="max-width: 300px"
    />
    
    </q-card-section>
	
	<q-card-section class="horizontal">
 
<q-input
      v-model.number="kpi.indiceVenta"
      type="number"
      filled
      label = "Indice Venta"
      style="max-width: 300px"
    />
    
    </q-card-section>
	<q-card-section class="horizontal">
 
<q-input
      v-model.number="kpi.indiceDescuesto"
      type="number"
      filled
      label = "Indice Descuento"
      style="max-width: 300px"
    />
    
    </q-card-section>

            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='EditKpi()'/>
     <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="confirm = true"/>
    <q-btn label="Cerrar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" @click='ClosedEditKpi()' />
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

              <q-fab-action @click="OpenNewKpi()" color="light-blue" icon="add_box" :disable="draggingFab" >
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
          <span class="q-ml-sm">Desea eliminar el KPI?.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="DeleteKpi()"/>
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
  name: 'KpiPage',

 data(){
  return{
    newKpi: false,
    editKpi: false,

  rows: [],

  columns: [
{   label: 'Nombre',
    name: 'name',
    required: true,
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },







],

kpis: [],
kpi: {
  name: '',
  indiceEncuesta: 0,
  indiceVenta: 0,
  indiceDescuesto: 0


},
 ideselected: 0,
}
 },
   components:{},
   methods: {
   async loadKpi() {
   await api.get('/kpi/',{
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


  OpenNewKpi(){

    this.kpi.name = '';
    this.kpi.indiceEncuesta = 0;
    this.kpi.indiceVenta = 0;
   this.kpi.indiceDescuesto = 0;
    this.newKpi = true;

  },
  ClosedNewKpi(){
    this.kpi.name = '';
    this.kpi.indiceEncuesta = 0;
    this.kpi.indiceVenta = 0;
   this.kpi.indiceDescuesto = 0;

    this.newKpi = false;
  },
 async AddKpi(){
if(this.kpi.name !=='' &  this.kpi.indiceEncuesta> 0 & this.kpi.indiceVenta > 0 &  this.kpi.indiceDescuesto > 0 ){

await api.post('/kpi/',this.kpi,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se inserto el KPI ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.newKpi = false;
	   this.kpi.name = '';
    this.kpi.indiceEncuesta = 0;
    this.kpi.indiceVenta = 0;
   this.kpi.indiceDescuesto = 0;

 this.loadKpi();
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
    this.editKpi= true;
  },
async  EditKpi(){


    if(this.kpi.name !==''  &  this.kpi.indiceEncuesta> 0 & this.kpi.indiceVenta > 0 &  this.kpi.indiceDescuesto > 0 ){

        await api.patch('/kpi/'+this.idselected,this.kpi,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Modifico el KPI ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

      this.editKpi = false;

      this.loadKpi();
	   this.kpi.name = '';
    this.kpi.indiceEncuesta = 0;
    this.kpi.indiceVenta = 0;
   this.kpi.indiceDescuesto = 0;
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
  ClosedEditKpi(){
    this.kpi.name = '';
 this.editKpi = false;
  },
 async DeleteKpi(){
    await api.delete('/kpi/'+this.idselected,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Elimino el KPI ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.confirm = false;
      this.editKpi = false;
      this.loadKpi();
	   this.kpi.name = '';
    this.kpi.indiceEncuesta = 0;
    this.kpi.indiceVenta = 0;
   this.kpi.indiceDescuesto = 0;
  },
  onRowClick(row){


    this.kpi.name = row.name;
     
    this.kpi.indiceEncuesta = row.indiceEncuesta;
    this.kpi.indiceVenta = row.indiceVenta;
   this.kpi.indiceDescuesto = row.indiceDescuesto;

    this.idselected = row.id;

    this.editKpi = true;
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
          'Listado_Kpi.csv',
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
    this.loadKpi()

   },
   setup () {
    return {

      confirm: ref(false),
      filter: ref('')

    }


  }
}
</script>
