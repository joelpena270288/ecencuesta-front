<template>
    <q-page

class="q-pa-md"
>
<div class="q-pa-md">
    <q-table
      flat bordered
      title="Grupos"
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
        

  


<q-td key="color" :props="props">

{{ props.row.color }}


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
  <q-dialog v-model="newGrupo" persistent >

      <q-card class="my-card " flat bordered  style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Nuevo Grupo</div>

        </q-card-section>

        <q-separator />
        <q-card-section class="horizontal">

<q-input
    filled
    v-model="grupo.name"
    label="Nombre *"

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un Grupo']"

  />
   </q-card-section>
  
 <q-card-section>



      <q-select color="primary"
            bg-color="green-2"
            filled v-model="selectedColor"
             :options="options"
            label="Seleccione el Color que identifique al grupo">
        <template v-slot:prepend>
          <q-icon name="palette" />
        </template>
      </q-select>
	  </q-card-section>
	   <q-card-section>
	    <div class="q-gutter-sm justify-center" > 
		   <div class="text-h6">Competencia</div>
      <q-radio v-model="competencia" val = 'si' label="SI" />
      <q-radio v-model="competencia" val= 'no' label="NO" />
     
   </div>
    </q-card-section>
<div v-if="competencia=='si'">	  

<!--Tabla Rangos Encuestas-->
<q-card-section class="horizontal">


 
<q-table
  flat bordered
  title="Rangos Encuesta"
  :rows="rangosEncuestas"
  :columns="columnsEncuestas"
 
  :filter="filter"
  :loading="loading"
>
     <template v-slot:body="props">
    <q-tr :props="props" @click="onRowClickEncuesta(props.row)">
     <q-td key="name" :props="props">

          {{ props.row.name}}

      </q-td>
        <q-td key="min" :props="props">

          {{ props.row.min }}

      </q-td>
   <q-td key="max" :props="props">

          {{ props.row.max }}

      </q-td>
      <q-td key="valor" :props="props">

{{ props.row.valor }}

</q-td>
  
    </q-tr>
  </template>
  <template v-slot:top-right>
    <q-btn color="primary" :disable="loading"  icon="add" @click="addRowEncuesta" />
   
  
  </template>

</q-table>



</q-card-section>

<q-separator />
<!--Tabla Rango-->
<q-card-section class="horizontal">


 
<q-table
  flat bordered
  title="Rangos Descuestos"
  :rows="rangosDescuentos"
  :columns="columnsDescuentos"

>
     <template v-slot:body="props">
    <q-tr :props="props" @click="onRowClickDescuento(props.row)">
     <q-td key="name" :props="props">

          {{ props.row.name}}

      </q-td>
        <q-td key="min" :props="props">

          {{ props.row.min }}

      </q-td>
   <q-td key="max" :props="props">

          {{ props.row.max }}

      </q-td>
      <q-td key="valor" :props="props">

     {{ props.row.valor }}

     </q-td>
  
    </q-tr>
  </template>
  <template v-slot:top-right>
    <q-btn color="primary" :disable="loading"  icon="add" @click="addRowDescuento" />  
  
  </template>

</q-table>



</q-card-section>
<!--Hasta Aqui-->


<q-card-section class="horizontal">


 
<q-table
  flat bordered
  title="Rangos Ventas"
  :rows="rangosVentas"
  :columns="columnsVentas"
 

>
     <template v-slot:body="props">
    <q-tr :props="props" @click="onRowClickVenta(props.row)">
     <q-td key="name" :props="props">

          {{ props.row.name}}

      </q-td>
        <q-td key="min" :props="props">

          {{ props.row.min }}

      </q-td>
   <q-td key="max" :props="props">

          {{ props.row.max }}

      </q-td>
      <q-td key="valor" :props="props">

{{ props.row.valor }}

</q-td>
  
    </q-tr>
  </template>
  <template v-slot:top-right>
    <q-btn color="primary" :disable="loading"  icon="add" @click="addRowVenta" />
   
    
  </template>

</q-table>



</q-card-section>
<!--Hasta Aqui-->
 </div>
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='AddGrupo()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='ClosedNewGrupo()' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>

<!-- Editar-->


<template>
  <div class="q-pa-md q-gutter-sm">
 <q-dialog v-model="editGrupo" persistent >
      <q-card class="my-card " flat bordered  style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Editar Grupo</div>

        </q-card-section>

        <q-separator />
        <q-card-section class="horizontal">

<q-input
    filled
    v-model="grupo.name"
    label="Nombre *"

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un Grupo']"

  />
   </q-card-section>
  
 <q-card-section>



      <q-select color="primary"
            bg-color="green-2"
            filled v-model="selectedColor"
             :options="options"
            label="Seleccione el Color que identifique al grupo">
        <template v-slot:prepend>
          <q-icon name="palette" />
        </template>
      </q-select>
	  </q-card-section>
	    <q-card-section>
	    <div class="q-gutter-sm justify-center" > 
		   <div class="text-h6">Competencia</div>
      <q-radio v-model="competencia" val = 'si' label="SI" />
      <q-radio v-model="competencia" val= 'no' label="NO" />
     
   </div>
    </q-card-section>
<div v-if="competencia=='si'">	  

<!--Tabla Rangos Encuestas-->
<q-card-section class="horizontal">


 
<q-table
  flat bordered
  title="Rangos Encuesta"
  :rows="rangosEncuestas"
  :columns="columnsEncuestas"
 
  :filter="filter"
  :loading="loading"
>
     <template v-slot:body="props">
    <q-tr :props="props" @click="onRowClickEncuesta(props.row)">
     <q-td key="name" :props="props">

          {{ props.row.name}}

      </q-td>
        <q-td key="min" :props="props">

          {{ props.row.min }}

      </q-td>
   <q-td key="max" :props="props">

          {{ props.row.max }}

      </q-td>
      <q-td key="valor" :props="props">

{{ props.row.valor }}

</q-td>
  
    </q-tr>
  </template>
  <template v-slot:top-right>
    <q-btn color="primary" :disable="loading"  icon="add" @click="addRowEncuesta" />
   
  
  </template>

</q-table>



</q-card-section>

<q-separator />
<!--Tabla Rango-->
<q-card-section class="horizontal">


 
<q-table
  flat bordered
  title="Rangos Descuestos"
  :rows="rangosDescuentos"
  :columns="columnsDescuentos"

>
     <template v-slot:body="props">
    <q-tr :props="props" @click="onRowClickDescuento(props.row)">
     <q-td key="name" :props="props">

          {{ props.row.name}}

      </q-td>
        <q-td key="min" :props="props">

          {{ props.row.min }}

      </q-td>
   <q-td key="max" :props="props">

          {{ props.row.max }}

      </q-td>
      <q-td key="valor" :props="props">

     {{ props.row.valor }}

     </q-td>
  
    </q-tr>
  </template>
  <template v-slot:top-right>
    <q-btn color="primary" :disable="loading"  icon="add" @click="addRowDescuento" />  
  
  </template>

</q-table>



</q-card-section>
<!--Hasta Aqui-->


<q-card-section class="horizontal">


 
<q-table
  flat bordered
  title="Rangos Ventas"
  :rows="rangosVentas"
  :columns="columnsVentas"
 

>
     <template v-slot:body="props">
    <q-tr :props="props" @click="onRowClickVenta(props.row)">
     <q-td key="name" :props="props">

          {{ props.row.name}}

      </q-td>
        <q-td key="min" :props="props">

          {{ props.row.min }}

      </q-td>
   <q-td key="max" :props="props">

          {{ props.row.max }}

      </q-td>
      <q-td key="valor" :props="props">

{{ props.row.valor }}

</q-td>
  
    </q-tr>
  </template>
  <template v-slot:top-right>
    <q-btn color="primary" :disable="loading"  icon="add" @click="addRowVenta" />
   
    
  </template>

</q-table>



</q-card-section>
<!--Hasta Aqui-->
 </div>
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='EditGrupo()'/>
	<q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="confirm = true"/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='ClosedEditGrupo()' />
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

              <q-fab-action @click="OpenNewGrupo()" color="light-blue" icon="add_box" :disable="draggingFab" >
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
          <span class="q-ml-sm">Desea eliminar el Grupo?.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="DeleteGrupo()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>
<!--Eliminar Rango-->

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="confirmDeleteRango" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="priority_high" color="primary" text-color="white" />
          <span class="q-ml-sm">Desea eliminar el Rango?.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="DeleteRango()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>
<!--Hasta Aqui-->

<!--Adicionar Rango-->

<template>
  <div class="q-pa-md q-gutter-sm">
  <q-dialog v-model="newRango" persistent >

      <q-card class="my-card" flat bordered  style="width: 300px; max-width: 80vw;">
         <q-card-section class="horizontal">
          <div  class="text-h6">Adicionar Rango</div>
		  

        </q-card-section>

        <q-separator />
      
   
        <q-card-section class="horizontal">


<q-input
 filled
 v-model="rango.name"
 label="Descripcion *"

 lazy-rules
 :rules="[ val => val && val.length > 0 || 'Debe introducir una Descripcion']"

/>
</q-card-section>
   <q-card-section class="horizontal">
 
<q-input
      v-model.number="rango.min"
      type="number"
      filled
      label = "Min"
      style="max-width: 300px"
    />
    
    </q-card-section>
    <q-card-section class="horizontal">
 
 <q-input
       v-model.number="rango.max"
       type="number"
       filled
       label = "Max"
       style="max-width: 300px"
     />
     
     
     </q-card-section>
     <q-card-section class="horizontal">
 
 <q-input
       v-model.number="rango.valor"
       type="number"
       filled
       label = "Valor"
       style="max-width: 300px"
     />
     
     
     </q-card-section>
   
   
	
 <q-separator />
    
<!--Hasta Aqui -->	
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='AddRango()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click="newRango = false" />

	

      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>

<!--Hasta Aqui-->

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
  name: 'GrupoPage',

 data(){
  return{
  competencia: 'no',
  selectedColor: 'red',
   options: ['red', 'pink', 'purple','blue','indigo','cyan','teal','green','lime','yellow','amber','orange','brown','grey'],
    newGrupo: false,
    editGrupo: false,
    rangosEncuestas: [],
    rangosDescuentos: [],
    rangosVentas: [],
	confirmDeleteRango: false,
	kpis: [],


  rows: [],

  columns: [
{   label: 'Nombre del Grupo',
    name: 'name',
    required: true,
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  
  
   {   label: 'Color del grupo',
    name: 'color',
    required: true,
    align: 'left',
    field: row => row.color,
    format: val => `${val}`,
    sortable: true
  },
   {   label: 'Competencia',
    name: 'competencia',
    required: true,
    align: 'left',
    field: row => row.competencia,
    format: val => `${val}`,
    sortable: true
  },
  
],


columnsEncuestas: [
{   label: 'Descripcion',
  name: 'name',
  required: true,
  align: 'left',
  field: row => row.name,
  format: val => `${val}`,
  sortable: true
},
{   label: 'Minimo Valor',
  name: 'min',
  required: true,
  align: 'left',
  field: row => row.min,
  format: val => `${val}`,
  sortable: true
},
{   label: 'Maximo Valor',
  name: 'max',
  required: true,
  align: 'left',
  field: row => row.max,
  format: val => `${val}`,
  sortable: true
},
{   label: 'Valor',
  name: 'valor',
  required: true,
  align: 'left',
  field: row => row.valor,
  format: val => `${val}`,
  sortable: true
}

],
columnsDescuentos: [
 {   label: 'Descripcion',
  name: 'name',
  required: true,
  align: 'left',
  field: row => row.name,
  format: val => `${val}`,
  sortable: true
},
{   label: 'Minimo Valor',
  name: 'min',
  required: true,
  align: 'left',
  field: row => row.min,
  format: val => `${val}`,
  sortable: true
},
{   label: 'Maximo Valor',
  name: 'max',
  required: true,
  align: 'left',
  field: row => row.max,
  format: val => `${val}`,
  sortable: true
},
{   label: 'Valor',
  name: 'valor',
  required: true,
  align: 'left',
  field: row => row.valor,
  format: val => `${val}`,
  sortable: true
}

],
columnsVentas: [
{   label: 'Descripcion',
  name: 'name',
  required: true,
  align: 'left',
  field: row => row.name,
  format: val => `${val}`,
  sortable: true
},
{   label: 'Minimo Valor',
  name: 'min',
  required: true,
  align: 'left',
  field: row => row.min,
  format: val => `${val}`,
  sortable: true
},
{   label: 'Maximo Valor',
  name: 'max',
  required: true,
  align: 'left',
  field: row => row.max,
  format: val => `${val}`,
  sortable: true
},
{   label: 'Valor',
  name: 'valor',
  required: true,
  align: 'left',
  field: row => row.valor,
  format: val => `${val}`,
  sortable: true
}

],


grupos: [],
grupo: {
  name: '',
  rangosDescuestos: [],
  rangosEncuestas: [],
  rangosVentas: [],
 
  color: 'red',
  competencia: false
 

},
rango: {name: '', min: 0, max: 0, valor: 0},
newRango: false,
 ideselected: 0,
 selectedTable: 0,
 selectedRango: ''
}
 },
   components:{},
   methods: {
  async loadGrupo() {
   await api.get('/grupo/',{
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

  
  OpenNewGrupo(){

    this.grupo.name = '';
	this.rangosEncuestas = [];
    this.rangosDescuentos = [];
    this.rangosVentas = [];
	this.competencia = 'no';
	this.selectedColor = 'red';
    this.newGrupo = true;
	

  },
  addRowEncuesta(){
    this.rango.name = "";
   this.rango.min = 0;
   this.rango.max = 0;
   this.rango.valor = 0;
    this.selectedTable = 1;
 this.newRango = true;

  },
  addRowDescuento(){
    this.rango.name = "";
   this.rango.min = 0;
   this.rango.max = 0;
   this.rango.valor = 0;
  this.selectedTable = 2;
 this.newRango = true;
  },
  addRowVenta(){
    this.rango.name = "";
   this.rango.min = 0;
   this.rango.max = 0;
   this.rango.valor = 0;
  this.selectedTable = 3;
 this.newRango = true;
  },

  ClosedNewGrupo(){
    this.grupo.name = '';   
    this.newGrupo = false;
  },
 async AddGrupo(){
if(this.grupo.name !=='' ){
this.grupo.rangosDescuestos = this.rangosDescuentos;
this.grupo.rangosEncuestas = this.rangosEncuestas;
this.grupo.rangosVentas = this.rangosVentas;
this.grupo.color = this.selectedColor;
if(this.competencia==='si'){
this.grupo.competencia = true;
}else{
this.grupo.competencia = false;
}
await api.post('/grupo/',this.grupo,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se inserto el grupo ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.newGrupo = false;
      
 this.loadGrupo();
 this.rangosDescuentos= [];
this.rangosEncuestas = [];
 this.rangosVentas = [];
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
    this.editGrupo = true;



  },
async  EditGrupo(){
this.grupo.rangosDescuestos = this.rangosDescuentos;
this.grupo.rangosEncuestas = this.rangosEncuestas;
this.grupo.rangosVentas = this.rangosVentas;
this.grupo.color = this.selectedColor;
if(this.competencia==='si'){
this.grupo.competencia = true;
}else{
this.grupo.competencia = false;
}
    if(this.grupo.name !==''){

        await api.patch('/grupo/'+this.idselected,this.grupo,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Modifico el Grupo ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

      this.editGrupo = false;

      this.loadGrupo();
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
  ClosedEditGrupo(){
    this.grupo = {};
 this.editGrupo = false;
  },
 async DeleteGrupo(){
    await api.delete('/grupo/'+this.idselected,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Elimino el Grupo ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.confirm = false;
      this.editGrupo = false;
      this.loadGrupo();
  },
  onRowClick(row){


    this.grupo.name = row.name;
    this.selectedColor = row.color;
	this.rangosEncuestas = row.rangoEncuesta;
    this.rangosDescuentos = row.rangoDescueto;
    this.rangosVentas = row.rangoVenta;
	if(row.competencia === true){
	this.competencia = 'si';
	}else{
	this.competencia = 'no';
	}

    this.idselected = row.id;

    this.editGrupo = true;
  },
  AddRango(){
    if(this.rango.name !==""){
	
	
      switch (this.selectedTable) {
      case 1:
	  if( this.rangosEncuestas.find(x=>x.name.toUpperCase() === this.rango.name.toUpperCase())){
	    this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: 'El rango ya esta registrado '
      })
	  }else{
	   this.rangosEncuestas.push({name:this.rango.name,min: this.rango.min, max: this.rango.max, valor: this.rango.valor});
	  }
     
        break;
      case 2:
	   if( this.rangosDescuentos.find(x=>x.name.toUpperCase() === this.rango.name.toUpperCase())){
	    this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: 'El rango ya esta registrado '
      })
	  }else{
	   this.rangosDescuentos.push({name:this.rango.name,min: this.rango.min, max: this.rango.max, valor: this.rango.valor});
	  }
     
        break;  
        case 3:
		 if( this.rangosVentas.find(x=>x.name.toUpperCase() === this.rango.name.toUpperCase())){
	    this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: 'El rango ya esta registrado '
      })
	  }else{
	   this.rangosVentas.push({name:this.rango.name,min: this.rango.min, max: this.rango.max, valor: this.rango.valor});
	  }
       
        break;  
    
     
		
    }
	 this.newRango = false;
    }else{

      this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: 'Debe poner una descripcion '
      })
    }

   
  },
  onRowClickEncuesta(row){
  this.selectedTable = 1;
  this.selectedRango = row.name; 
  this.confirmDeleteRango = true;
  
  },
   onRowClickDescuento(row){
  this.selectedTable = 2;
  this.selectedRango = row.name; 
  this.confirmDeleteRango = true;
  
  },
 onRowClickVenta(row){
  this.selectedTable = 3;
  this.selectedRango = row.name; 
  this.confirmDeleteRango = true;
  
  },
  
  
  DeleteRango(){
  
    switch (this.selectedTable) {
	
      case 1:
      this.rangosEncuestas.forEach( (item, index) => {
     if(item.name ===   this.selectedRango){
	
	 this.rangosEncuestas.splice(index,1);
	 } 
   })
        break;
      case 2:
      this.rangosDescuentos.forEach( (item, index) => {
     if(item.name ===   this.selectedRango){
	
	 this.rangosDescuentos.splice(index,1);
	 } 
   })
        break;  
        case 3:
        this.rangosVentas.forEach( (item, index) => {
     if(item.name ===   this.selectedRango){
	
	 this.rangosVentas.splice(index,1);
	 } 
   })
        break;  
    
     
    }
	this.confirmDeleteRango = false;
  
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
          'Listado_Grupos.csv',
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
    this.loadGrupo()
	

   },
   setup () {
    return {

      confirm: ref(false),
      filter: ref('')

    }


  }
}
</script>
