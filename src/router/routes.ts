import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  
  {
    path: '/encuestas',

    component: () => import('src/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      { path: '', component: () => import('src/pages/EncuestaPage.vue') }
    ],

  },

  {
    path: '/DashboardAdministracion',

    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/DashboardAdministracionPage.vue') }
    ],

  },
  {
    path: '/usuarios',

    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/UsuarioPage.vue') }
    ],

  },


  {
    path: '/grupos',

    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/GrupoPage.vue') }
    ],

  },



  {
    path: '/vendedores',

    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/VendedorPage.vue') }
    ],

  },

 {
    path: '/ventas',

    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/VentaPage.vue') }
    ],

  },
  {
    path: '/colores',

    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/ColorPage.vue') }
    ],

  },
  {
    path: '/marcas',

    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/MarcaPage.vue') }
    ],

  },
  {
    path: '/modelos',

    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/ModeloPage.vue') }
    ],

  },
   {
    path: '/kpis',

    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/KpiPage.vue') }
    ],

  },

 {
    path: '/DashboardHoster',

    component: () => import('src/layouts/HosterLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/DashboardHosterPage.vue') }
    ],

  },
  {
    path: '/reportekpi',

    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/ReporteKpiPage.vue') }
    ],

  },
  {
    path: '/DashboardVendedor',

    component: () => import('src/layouts/HosterLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/DashboardVendedorPage.vue') }
    ],

  },
   {
    path: '/reporteVentas',

    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/ReporteVentaPage.vue') }
    ],

  },
   {
    path: '/reporteEncuestas',

    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/ReporteEcuestaPage.vue') }
    ],

  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
