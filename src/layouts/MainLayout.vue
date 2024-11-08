
<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="indigo text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>

            <q-avatar @click="IrDashboard">
            <img src="../icons/Logo.jpg">

          </q-avatar>
        JOYOS
        </q-toolbar-title>

        <q-btn stretch flat label="Salir" @click="Login()"/>
        <q-icon name="logout"></q-icon>

      </q-toolbar>

    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered >

      <q-list bordered class="rounded-borders">
      <q-expansion-item :content-inset-level="0.5"
        expand-separator
        icon="attach_money"
        
        label="Produccion"

        default-closed
      >
      <q-item clickable v-ripple @click = 'IrVenta()'  :active="link === 'ventas'"  active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon color="light-blue" name="monetization_on" />
        </q-item-section>

        <q-item-section>Ventas</q-item-section>
      </q-item>
      <q-item clickable v-ripple  @click = 'IrEncuesta()'  :active="link === 'encuestas'"  active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon color="light-blue" name="post_add" />
        </q-item-section>

        <q-item-section>Encuesta</q-item-section>
      </q-item>


      </q-expansion-item>




      <q-expansion-item :content-inset-level="0.5" expand-separator icon="admin_panel_settings" label="Administracion" default-closed>
        <q-item clickable v-ripple @click = 'IrUsuarios()'  :active="link === 'usuarios'"  active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon color="light-blue" name="person" />
        </q-item-section>

        <q-item-section>Usuarios</q-item-section>
      </q-item>
      <q-item clickable v-ripple  @click = 'IrVendedor()'  :active="link === 'vendedores'"  active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon color="light-blue" name="folder_shared" />
        </q-item-section>

        <q-item-section>Vendedores</q-item-section>
      </q-item>
	<q-item clickable v-ripple  @click = 'IrGrupo()'  :active="link === 'grupos'"  active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon color="light-blue" name="group" />
        </q-item-section>

        <q-item-section>Grupos</q-item-section>
      </q-item>

      <q-item clickable v-ripple  @click = 'IrColor()'  :active="link === 'colores'"  active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon color="light-blue" name="palette" />
        </q-item-section>

        <q-item-section>Colores</q-item-section>
      </q-item>
      <q-item clickable v-ripple  @click = 'IrMarca()'  :active="link === 'marcas'"  active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon color="light-blue" name="directions_car" />
        </q-item-section>

        <q-item-section>Marcas</q-item-section>
      </q-item>
      <q-item clickable v-ripple  @click = 'IrModelo()'  :active="link === 'modelos'"  active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon color="light-blue" name="add_box" />
        </q-item-section>

        <q-item-section>Modelos</q-item-section>
      </q-item>
	   <q-item clickable v-ripple  @click = 'IrKpi()'  :active="link === 'kpis'"  active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon color="light-blue" name="library_add_check" />
        </q-item-section>

        <q-item-section>Kpi</q-item-section>
      </q-item>


      </q-expansion-item>
      <q-expansion-item :content-inset-level="0.5" expand-separator icon="report" label="Reportes" default-closed>

	   <q-item clickable v-ripple  @click = 'IrReporteVendecorKpi()'  :active="link === 'vendedoreskpis'"  active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon color="light-blue" name="today" />
        </q-item-section>

        <q-item-section>Reporte KPI Vendedores</q-item-section>
      </q-item>
   
 <q-item clickable v-ripple  @click = 'IrReporteVenta()'  :active="link === 'reporteVenta'"  active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon color="light-blue" name="today" />
        </q-item-section>

        <q-item-section>Reporte Ventas</q-item-section>
      </q-item>
 <q-item clickable v-ripple  @click = 'IrReporteEncuesta()'  :active="link === 'reporteEncuesta'"  active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon color="light-blue" name="today" />
        </q-item-section>

        <q-item-section>Reporte Encuesta</q-item-section>
      </q-item>

      </q-expansion-item>


    </q-list>

    </q-drawer>

    <q-page-container class="dark">
      <router-view />
    </q-page-container>
    <q-footer reveal elevated class="light-blue-1 text-black">
      <q-toolbar>

        <q-item-label > @Copyright 2024 JOYOS desarrollado por Joel Peña González</q-item-label>



      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import authenticate from '../logic/authenticate';
import JWT from 'jwt-client'
export default {

  methods: {
    userLogged() {
      return JWT.read( authenticate.getUserLogged()).claim.username;
    },
    Login () {
      authenticate.deleteUserLogged();
      this.$router.push('/');
    },

    IrUsuarios() {
	this.link = 'usuarios';
      this.$router.push('/usuarios');
    },
   IrVentas(){
   this.link = 'ventas';
      this.$router.push('/ventas');
   },
   IrGrupo(){
    this.link = 'grupos';
      this.$router.push('/grupos');
   },
   IrVendedor(){
   this.link = 'vendedores';
      this.$router.push('/vendedores');
   },
   IrEncuesta(){
    this.link = 'encuestas';
      this.$router.push('/encuestas');
   },

    IrVenta(){
    this.link = 'ventas';
      this.$router.push('/ventas');
   },
     IrReporteVenta(){
    this.link = 'reporteVenta';
      this.$router.push('/reporteVentas');
   },
        IrReporteEncuesta(){
    this.link = 'reporteEncuesta';
      this.$router.push('/reporteEncuestas');
   },

IrDashboard(){
 const token =  authenticate.getUserLogged();
  let session = JWT.read(token); 
   let admin = false;
	let hoster = false;
	let vendedor = false;
   
    for(let i =0; i < session.claim.roles.length; i++){
       
        switch (session.claim.roles[i]){
		case 'admin': 
		admin = true;
		break;
		case 'hoster':
		hoster = true;
		break;
		case 'vendedor':
		vendedor = true;
		break;
		
		}
		if(hoster){
		 this.$router.push("/DashboardHoster");
		}
		if(admin){
		  this.$router.push("/DashboardAdministracion");
		}
		
		

    }

 this.link = '';

},
IrColor(){
  this.link = 'colores';
  this.$router.push('/colores');
 },
 IrMarca(){
  this.link = 'marcas';
  this.$router.push('/marcas');
 },
  IrModelo(){
  this.link = 'modelos';
  this.$router.push('/modelos');
 },
IrKpi(){
this.link = 'kpis';
  this.$router.push('/kpis');
},
IrReporteVendecorKpi(){
this.link = "vendedoreskpis";
 this.$router.push('/reportekpi');
}
  },

  setup() {

    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
	   link: ref(''),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
<style lang="sass">
.my-menu-link
  color: white
  background: #BBE9FF
</style>
