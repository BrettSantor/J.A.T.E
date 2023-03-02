import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  console.log('line 20',content)
  const request = store.put({content});
  console.log('line 22',request)
  const result = await request;
  console.log('line 24', result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('get from database')
  const jateDB = await openDB('jate', 1);
  console.log('open database')
  const tx = jateDB.transaction('jate', 'readonly');
  console.log('transaction')
  const store = tx.objectStore('jate');
  console.log('line 32', store)
  const request = store.getAll();
  console.log('line 33',request)
  const result = await request;
  console.log('line 35',result)
  console.log(result.length)
  return result;
}

initdb();
