import getDb from "./client.js";

export default async function query(sql,params =[]) {
  const db = await getDb();
  return await db.execute(sql,params);
}
