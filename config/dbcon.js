import mysql from 'serverless-mysql'
import { HOST, USER, PASSWORD, DB } from "./db.config.js";
export const db = mysql({
  config: {
    host: HOST,
    database: DB,
    user: USER,
    password: PASSWORD,
  },
})
export async function query(q, values) {
  try {
//  console.log(q,values)
    const results = await db.query(q, values)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}