import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
//http://ec2-18-191-82-31.us-east-2.compute.amazonaws.com/
//local
//const api = axios.create({ baseURL: 'http://192.168.17.230/api' })
//const api = axios.create({ baseURL: 'http://localhost/api' })
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//produccion
//const api = axios.create({ baseURL: 'http://ec2-15-156-87-25.ca-central-1.compute.amazonaws.com/api' })
//prueba
//const api = axios.create({ baseURL: 'http://ec2-18-219-127-35.us-east-2.compute.amazonaws.com/api' })
//Local
//const api = axios.create({ baseURL: 'http://192.168.100.102:3000/api' })
const api = axios.create({ baseURL: 'http://ec2-3-144-176-173.us-east-2.compute.amazonaws.com/api' })
//const api = axios.create({ baseURL: 'api' })
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { axios, api }

