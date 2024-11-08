import { boot } from 'quasar/wrappers';
import { PDFPlugin } from 'vue3-pdfmake';



export default boot(({ app }) => {
  app.use(PDFPlugin);
});
