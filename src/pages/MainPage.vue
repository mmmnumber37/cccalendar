<template>
  <q-page class="flex column">
    <div class="flex flex-center">
      <q-date
        class="full-width calendar"
        v-model="date"
        :events="dateEvents"
        first-day-of-week="1"
        today-btn
      />
    </div>

    <q-list bordered separator>
      <q-item
        v-for="(event, index) in events"
        :key="index"
        tag="label"
        v-ripple
        @click="updateTask({ id: event.id, data: { check: !event.check } })"
      >
        <q-item-section side top>
          <q-checkbox :value="event.check" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <span v-if="event.count">({{ event.count }})</span>
            {{ event.name }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn flat round dense icon="delete" @click="removeTask(event.id)" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { date } from 'quasar';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'MainPage',

  data() {
    return {
      date: date.formatDate(Date.now(), 'YYYY/MM/DD')
    };
  },

  computed: {
    ...mapState('tasks', ['tasks']),
    ...mapGetters('tasks', ['getDailyTasks']),

    dateEvents() {
      return this.tasks.map(task => task.date);
    },

    events() {
      return this.getDailyTasks(this.date);
    }
  },

  mounted() {
    this.getTasks();
  },

  methods: {
    ...mapActions('tasks', ['getTasks', 'updateTask', 'removeTask'])
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  border-radius: 0;
}
</style>
