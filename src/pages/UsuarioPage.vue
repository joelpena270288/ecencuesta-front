<template>
    <q-page

class="q-pa-md"
>
<div class="q-pa-md">
    <q-table
      flat bordered
      title="Usuarios"
      :rows="rows"
      :columns="columns"
      color="primary"
      row-key="name"
	  :filter="filter"
    >


      <template v-slot:body="props">
        <q-tr :props="props" @click="onRowClick(props.row)">
          <q-td key="username" :props="props">

            {{ props.row.username }}


          </q-td>
          <q-td key="name" :props="props">

              {{ props.row.details.name }}

          </q-td>
            <q-td key="status" :props="props">

              {{ props.row.status }}

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
  <q-dialog v-model="newUser" persistent >

      <q-card class="my-card " flat bordered>
        <q-card-section class="horizontal">
          <div class="text-h6">Nuevo Usuario</div>

        </q-card-section>

        <q-separator />


      <q-card-section class="horizontal">
<q-input
    filled
    v-model="usuario.username"
    label="Usuario *"

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un nombre de usuario']"

  />

  </q-card-section>
   <q-card-section class="horizontal">
  <q-input
    filled
    v-model="usuario.name"
    label="Nombre "


  />
</q-card-section>
   <q-card-section class="horizontal">

  <q-input
    filled
    v-model="usuario.lastname"
    label="Apellidos "


  />
</q-card-section>
   <q-card-section class="horizontal">

  <q-input
    filled
    v-model="usuario.email"
    label="Email "


  />
</q-card-section>
   <q-card-section class="horizontal">
  <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Contrasena">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </q-card-section>
   <q-card-section class="horizontal">
        <q-input v-model="repeatPassword" filled :type="isPwdR ? 'password' : 'text'" label="Repetir Contrasena">
        <template v-slot:append>
          <q-icon
            :name="isPwdR ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwdR = !isPwdR"
          />
        </template>
      </q-input>
    </q-card-section>
   <q-card-section class="horizontal">

  <q-select
  filled
  multiple
  label="Selecciona los Roles"
        v-model="selectedRoles"
        :options="roles"
        :option-value="opt => Object(opt) === opt && 'name' in opt ? opt.name : null"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : '- Roles -'"

        emit-value
        map-options
        style="min-width: 250px; max-width: 300px"
      />

</q-card-section>


            <q-separator />
            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='AddUser()'/>
    <q-btn label="Cancelar" icon="cancel" type="reset" color="primary" flat class="q-ml-sm" @click='ClosedNewUser()' />
      </q-card-actions>
      </q-card>

    </q-dialog>
  </div>
</template>

<!-- Editar-->

<template>
  <div class="q-pa-md q-gutter-sm">
 <q-dialog v-model="editUser" persistent >
      <q-card class="my-card " flat bordered>
        <q-card-section>
          <div class="text-h6">Editar Usuario</div>
        </q-card-section>
        <q-separator />

   <q-card-section class="horizontal">

   <q-input
    filled
    v-model="usuario.username"
    label="Usuario *"

    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Debe introducir un nombre de usuario']"

  />
</q-card-section>
   <q-card-section class="horizontal">
  <q-input
    filled
    v-model="usuario.name"
    label="Nombre "


  />
</q-card-section>
   <q-card-section class="horizontal">
  <q-input
    filled
    v-model="usuario.lastname"
    label="Apellidos "


  />
</q-card-section>
   <q-card-section class="horizontal">
  <q-input
    filled
    v-model="usuario.email"
    label="Email "


  />
  </q-card-section>
   <q-card-section class="horizontal">
  <q-input v-model="passwordEdit" filled :type="isPwdE ? 'password' : 'text'" label="Contrasena">
        <template v-slot:append>
          <q-icon
            :name="isPwdE ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwdE = !isPwdE"
          />
        </template>
      </q-input>
    </q-card-section>
   <q-card-section class="horizontal">
        <q-input v-model="repeatPasswordEdit" filled :type="isPwdRE ? 'password' : 'text'" label="Repetir Contrasena">
        <template v-slot:append>
          <q-icon
            :name="isPwdRE ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwdRE = !isPwdRE"
          />
        </template>
      </q-input>
    </q-card-section>
   <q-card-section class="horizontal">
  <q-select
  filled
  multiple
  label="Selecciona los Roles"
        v-model="usuario.roles"
        :options="roles"
        :option-value="opt => Object(opt) === opt && 'name' in opt ? opt.name : null"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : '- Roles -'"

        emit-value
        map-options
        style="min-width: 250px; max-width: 350px"
      />




</q-card-section>

<q-separator />
   <q-card-section class="horizontal">

            <q-card-actions>
    <q-btn label="Enviar" icon="send" type="submit" color="primary" flat class="q-ml-sm" @click='EditUser()'/>
     <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="confirm = true"/>
    <q-btn label="Cerrar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" @click='ClosedEditUser()' />
      </q-card-actions>
      </q-card-section>
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

              <q-fab-action @click="OpenNewUsuario()" color="light-blue" icon="person_add" :disable="draggingFab"  >
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
          <span class="q-ml-sm">Desea desahabilitar el usuario?.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" icon="cancel" type="cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          <q-btn label="Eliminar" icon="delete" type="submit" color="negative" flat class="q-ml-sm" @click="DeleteUser()"/>
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
  name: 'UsuarioPage',

 data(){
  return{
    newUser: false,
    editUser: false,
    password: '',
    repeatPassword: '',
    passwordEdit: '',
    repeatPasswordEdit: '',
  rows: [],

  columns: [
{   label: 'Usuario',
    name: 'username',
    required: true,
    align: 'center',
    field: row => row.username,
    format: val => `${val}`,
    sortable: true
  },
  {
     name: 'name',
    align: 'center',
    label: 'Nombre',
    field: row => row.details.name,
    sortable: true
   },
  {
    name: 'status',
     align: 'center',
    label: 'Estado',
    field: row => row.status,
    sortable: true
   }


],

usuarios: [],
usuario: {
  username: '',
  name: '',
  lastname: '',
  email: '',
  password: '',
  roles: [],
  ideselected: 0,



},
roles: [],



}
 },
   components:{},
   methods: {
    loadusers () {
    api.get('/users/',{
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

  loadroles () {
    api.get('/role/',{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
        this.roles = response.data
      })
     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

  },

  OpenNewUsuario(){
    this.password = '';
    this.usuario.email = '';
    this.usuario.lastname = '';
    this.usuario.name = '';
    this.usuario.roles = [];
    this.usuario.username = '';
    this.newUser = true;

  },
  ClosedNewUser(){
    this.usuario.username = '';
    this.password = '';
    this.usuario.email = '';
    this.usuario.lastname = '';
    this.usuario.name = '';
    this.usuario.roles = [];
    this.newUser = false;

  },
 async AddUser(){

if(this.usuario.username !=='' & this.password!=='' & this.repeatPassword!=='' & this.selectedRoles!=='' ){

  if(this.password !== this.repeatPassword){
    this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Las contrasenas no son iguales',
          icon: 'report_problem'
        });

   }else{

this.usuario.password = this.password;
this.usuario.roles = this.selectedRoles;

await api.post('/users/',this.usuario,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se inserto el usuario ' + response.data.username,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));
      this.newUser = false;
      this.password = '';
 this.loadusers();
   }
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
    this.editUser = true;



  },
async  EditUser(){

   let continuar = false;
    if(this.usuario.username !=='' & this.usuario.roles.length>0  ){
      if(this.passwordEdit !== '' & this.passwordEdit !== this.repeatPasswordEdit ){

        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Las contrasenas no son iguales',
          icon: 'report_problem'
        });


      }else if(this.repeatPasswordEdit !==''& this.passwordEdit===''){
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Debe poner las dos contrasena',
          icon: 'report_problem'
        });
      }

      else{
        continuar = true;
      }
      if(continuar === true){
	  if(this.passwordEdit!==""){
	   this.usuario.password = this.passwordEdit;
	  }



        await api.patch('/users/'+this.idselected,this.usuario,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Modifico el usuario ' + response.data.username,
          icon: 'done'
        })
      })

     .catch(error =>  this.$q.notify({
        type: 'negative',
		 position: 'top',

        message: error.response.data.message
      }));

      this.editUser = false;
      this.usuario.roles = [];
      this.passwordEdit = '';
      this.loadusers();

      }



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
  ClosedEditUser(){
    this.usuario = {};
 this.editUser = false;
  },
 async DeleteUser(){
    await api.delete('/users/'+this.idselected,{
  headers: {
    'Authorization': `Bearer ${authenticate.getUserLogged()}`
    }
  }).then((response) => {
    this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Se Desahabilito el usuario del sistema ' + response.data.username,
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
      this.loadusers();
  },
  onRowClick(row){

    this.usuario.username = row.username;
    this.usuario.name = row.details.name;
    this.usuario.lastname = row.details.lastname;
    this.usuario.email = row.details.email;
   this.usuario.roles = [];
    this.idselected = row.id;

for(let i = 0;i< row.roles.length; i++){
  this.usuario.roles.push(row.roles[i].name );
}
    this.editUser = true;
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
    this.loadusers(),
    this.loadroles()


   },
   setup () {
    return {
      selected: ref([]),
      selectedRoles: ref(null),
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
