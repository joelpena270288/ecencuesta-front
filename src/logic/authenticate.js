
import { axios,api} from 'boot/axios'
import Cookies from 'js-cookie';

//const ENDPOINT_PATH = "http://ec2-18-118-101-31.us-east-2.compute.amazonaws.com/api/auth/";
const ENDPOINT_PATH = 'auth/';
export default {
  setUserLogged(userLogged) {

    Cookies.set('userLogged', userLogged);
  },
  getUserLogged() {
    return Cookies.get('userLogged');
  },
  register(username, password) {
    const user = { username, password };
    return axios.post(ENDPOINT_PATH + 'regiser', user);
  },
  login(username, password) {  
    const user = { username, password };
   return api.post(ENDPOINT_PATH + 'login', user);
   //return api.get('users');
  },
  deleteUserLogged() {
  Cookies.remove('userLogged');
}
};
