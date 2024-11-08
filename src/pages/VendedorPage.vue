<template>
    <q-page

class="q-pa-md"
>
<div class="q-pa-md">
    <q-table
      flat bordered
      title="Vendedores"
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
          <q-td key="lastname" :props="props">

              {{ props.row.lastname }}

          </q-td>
            <q-td key="address" :props="props">

              {{ props.row.address }}

          </q-td>
           <q-td key="phone" :props="props">

              {{ props.row.phone }}

          </q-td>
           <q-td key="documento" :props="props">

              {{ props.row.documento }}

          </q-td>
           
		   <q-td key="grupo" :props="props">

              {{props.row.grupo.name}}

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
  <q-dialog v-model="newVendedor" persistent >

      <q-card class="my-card " flat bordered>
         <q-card-section class="horizontal">
          <div class="text-h6">Nuevo Vendedor</div>

        </q-card-section>

        <q-separator />
        <q-card-section class="horizontal">


<q-input
    filled
    v-model="vendedor.name"
    label="Nombre *"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un nombre ']"

  />
   </q-card-section>
    <q-card-section class="horizontal">
  <q-input
    filled
    v-model="vendedor.lastname"
    label="Apellidos "

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir los apellidos ']"

  />
   </q-card-section>
    <q-card-section class="horizontal">
  <q-input
    filled
    v-model="vendedor.documento"
    label="Documento "
  


  />
   </q-card-section>
   
    <q-card-section class="horizontal">
  <q-input
        filled
        v-model="vendedor.phone"
        label="Numero de Teléfono"
        mask="(###)-###-####"


      />
 </q-card-section>
    <q-card-section class="horizontal">
  <q-input
      v-model="vendedor.address"
      filled
      type="textarea"
      label="Dirección"

    />



</q-card-section>
 <q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona el Grupo"
        v-model="selectedGrupo"
        :options="grupos"
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"

        emit-value
        map-options
        style="min-width: 250px; max-width: 350px"
      />
    
</q-card-section>
  
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='AddVendedor()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='ClosedNewVendedor()' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>

<!-- Editar-->

<template>
  <div class="q-pa-md q-gutter-sm">
 <q-dialog v-model="editVendedor" persistent >
      <q-card class="my-card " flat bordered>
        <q-card-section class="horizontal">
          <div class="text-h6">Editar Vendedor</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="horizontal">


          <q-input
    filled
    v-model="vendedor.name"
    label="Nombre *"

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un nombre ']"

  />
</q-card-section>
  <q-card-section class="horizontal">
  <q-input
    filled
    v-model="vendedor.lastname"
    label="Apellidos "

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir los apellidos ']"

  />
</q-card-section>
  <q-card-section class="horizontal">
  <q-input
    filled
    v-model="vendedor.documento"
    label="Documento "
     


  />
</q-card-section>
 
  <q-card-section class="horizontal">
  <q-input
        filled
        v-model="vendedor.phone"
        label="Número de Teléfono"
        mask="(###)-###-####"

      />
</q-card-section>
<q-card-section class="horizontal">
  <q-input
      v-model="vendedor.address"
      filled
      type="textarea"
      label="Dirección"

    />
</q-card-section>

 <q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona el Grupo"
        v-model="selectedGrupo"
        :options="grupos"
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"

        emit-value
        map-options
        style="min-width: 250px; max-width: 350px"
      />
    
</q-card-section>
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='EditVendedor()'/>
     <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="confirm = true"/>
    <q-btn label="Cerrar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" @click='ClosedEditVendedor()' />
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
              <q-fab-action @click="OpenNewVendedor()" color="light-blue" icon="person_add" :disable="draggingFab">
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
          <span class="q-ml-sm">Desea desahabilitar el vendedor?.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="DeleteVendedor()"/>
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
  name: 'VendedorPage',

 data(){
  return{
    newVendedor: false,
    editVendedor: false,

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
  {   label: 'Apellidos',
    name: 'lastname',
    required: true,
    align: 'center',
    field: row => row.lastname,
    format: val => `${val}`,
    sortable: true
  },
  {   label: 'Dirección',
    name: 'address',
    required: true,
    align: 'center',
    field: row => row.address,
    format: val => `${val}`,
    sortable: true
  },
  {   label: 'Número de Teléfono',
    name: 'phone',
    required: true,
    align: 'center',
    field: row => row.phone,
    format: val => `${val}`,
    sortable: true
  },
  {   label: 'Documento',
    name: 'documento',
    required: true,
    align: 'center',
    field: row => row.documento,
    format: val => `${val}`,
    sortable: true
  },
 
  {
    name: 'grupo',
     align: 'center',
    label: 'Grupo',
    field: row => row.grupo.name,
    sortable: true
   },
 
 


],

vendedors: [],
vendedor: {
  name: '',
  lastname: '',
  address: '',
  phone: '',
  documento: '',
  grupos: [],
  
  idGrupo: ''


},
ideselected: 0,
grupos: [],


}
 },
   components:{},
   methods: {
   async loadVendedor () {
   await api.get('/vendedor/',{
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
 async loadGrupo () {
  await  api.get('/grupo/',{
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

  OpenNewVendedor(){
   this.vendedor = {};
    this.newVendedor = true;
  },
  ClosedNewVendedor(){
    this.vendedor = {};

    this.newVendedor = false;

  },
 async AddVendedor(){

if(this.vendedor.name !=='' & this.vendedor.lastname!=='' & this.selectedGrupo!=='' ){



this.vendedor.idGrupo = this.selectedGrupo;
await api.post('/vendedor/',this.vendedor,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se inserto el vendedor ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.newVendedor = false;

 this.loadVendedor();
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
    this.editVendedor = true;



  },
async  EditVendedor(){


  if(this.vendedor.name !=='' & this.vendedor.lastname!=='' & this.selectedGrupo!=='' ){
  this.vendedor.idGrupo = this.selectedGrupo;
await api.patch('/vendedor/'+this.idselected,this.vendedor,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se editó el vendedor ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.editVendedor = false;

 this.loadVendedor();
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
  ClosedEditVendedor(){
    this.vendedor = {};
 this.editVendedor = false;
  },
 async DeleteVendedor(){
    await api.delete('/vendedor/'+this.idselected,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Desahabilito el vendedor del sistema ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.confirm = false;
      this.editVendedor = false;
      this.loadVendedor();
  },
  onRowClick(row){
    this.idselected = row.id;
    console.log(row.grupo.id);
    this.vendedor.name = row.name;
    this.vendedor.lastname= row.lastname;
    this.vendedor.address= row.address;
    this.vendedor.phone= row.phone;
    this.vendedor.documento= row.documento;
    this.selectedGrupo = row.grupo.id;
	

   

this.editVendedor = true;

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
      }
   },
   mounted(){
    this.loadVendedor(),
    this.loadGrupo()

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
