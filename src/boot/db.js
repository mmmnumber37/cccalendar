import Dexie from 'dexie';

const db = new Dexie('Tasks');
db.version(1).stores({
  tasks: '++id'
});

// db.tasks.add({
//   date: '2020/07/15',
//   name: '111',
//   check: false
// });
// db.tasks.add({
//   date: '2020/07/17',
//   name: '222',
//   check: true
// });

export { db };
