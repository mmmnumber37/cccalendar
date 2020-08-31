export function getDailyTasks(state) {
  return date => state.tasks.filter(task => task.date === date);
}
