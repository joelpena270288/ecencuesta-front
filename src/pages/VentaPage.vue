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

            {{ props.row.vehiculo.marca }}


          </q-td>
		   <q-td key="modelo" :props="props">

              {{ props.row.vehiculo.modelo }}

          </q-td>
          <q-td key="chasis" :props="props">

            {{ props.row.vehiculo.chasis }}


          </q-td>
         
		   <q-td key="color" :props="props">

              {{ props.row.vehiculo.color }}

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
           
		   <q-td key="name" :props="props">

              {{props.row.vendedor.name}}

          </q-td>
		   <q-td key="lastname" :props="props">

              {{props.row.vendedor.lastname}}

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
  
  
<!--Agregar Venta -->
  <template>
  <div class="q-pa-md q-gutter-sm">
  <q-dialog v-model="newVenta" persistent >

      <q-card class="my-card " flat bordered style="width: 700px; max-width: 80vw;">
	  
	  
	  
	  
	  
         <q-card-section class="horizontal">
          <div class="text-h6">Nueva Venta</div>

        </q-card-section>

        <q-separator />
		
		  <q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona la Marca *"
        v-model="vehiculo.marca"
        :options="marcas"
		:change= "SelectedMarcaInput()"
        :option-value="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"

        emit-value
        map-options
      
      />

</q-card-section>
<q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona el Modelo *"
        v-model="vehiculo.model"
        :options="modelosFiltrados"
		:change= "ValidModelo()"
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"

        emit-value
        map-options
      
      />

</q-card-section>
<q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona el Color *"
        v-model="vehiculo.color"
        :options="colores"
		
        :option-value="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"

        emit-value
        map-options
      
      />

</q-card-section>
		
		  <q-card-section class="horizontal">
       <q-input
    filled
    v-model="vehiculo.chasis"
    label="Chasis *"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un nombre ']"

  />

        </q-card-section>
		

   <q-card-section class="horizontal">
  <q-input
    filled
    v-model="venta.precioVenta"
    label="Precio  *"
   
    mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        prefix="$"
        input-class="text-right"

  />
</q-card-section>	
  <q-card-section class="horizontal">
  <q-input
    filled
    v-model="venta.precioFinVenta"
    label="Venta  *"
   
    mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        prefix="$"
        input-class="text-right"

  />
</q-card-section>	

<q-card-section>
 <q-input v-model="venta.fecha" filled type="date" label="Fecha Venta *" input-class="text-lefth"/>
 
</q-card-section>	
<q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona el Vendedor *"
        v-model="venta.vendedor"
        :options="optionsVendedores"
		:change= "ConfirmHoster()"
		use-input
		 @filter="filterFn"
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name +' ' + opt.lastname + ' ' + opt.documento: ''"

        emit-value
        map-options
      
      >
	  <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No resultado
            </q-item-section>
          </q-item>
        </template>
	  </q-select>

</q-card-section>	
		
		<q-separator />
        <q-card-section class="horizontal">


<q-input
    filled
    v-model="venta.nombreCliente"
    label="Nombre Completo Cliente *"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un nombre ']"

  />
   </q-card-section>
    <q-card-section class="horizontal">
  <q-input
    filled
    v-model="venta.correoCliente"
    label="Correo "

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un correo ']"

  />
   </q-card-section>
    <q-card-section class="horizontal">
  <q-input
    filled
    v-model="venta.documentoCliente"
    label="Documento del Cliente *"
  


  />
   </q-card-section>
   
    <q-card-section class="horizontal">
  <q-input
        filled
        v-model="venta.telefonoCliente"
        label="Numero de Teléfono del Cliente *"
        mask="(###)-###-####"


      />




</q-card-section>
<q-card-section class="horizontal" v-if= "validHoster & validMarca & validModelo">

  <q-select
  filled

  label="Selecciona Responsable Seguimiento *"
        v-model="venta.hoster"
        :options="hosters"
		
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'username' in opt ? opt.username : ''"

        emit-value
        map-options
      
      />

</q-card-section>

 
  
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='AddVenta()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='ClosedNewVenta()' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>


  
<!--Agregar Venta Masiva -->
  <template>
  <div class="q-pa-md q-gutter-sm">
  <q-dialog v-model="masivo" persistent >

      <q-card class="my-card " flat bordered style="width: 700px; max-width: 80vw;">
	  
	  
	  
	  
	  
         <q-card-section class="horizontal">
          <div class="text-h6">Cargar Excel con las ventas</div>

        </q-card-section>
    
        <q-separator />
		 <q-card-section class="horizontal">
         <p>El Excel debe tener el siguiente formato: 1- FECHA_VENTA 2- MODELO 3- CHASIS 4- COLOR 5- NOMBRE_COMPLETO_CLIENTE 6- EMAIL_CLIENTE 7- DOCUMENTO_CLIENTE 8- TELEFONO_CLIENTE 9- DOCUMENTO_VENDEDOR 10- PRECIO_REGULAR 11- PRECIO_VENTA</p>
         <div> <!-- Enlace simple --> <a href="/ventas.xlsx" target="_blank">Plantilla </a> <!-- Botón de Quasar --> </div>
		 <p>Formato Fecha Excel: MM/DD/YYYY</p>
        </q-card-section>
 <q-separator/>

<q-form @submit.prevent="handleSubmit"> 
<q-file v-model="file" ref="fileInput" label="Seleccione un archivo Excel" accept=".xlsx, .xls" @change="handleFileUpload" >

 <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
</q-file>
 <q-btn label="Validar Excel" icon="check" type="submit" color="secondary" flat class="q-ml-sm" @click="readExcel" /> </q-form> 
 
 <pre>{{ jsonData }}</pre>
            <q-card-actions>
			
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='AddVentaMasiva()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='masivo  = false' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>

<!-- Editar-->

<template>
  <div class="q-pa-md q-gutter-sm">
 <q-dialog v-model="editVenta" persistent >
      <q-card class="my-card "  flat bordered>
        <q-card-section class="horizontal">
          <div class="text-h6">Editar Venta</div>
        </q-card-section>
        <q-separator />
         <q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona la Marca *"
        v-model="vehiculo.marca"
        :options="marcas"
		:change= "SelectedMarcaInput()"
        :option-value="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"

        emit-value
        map-options
      
      />

</q-card-section>
<q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona el Modelo *"
        v-model="vehiculo.model"
        :options="modelosFiltrados"
		:change= "ValidModelo()"
		
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"

        emit-value
        map-options
      
      />

</q-card-section>
<q-card-section class="horizontal">

  <q-select
  filled

  label="Selecciona el Color *"
        v-model="vehiculo.color"
        :options="colores"
		
        :option-value="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"

        emit-value
        map-options
      
      />

</q-card-section>
		
		  <q-card-section class="horizontal">
       <q-input
    filled
    v-model="vehiculo.chasis"
    label="Chasis *"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un nombre ']"

  />

        </q-card-section>
		

   <q-card-section class="horizontal">
  <q-input
    filled
    v-model="venta.precioVenta"
    label="Precio  *"
   
    mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        prefix="$"
        input-class="text-right"

  />
</q-card-section>	
  <q-card-section class="horizontal">
  <q-input
    filled
    v-model="venta.precioFinVenta"
    label="Venta  *"
   
    mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        prefix="$"
        input-class="text-right"

  />
</q-card-section>	

<q-card-section>
 <q-input v-model="venta.fecha" filled type="date" label="Fecha Venta *" input-class="text-lefth"/>
 
</q-card-section>	
<q-card-section class="horizontal">

  <q-select
  
  
  
  
  
  
  filled

  label="Selecciona el Vendedor *"
        v-model="venta.vendedor"
        :options="vendedores"
		:change= "ConfirmHoster()"
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name +' ' + opt.lastname + ' ' + opt.documento: ''"

        emit-value
        map-options
      
      />

</q-card-section>	
		
		<q-separator />
        <q-card-section class="horizontal">


<q-input
    filled
    v-model="venta.nombreCliente"
    label="Nombre Completo Cliente *"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un nombre ']"

  />
   </q-card-section>
    <q-card-section class="horizontal">
  <q-input
    filled
    v-model="venta.correoCliente"
    label="Correo "

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un correo ']"

  />
   </q-card-section>
    <q-card-section class="horizontal">
  <q-input
    filled
    v-model="venta.documentoCliente"
    label="Documento del Cliente *"
  


  />
   </q-card-section>
   
    <q-card-section class="horizontal">
  <q-input
        filled
        v-model="venta.telefonoCliente"
        label="Numero de Teléfono del Cliente *"
        mask="(###)-###-####"


      />




</q-card-section>
<q-card-section class="horizontal" v-if= "validHoster & validMarca & validModelo">

  <q-select
  filled

  label="Selecciona Responsable Seguimiento *"
        v-model="venta.hoster"
        :options="hosters"
		
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : ''"
        :option-label="opt => Object(opt) === opt && 'username' in opt ? opt.username : ''"

        emit-value
        map-options
      
      />

</q-card-section>
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='EditVenta()'/>
     <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="confirm = true"/>
    <q-btn label="Cerrar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" @click='ClosedEditVenta()' />
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
              <q-fab-action @click="OpenNewVenta()" color="light-blue" icon="assignment" :disable="draggingFab">
              <q-tooltip>
         Nuevo
        </q-tooltip>
            </q-fab-action >
			 <q-fab-action @click="OpenMasivo()" color="light-blue" icon="archive" :disable="draggingFab">
              <q-tooltip>
         Masivo
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
          <span class="q-ml-sm">Desea desahabilitar el venta?.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="DeleteVenta()"/>
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
 import { date } from 'quasar'
//import  {Usuario}  from 'components/models'
import moment from 'moment';
import * as XLSX from 'xlsx';
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
 file: null, 
 jsonData: null,
 excelValido: false,
 optionsVendedores: [],
    newVenta: false,
    editVenta: false,

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
    field: row => row.vehiculo.marca,
    format: val => `${val}`,
    sortable: true
  },
   {   label: 'Modelo',
    name: 'modelo',
    required: true,
    align: 'center',
    field: row => row.vehiculo.modelo,
    format: val => `${val}`,
    sortable: true
  },
  {   label: 'Chasis',
    name: 'chasis',
    required: true,
    align: 'center',
    field: row => row.vehiculo.chasis,
    format: val => `${val}`,
    sortable: true
  },
 
  {   label: 'Color',
    name: 'color',
    required: true,
    align: 'center',
    field: row => row.vehiculo.color,
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
  },
   {   label: 'Nombre Vendedor',
    name: 'name',
    required: true,
    align: 'center',
    field: row => row.vendedor.name,
    format: val => `${val}`,
    sortable: true
  },
  
  
   {  label: 'Apellido Vendedor',
    name: 'lastname',
    required: true,
    align: 'center',
    field: row => row.vendedor.lastname,
    format: val => `${val}`,
    sortable: true
  }



],


venta: {
  nombreCliente: '',
  telefonoCliente: '',
  correoCliente: '',
  documentoCliente: '',
  fecha: '',
  precioVenta: 0,
  precioFinVenta: 0,
  hoster: '',
  vendedor: ''



},
  vehiculo: { 
  marca: '',
  chasis: '',
  modelo: '',
  color: '',
  model: ''
  },
ideselected: 0,
hosters: [],
vendedores: [],
marcas: [],
modelos: [],
colores: [],
modelosFiltrados: [],
validHoster: false,
validMarca: false,
validModelo: false,
masivo: false,
data: null


}

 },
   components:{},
   methods: {
   ConfirmHoster(){
   const found =  this.vendedores.find(x=>x.id === this.venta.vendedor);
 
  if( !found){
  this.validHoster = false;
  }else{
  this.validHoster = found.grupo.competencia;
  }
  
   },
   FormatoFecha(fecha){
  return moment(String(fecha)).utc().format('MM/DD/YYYY')

 },
  async  loadVenta () {
   await api.get('/venta/',{
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
 async loadVendedor () {
   await api.get('/vendedor/',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
        this.vendedores = response.data
      })
     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

  },
  async  loadMarca() {
  await  api.get('/marca/',{
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
   async  loadModelo() {
  await  api.get('/modelo/',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
        this.modelos = response.data
      })
      .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

  },
   async  loadColor() {
  await  api.get('/color/',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
        this.colores = response.data
      })
      .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

  },
  
  OpenNewVenta (){
    this.vehiculo = {};
   this.venta = {};
    this.newVenta = true;
  },
  ClosedNewVenta(){
    this.venta = {};

    this.newVenta = false;

  },
   OpenMasivo (){
   
    this.masivo = true;
  },
  
  SelectedMarcaInput() {
  
 
  var select = this.marcas.find(x=> x.name == this.vehiculo.marca);
  if(select){
  if(select.competencia){
  this.validMarca = true;
  }else{
   this.validMarca = false;
  }
  this.modelosFiltrados = select.modelos;
  var selectedModelo = this.modelosFiltrados.find(y=> y.id === this.vehiculo.model);
  if(!selectedModelo){
  this.vehiculo.model = "";
  }
  
  }
 

},
 ValidModelo() {  

  var select = this.modelos.find(x=> x.id == this.vehiculo.model);
  if(select){
  if(select.competencia){
  this.validModelo = true;
  }else{
   this.validModelo = false;
  }
 
 }

},
 async AddVenta(){

if(this.venta.nombreCliente !=='' & this.venta.telefonoCliente!=='' & this.venta.documentoCliente!=='' & this.venta.fecha!='' & this.vehiculo.marca!='' & this.vehiculo.chasis != '' & this.vehiculo.model != '' & this.vehiculo.color !=''  ){

const foundModelo = this.modelos.find(x=>x.id === this.vehiculo.model).name;

const VentaObjeto = {
nombreCliente:this.venta.nombreCliente,
 telefonoCliente: this.venta.telefonoCliente,
 correoCliente: this.venta.correoCliente,
documentoCliente: this.venta.documentoCliente,
fecha: this.venta.fecha,
iduser: this.venta.hoster,
chasis: this.vehiculo.chasis,
marca: this.vehiculo.marca,
model: this.vehiculo.model,
modelo: foundModelo,
color: this.vehiculo.color,
idVendedor: this.venta.vendedor,
precioVenta: this.venta.precioVenta,
precioFinVenta: this.venta.precioFinVenta
 }


await api.post('/venta/',VentaObjeto,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
         message: 'Se editó la venta del vehiculo ' + response.data.vehiculo.chasis,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.newVenta = false;

 this.loadVenta();
 this.limpiarDatos();
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
    this.editVenta = true;



  },
async  EditVenta(){


 if(this.venta.nombreCliente !=='' & this.venta.telefonoCliente!=='' & this.venta.documentoCliente!=='' & this.venta.fecha!='' & this.vehiculo.marca!='' & this.vehiculo.chasis != '' & this.vehiculo.model != '' & this.vehiculo.color !=''  ){
 
 const foundModelo = this.modelos.find(x=>x.id === this.vehiculo.model).name;
 const VentaObjeto = {
nombreCliente:this.venta.nombreCliente,
 telefonoCliente: this.venta.telefonoCliente,
 correoCliente: this.venta.correoCliente,
documentoCliente: this.venta.documentoCliente,
fecha: this.venta.fecha,
iduser: this.venta.hoster,
chasis: this.vehiculo.chasis,
marca: this.vehiculo.marca,
modelo: foundModelo,
model: this.vehiculo.model,
color: this.vehiculo.color,
idVendedor: this.venta.vendedor,
precioVenta: this.venta.precioVenta,
precioFinVenta: this.venta.precioFinVenta
 }
await api.patch('/venta/'+this.idselected,VentaObjeto,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se editó la venta del vehiculo ' + response.data.vehiculo.chasis,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.editVenta = false;

 this.loadVenta();
 this.limpiarDatos();
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
  ClosedEditVenta(){
    this.venta = {};
 this.editVenta = false;
  },
 async DeleteVenta(){
    await api.delete('/venta/'+this.idselected,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Desahabilito el venta del sistema ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.confirm = false;
      this.editVenta = false;
      this.loadVenta();
  },
  onRowClick(row){
 
    this.idselected = row.id;
    this.venta.nombreCliente = row.nombreCliente;
    this.venta.telefonoCliente = row.telefonoCliente;
    this.venta.correoCliente = row.correoCliente;
    this.venta.documentoCliente = row.documentoCliente;
	this.validHoster = row.vendedor.grupo.competencia;
 
   this.venta.fecha = moment(String(row.fecha)).utc().format('YYYY-MM-DD');
	
    this.venta.precioVenta = row.precioVenta;
    this.venta.precioFinVenta = row.precioFinVenta;
    this.venta.hoster = row.iduser;
    this.venta.vendedor = row.vendedor.id;
    this.vehiculo.marca = row.vehiculo.marca;
    this.vehiculo.chasis = row.vehiculo.chasis;
    this.vehiculo.model = row.vehiculo.model.id;
    this.vehiculo.color =  row.vehiculo.color;
	if( row.vehiculo.model.marca.competencia){
	this.validMarca = true;
	}else{
	this.validMarca = false;
	}
  if( row.vehiculo.model.competencia){
	this.validModelo = true;
	}else{
	this.validModelo = false;
	}

	

   

this.editVenta = true;

  },
  limpiarDatos(){
  this.venta =  {
  nombreCliente:'',
  telefonoCliente: '',
  correoCliente:'',
  documentoCliente:'',
  fecha: '',
  precioVenta: 0,
  precioFinVenta: 0,
  hoster: '',
  vendedor:''
};
 this.vehiculo = { 
  marca: '',
  chasis: '',
  modelo: '',
  color: ''
  };
  this.validHoster = false;
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
          'Listado_Ventas.csv',
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
	 async AddVentaMasiva(){

if(this.excelValido){
await api.post('/venta/masivo/',this.jsonData,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
  
  
    this.$q.notify({
          color: 'positive',
          position: 'top',
         message: 'Se insertaron las ventas masivas ',
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.masivo = false;

 this.loadVenta();
 this.excelValido = false;
 this.jsonData = null;
 this.file = null;
}
 


  },
 handleFileUpload(file) 
 { 
 this.file = file;

 },
 readExcel() {
 if (!this.file) {
 this.$q.notify({
 type: 'negative',
 message: 'Por favor, seleccione un archivo',
 });
 return;
 }
 const reader = new FileReader();
 reader.onload = (event) => {
 const data = new Uint8Array(event.target.result);
 const workbook = XLSX.read(data, { type: 'array' }); 
 const sheetName = workbook.SheetNames[0];
 const worksheet = workbook.Sheets[sheetName];
 this.jsonData = XLSX.utils.sheet_to_json(worksheet);
  data.value = this.jsonData; 
 
   if(this.validarDatos(data.value)){
   this.excelValido = true;
	   this.$q.notify({
           color: 'positive',
          position: 'top',
          message: 'Se Validaron los datos del excel',
          icon: 'done'
          });
	  }
	  else{
	  this.$q.notify({
           color: 'negative',
          position: 'top',
          message: 'Revise los datos del Excel',
          icon: 'warning'
          });
	  }
 };
 reader.readAsArrayBuffer(this.file);
 },
   validarDatos(datos){
	let valor = true;
	datos.forEach(element=>{
   
	if(element.CHASIS =="" || typeof(this.colores.find(color=> color.name ===  element.COLOR)) =="undefined" || element.FECHA_VENTA =="" || element.NOMBRE_COMPLETO_CLIENTE =="" || element.PRECIO_REGULAR == "" || element.PRECIO_VENTA =="" ||  typeof ( this.modelos.find(modelo =>modelo.name === element.MODELO.toString() )) === "undefined"|| typeof (this.vendedores.find(vendedor =>vendedor.documento === element.DOCUMENTO_VENDEDOR.toString() )) === "undefined" ){
    
valor = false;
 this.$q.notify({
            message: 'Esta Venta tiene los campos mal: ' +'Chasis: ' + element.CHASIS + '-'+'Cliente:' + element.NOMBRE_COMPLETO_CLIENTE ,
            color: 'negative',
            icon: 'warning'
          });	
	 
	}
	
	})	
	return valor;
	},
	 filterFn (val, update) {
	   
        if (val === '') {
		
          update(() => {
            this.optionsVendedores = this.vendedores          
          })
          return
        }
         
        update(() => {
          const needle = val.toLowerCase()
          this.optionsVendedores = this.optionsVendedores.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
        })
      },
	

	 
	  
   },
   mounted(){
    this.loadVendedor(),
    this.loadHoster(),
	this.loadVenta(),
	this.loadMarca(),
	this.loadModelo(),
	this.loadColor()

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
