<template>
    <q-page

class="q-pa-md"
>
<div class="q-pa-md">
    <q-table
      flat bordered
      title="Encuestas"
      :rows="rows"
      :columns="columns"
      color="primary"
      row-key="name"
	  :filter="filter"
    >
     

      <template v-slot:body="props">
        <q-tr :props="props" @click="onRowClickEncuesta(props.row)">
         <q-td key="name" :props="props">

              {{ props.row.name}}

          </q-td>
            <q-td key="valor" :props="props">

              {{ props.row.valor }}

          </q-td>
		   <q-td key="status" :props="props">

              {{ props.row.status }}

          </q-td>
		  <q-td key="cant" :props="props">

              {{ Cantidad( props.row.id) }}

          </q-td>
		  
		   <q-td key="valorpreguntas" :props="props">

              {{ TotalPregunta( props.row.id) }}

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




<div class="q-pa-md">
<q-page-sticky position="bottom-center" :offset="[18, 18]">
            <q-fab
              icon="keyboard_arrow_right"
              direction="right"
              color="primary"
              :disable="draggingFab"
              v-touch-pan.prevent.mouse="moveFab"
            >
           

              <q-fab-action @click="OpenNewEncuesta()" color="light-blue" icon="post_add" :disable="draggingFab"  >
              <q-tooltip>
         Nuevo
        </q-tooltip>
		 </q-fab-action>
            </q-fab>
          </q-page-sticky>
		  
		</div>  
		  
<!--Agregar Encuesta-->

<template>
  <div class="q-pa-md q-gutter-sm">
  <q-dialog v-model="newEncuesta" persistent >

      <q-card class="my-card" flat bordered  style="width: 700px; max-width: 80vw;">
         <q-card-section class="horizontal">
          <div v-if="idselected==''" class="text-h6">Nueva Encuesta</div>
		    <div v-if="idselected!=''" class="text-h6">Editar Encuesta</div>

        </q-card-section>

        <q-separator />
      
    <q-card-section class="horizontal">


<q-input
    filled
    v-model="encuesta.name"
    label="Nombre *"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un nombre ']"

  />
   </q-card-section>
  
   <q-card-section class="horizontal">
 
<q-input
      v-model.number="encuesta.valor"
      type="number"
      filled
      style="max-width: 700px"
	  label="Valor de la Encuesta"
    />
    </q-card-section>
	
<!--Listado de preguntas -->
 <q-card-section class="horizontal">


 
    <q-table
      flat bordered
      title="Preguntas"
      :rows="preguntas"
      :columns="columnPreguntas"
     
      :filter="filter"
      :loading="loading"
    >
         <template v-slot:body="props">
        <q-tr :props="props" @click="onRowClickPregunta(props.row)">
         <q-td key="text" :props="props">

              {{ props.row.text}}

          </q-td>
            <q-td key="valor" :props="props">

              {{ props.row.valor }}

          </q-td>
		   <q-td key="respuesta" :props="props">

              {{ props.row.respuesta }}

          </q-td>
		  
        </q-tr>
      </template>
      <template v-slot:top>
        <q-btn color="primary" :disable="loading" label="Adicionar Pregunta" @click="addRow" />
       
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>



 </q-card-section>
<!--Hasta Aqui -->	
            <q-separator />
            <q-card-actions>
		
    <q-btn label="Salvar" icon="save" type="submit" color="primary" flat class="q-ml-sm" @click='Enviar()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='ClosedNewEncuesta()' />
	 <q-btn  v-if="idselected !=''" label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="confirm = true"/>
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>
<!--Hasta Aqui -->		  



  
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="priority_high" color="primary" text-color="white" />
          <span class="q-ml-sm">Desea desahabilitar la Encuesta?.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="DeleteEncuesta()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="confirmpregunta" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="priority_high" color="primary" text-color="white" />
          <span class="q-ml-sm">Desea desahabilitar la Pregunta?.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="DeletePregunta()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<!--Adicionar Preguntas-->



<template>
  <div class="q-pa-md q-gutter-sm">
  <q-dialog v-model="newPregunta" persistent >

      <q-card class="my-card" flat bordered  style="width: 700px; max-width: 80vw;">
         <q-card-section class="horizontal">
          <div v-if="selectedpregunta == ''" class="text-h6">Nueva Pregunta</div>
		   <div v-if="selectedpregunta != ''" class="text-h6">Editar Pregunta</div>

        </q-card-section>

        <q-separator />
      
    <q-card-section class="horizontal">


<q-input
  type="textarea"
    filled
	
    v-model="text"
    label="Enunciado *"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un Texto ']"
    
  />
   </q-card-section>
  
   <q-card-section class="horizontal">
 
<q-input
      v-model.number="valor"
      type="number"
      filled
      style="max-width: 700px"
	  label="Valor de la pregunta"
    />
    </q-card-section>
	
 <q-separator />
      <q-card-section>
	   <div class="text-h6">Respuesta:</div>
        <div class="q-gutter-sm">
      <q-radio v-model="shape" val="v" label="Si" />
      <q-radio v-model="shape" val="f" label="No"  />
     

    </div>
      </q-card-section>
<!--Hasta Aqui -->	
            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='AddPregunta()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='ClosedNewPregunta()' />
	 <q-btn  v-if="selectedpregunta !=''" label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="confirmpregunta = true"/>
	

      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>

<!--Hasta Aqui -->


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
  name: 'EncuestaPage',

 data(){
  return{
   selectedpregunta: '',
   confirmpregunta: false,
    shape: 'v',
    newUser: false,
    editUser: false,
    password: '',
    repeatPassword: '',
    passwordEdit: '',
    repeatPasswordEdit: '',
	newPregunta: false,
  rows: [],
loading: false,
  columns: [

  {
     name: 'name',
    align: 'center',
    label: 'Nombre',
    field: row => row.name,
    sortable: true
   },
    {
     name: 'valor',
    align: 'center',
    label: 'Valor Encuesta',
    field: row => row.valor,
    sortable: true
   },
  {
    name: 'status',
     align: 'center',
    label: 'Estado',
    field: row => row.status,
    sortable: true
   },
    {
    name: 'cant',
     align: 'center',
    label: 'Cantidad Preguntas',
    field: row => Cantidad( row.id),
    sortable: true
   },  {
    name: 'valorpreguntas',
     align: 'center',
    label: 'Valor de las Preguntas',
    field: row => TotalPregunta( row.id),
    sortable: true
   }
    

],
columnPreguntas: [

 {
     name: 'text',
    align: 'left',
    label: 'Nombre',
    field: row => row.text,
    sortable: true
   },
    {
     name: 'valor',
    align: 'center',
    label: 'Valor',
    field: row => row.valor,
    sortable: true
   },

 {
     name: 'respuesta',
    align: 'center',
    label: 'Respuesta',
    field: row => row.respuesta,
    sortable: true
   },
],

preguntas: [],
newEncuesta: false,
text: '', 
valor: 0,
encuesta: { 
  name: '',
  valor: 0,
  preguntas: []  
},

 idselected: ''

}
 },
   components:{},
   methods: {
   async loadencuesta() {
   await api.get('/encuesta/',{
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

AddPregunta(){


if(this.text!='' & parseInt(this.valor)>0){
let res = true;
if(this.shape ==='f'){
res = false;
}

if(this.selectedpregunta!=""){
let pregunta = this.preguntas.find(x=>
x.text == this.selectedpregunta);
pregunta.text = this.text;
pregunta.valor = this.valor;
pregunta.respuesta = res;

}else{
if( this.preguntas.find(x=>
x.text.toUpperCase() == this.text.toUpperCase())){

 this.$q.notify({
        type: 'negative',
		 position: 'top',
		 
        message: "Ya existe la pregunta"
      });




}else{
const pregunta = {text: this.text, valor: this.valor,respuesta: res };
this.preguntas.push(pregunta);
}


}
this.selectedpregunta = "";
this.ClosedNewPregunta();
}
 else{
 this.$q.notify({
        type: 'negative',
		 position: 'top',
		 
        message: "Debe introducir todos los datos"
      });
 }

},
DeletePregunta(){
this.preguntas.forEach((x,index)=>
{
if(x.text === this.selectedpregunta ){
this.preguntas.splice(index,1);
}

});
this.selectedpregunta = "";
this.confirmpregunta = false;
this.ClosedNewPregunta();

},


  OpenNewEncuesta(){  
	this.newEncuesta = true;
   	
	
  },
  ClosedNewEncuesta(){
    this.encuesta.name = '';
    this.encuesta.valor = 0;
	this.preguntas = [];
    this.newEncuesta = false;
    this.idselected = "";
     this.shape = 'v';
  },
   ClosedNewPregunta(){
    this.text = '';
    this.valor = 0;
	this.shape = 'v';
	this.selectedpregunta = "";
   this.newPregunta = false;

  },
  
  Enviar(){
 
  if(this.idselected!==""){
  
  this.EditEncuesta();
  }
  else{
  this.AddEncuesta();
  }
  },
 async AddEncuesta(){


  if(this.encuesta.name !=="" ){

 
this.encuesta.preguntas = this.preguntas;

await api.post('/encuesta/',this.encuesta,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se inserto la encuesta  ' + response.data.name,
          icon: 'done'
        });
		this.rows.push(response.data);
		 this.ClosedNewEncuesta();
		
      }
	  
	  )

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',
		 
        message: error.response.data.message
      }));
      this.newUser = false;
      this.password = '';


}else{
  this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Llene los capos requeridos',
          icon: 'report_problem'
        });

}

  },
  
  
  async EditEncuesta(){


  if(this.encuesta.name !=="" ){
 
this.encuesta.preguntas = this.preguntas;
await api.patch('/encuesta/' + this.idselected,this.encuesta,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se edito la Encuesta  ' + response.data.name,
          icon: 'done'
        });
		 this.idselected = "";
		 this.ClosedNewEncuesta();
		 this.loadencuesta();
		
		
      }
	  
	  )

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',
		 
        message: error.response.data.message
      }));
    
 

}else{
  this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Llene los capos requeridos',
          icon: 'report_problem'
        });

}

  },
  
  
  OpenEdit(){
    this.editEncuesta = true;



  },
  Cantidad(id){
 
  return  this.rows.find(x=> x.id === id).preguntas.length;
  },
  TotalPregunta(id){
  let total = 0;
  this.rows.find(x=> x.id === id).preguntas.forEach(element=>{
  total+= element.valor;
  
  
  })
  
  return total;
  },
  addRow(){
 this.newPregunta = true;

  },

  ClosedEditEncuesta(){
    this.encuesta = {};
 this.editUser = false;
  },
 async DeleteEncuesta(){
    await api.delete('/encuesta/'+this.idselected,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Desahabilito la Encuesta del sistema ' + response.data.name,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',
		 
        message: error.response.data.message
      }));
      this.confirm = false;
      this.editUser = false;
      this.loadencuesta();
  },
  onRowClickEncuesta(row){
 
    this.encuesta.name = row.name;
    this.encuesta.valor = row.valor;   
    this.idselected = row.id;
	this.preguntas = row.preguntas;
	
   this.newEncuesta = true;
  },
onRowClickPregunta(row){
if(row.respuesta){
 this.shape = 'v';
}else{
this.shape = 'f';
}
 this.text = row.text;
 this.valor = row.valor;
 this.selectedpregunta = row.text;
this.newPregunta = true;
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
          'table-export.csv',
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
    this.loadencuesta()
   

   },
   setup () {
    return {
      selected: ref([]),

      isPwd: ref(true),
     isPwdR: ref(true),
     isPwdE: ref(true),
     isPwdRE: ref(true),
     confirm: ref(false),
	  filter: ref('')



    }


  }
}
</script>
