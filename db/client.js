// connection management

require("dotenv").config();
const { connect } = require("@tursodatabase/serverless");

let dbPromise = null; //only one connection is created for the whole app

function getDb() {
  if (!dbPromise) {
    dbPromise = connect({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_KEY,
    });
  }
  return dbPromise;
}

module.exports = getDb;