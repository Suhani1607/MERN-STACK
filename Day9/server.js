const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();

    console.log('Connected successfully to MongoDB server');

    const db = client.db('resumeData');
    console.log(`Using database: ${db.databaseName}`);
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  } finally {
    await client.close();
  }
}

main();
