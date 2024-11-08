
<template>
  <q-page

    class="window-height window-width row justify-center items-center"
  >


    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:500px;">
          <q-card-section class="bg-primary" style="width:300px;height:90px;">
            <h4 class="text-h5 text-white q-my-md">Entrar </h4>

          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl"  @submit.prevent="login">
			 <q-card-section>
              <q-input square clearable v-model="username" type="email" filled label="Usuario">
                <template v-slot:append>
                  <q-icon name="person" />
                </template>
              </q-input>
			    </q-card-section>
              <q-card-section>
			   <q-input square clearable v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Contrasena">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
		 
        </template>
		
      </q-input>
	    </q-card-section>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="blue-4" class="full-width text-white" label="Enviar" @click ="login()" />
          </q-card-actions>
         
        </q-card>
      </div>
    </div>
  </q-page>
</template>


<script>

import authenticate from "../logic/authenticate"
import JWT from 'jwt-client'
import { ref } from 'vue';
export default {
  name: 'LoginPage',
  methods: {


  async login(){
    try {
    const token = await authenticate.login(this.username, this.password);
  
    if(token){
     authenticate.deleteUserLogged();
	
    let session = JWT.read(token.data.token);    
    let admin = false;
	let hoster = false;
	let vendedor = false;
    session.claim.roles
	
    authenticate.setUserLogged(token.data.token);
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
		if(vendedor){
		 this.$router.push("/DashboardVendedor");
		}
		
		

    }
  
    }
      

    
  }
   catch (error) {   
   
   
    this.$q.notify({
        type: 'negative',
        message: 'username or password wrong'
      })
  
  }
} 
},

  data () {
    return {
      email: '',
      username: '',
      password: '',

    }
  },
   setup () {
    return {
     
      isPwd: ref(true)




    }


  }
}

</script>

<style scoped>
.dark{
  background: #1817309a;
}
</style>
