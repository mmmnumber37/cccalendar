<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Calendar
        </q-toolbar-title>

        <q-btn
          class="q-mr-xs"
          flat
          round
          dense
          icon="add_circle_outline"
          @click="$router.push('/add')"
        />
      </q-toolbar>
    </q-header>

    <q-page-container> <main-page /> </q-page-container>
  </q-layout>
</template>

<script>
import MainPage from 'pages/MainPage.vue';

export default {
  name: 'MainLayout',

  components: {
    MainPage
  }
};
</script>
