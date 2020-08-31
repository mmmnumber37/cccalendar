import { db } from 'boot/db.js';

export async function getTasks({ commit }) {
  const result = await db.table('tasks').toArray();
  commit('SET_TASKS', result);
}

export async function addTask({ dispatch }, data) {
  const result = await db.tasks.add(data);
  await dispatch('getTasks');
  return result;
}

export async function updateTask({ dispatch }, data) {
  await db.tasks.update(data.id, data.data);
  await dispatch('getTasks');
}

export async function removeTask({ dispatch }, id) {
  await db.tasks.delete(id);
  await dispatch('getTasks');
}
