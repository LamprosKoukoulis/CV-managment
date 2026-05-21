import getDb from "./client.js";

export default async function query(sql,params =[]) {
  const db = await getDb();

  // console.log("SQL:");
  // console.log(sql);
  // console.log("PARAMS:");
  // console.log(params);
  
  const result = await db.execute(sql,params);

  // console.log("RESULT:");
  // console.table(result.rows);

  return result;
}
