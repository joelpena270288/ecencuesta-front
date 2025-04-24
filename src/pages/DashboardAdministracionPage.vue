<template>
  <q-page class="q-pa-md">
    <q-select
      color="primary"
      bg-color="blue-2"
      v-model="selectedYear"
      :options="years"
      label="Seleccionar"
      placeholder="Seleccionar"
      @update:modelValue="handleModelValueUpdate"
      @focus="handleFocus"
      @blur="handleBlur"
      @filter="handleFilter"
      @remove="handleRemove"
    >
      <template v-slot:prepend> <q-icon name="calendar_month" /> </template
    ></q-select>
    <div class="q-pa-md flat bordered">
      <Bar :data="chartData" :options="chartOptions" ref="bar" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { api } from 'boot/axios';
import { Notify } from 'quasar';
import JWT from 'jwt-client';
import authenticate from '../logic/authenticate';
import moment from 'moment';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default {
  name: 'DashboardAdministracionPage',
  components: {
    Bar,
  },
  data() {
    return {
      years: Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i),
      selectedYear:  new Date().getFullYear(),

      ventas: ([] = []),
      dataset: {
        labels: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        datasets: [
          {
            label: 'Ventas por Meses ',
            backgroundColor: '#f87979',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    handleModelValueUpdate(value) {
      this.loadVenta();
    },
    handleFocus() {
      //console.log('QSelect tiene el foco');
    },
    handleBlur() {
      console.log('QSelect perdió el foco');
    },
    handleFilter(val, update) {
      //console.log('Evento de filtrado:', val); // Aquí puedes actualizar las opciones filtradas si es necesario
      update(() => {
        // Lógica para actualizar opciones filtradas
      });
    },
    handleRemove(value) {
      //console.log('Opción eliminada:', value);
    },
    async loadVenta() {
      await api
        .get('/venta/all/actual/' + this.selectedYear, {
          headers: {
            Authorization: `Bearer ${authenticate.getUserLogged()}`,
          },
        })
        .then((response) => {
          this.ventas = response.data;
        })
        .catch((error) =>
          this.$q.notify({
            type: 'negative',
            position: 'top',

            message: error.response.data.message,
          })
        );
      this.loadMeses();
    },
    loadMeses() {
      let enero = 0;
      let febrero = 0;
      let marzo = 0;
      let abril = 0;
      let mayo = 0;
      let junio = 0;
      let julio = 0;
      let agosto = 0;
      let septiembre = 0;
      let octubre = 0;
      let noviembre = 0;
      let diciembre = 0;
      this.ventas.forEach((element) => {
        switch (
          new Date(
            moment(String(element.fecha)).utc().format('MM/DD/YYYY')
          ).getMonth()
        ) {
          case 0:
            enero += 1;
            break;
          case 1:
            febrero += 1;
            break;
          case 2:
            marzo += 1;
            break;
          case 3:
            abril += 1;
            break;
          case 4:
            mayo += 1;
            break;
          case 5:
            junio += 1;
            break;
          case 6:
            julio += 1;
            break;
          case 7:
            agosto += 1;
            break;
          case 8:
            septiembre += 1;
            break;
          case 9:
            octubre += 1;
            break;
          case 10:
            noviembre += 1;
            break;
          case 11:
            diciembre += 1;
            break;
        }
      });

      this.dataset = {
        labels: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        datasets: [
          {
            label: 'Ventas por Meses ',
            backgroundColor: '#f87979',
            data: [
              enero,
              febrero,
              marzo,
              abril,
              mayo,
              junio,
              julio,
              agosto,
              septiembre,
              octubre,
              noviembre,
              diciembre,
            ],
          },
        ],
      };
    },
  },
  computed: {
    chartData() {
      return this.dataset;
    },
    chartOptions() {
      return this.options;
    },
  },
  mounted() {
    this.loadVenta();
  },
};
</script>
<style lang="sass"></style>
