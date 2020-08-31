<template>
  <q-page padding>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="1" label="add" />
      <q-tab name="2" label="import/export" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="1">
        <q-input ref="name" v-model="name" label="name" class="q-pb-md" />
        <q-btn label="save" @click="createTask" />
      </q-tab-panel>

      <q-tab-panel name="2">
        <div class="word-wrap q-mb-md">
          file:///data/user/0/com.maxzotov.tasks.test/files/Cccalendar.json
        </div>

        <div class="row justify-around q-mb-md">
          <q-btn label="import" icon="get_app" @click="importBd" />

          <q-btn label="export" icon="publish" @click="exportBd" />
        </div>

        <div class="word-wrap" v-if="messages" v-html="messages" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { date } from 'quasar';
import { mapActions, mapState } from 'vuex';
import {
  Plugins,
  FilesystemDirectory,
  FilesystemEncoding
} from '@capacitor/core';

const { Filesystem } = Plugins;

export default {
  name: 'AddPage',

  data() {
    return {
      name: '',
      messages: '',
      tab: '1'
    };
  },

  computed: {
    ...mapState('tasks', ['tasks'])
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.name.focus();
    });
  },

  methods: {
    ...mapActions('tasks', ['addTask']),

    async importBd() {
      try {
        let contents = await Filesystem.readFile({
          path: '/Cccalendar.json',
          directory: FilesystemDirectory.Data,
          encoding: FilesystemEncoding.UTF8
        });

        const tasks = JSON.parse(contents.data);
        await tasks.forEach(async (task, index) => {
          delete task.id;
          await this.addTask(task);
        });
        this.messages = 'OK';
      } catch (error) {
        this.messages = error;
        console.error(error);
      }
    },

    async exportBd() {
      const filterTasks = this.tasks.filter(
        task => !(new Date(task.date).getTime() < Date.now())
      );

      try {
        const result = await Filesystem.writeFile({
          path: '/Cccalendar.json',
          data: JSON.stringify(filterTasks),
          directory: FilesystemDirectory.Data,
          encoding: FilesystemEncoding.UTF8
        });

        console.log('adsf', result);

        this.messages = `OK <br/><br/> ${result.uri}`;
      } catch (error) {
        this.messages = error;
        console.error(error);
      }
    },

    async createTask() {
      for (let i = 0; i < 5; i++) {
        const result = await this.addTask({
          date: this.datePlus(i),
          time: this.timePlus(i),
          name: this.name,
          check: false,
          count: i + 1
        });
      }

      this.$router.push('/');
    },

    timePlus(index) {
      if (index === 0)
        return date.formatDate(
          date.addToDate(Date.now(), { minutes: 20 }),
          'HH:mm'
        );
      return '18:00';
    },

    datePlus(index) {
      if (index === 1) {
        return date.formatDate(
          date.addToDate(Date.now(), { days: 1 }),
          'YYYY/MM/DD'
        );
      } else if (index === 2) {
        return date.formatDate(
          date.addToDate(Date.now(), { days: 2 }),
          'YYYY/MM/DD'
        );
      } else if (index === 3) {
        return date.formatDate(
          date.addToDate(Date.now(), { days: 14 }),
          'YYYY/MM/DD'
        );
      } else if (index === 4) {
        return date.formatDate(
          date.addToDate(Date.now(), { month: 2 }),
          'YYYY/MM/DD'
        );
      }

      return date.formatDate(Date.now(), 'YYYY/MM/DD');
    }
  }
};
</script>

<style lang="scss">
.word-wrap {
  word-break: break-word;
}
</style>
