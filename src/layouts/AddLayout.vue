<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          class="q-mr-xs"
          @click="$router.back()"
        />

        <q-toolbar-title>
          Calendar
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container> <add-page /> </q-page-container>
  </q-layout>
</template>

<script>
import AddPage from 'pages/AddPage.vue';

export default {
  name: 'AddLayout',

  components: {
    AddPage
  }
};
</script>
