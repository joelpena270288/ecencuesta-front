<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="indigo text-white">
      <q-toolbar>


        <q-toolbar-title>

            <q-avatar>
            <img src="../icons/Logo.jpg">

          </q-avatar>
        JOYOS
        </q-toolbar-title>

       <q-btn stretch flat label="Salir" @click="Logout()"/>
        <q-icon name="logout"></q-icon>

      </q-toolbar>

    </q-header>


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

export default {

  methods: {
Logout(){
 authenticate.deleteUserLogged();
      this.$router.push('/');
}
  },

};
</script>
