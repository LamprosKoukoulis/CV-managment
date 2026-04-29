const getDb = require("./client");

async function query(sql) {
  const db = await getDb();
  return await db.execute(sql);
}

module.exports = query;