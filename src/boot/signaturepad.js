import { boot } from 'quasar/wrappers';
import SignaturePad from 'vue-signature-pad';



export default boot(({ app }) => {
  app.use(SignaturePad);
});
