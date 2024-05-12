import pkg from 'pg';

const { Pool } = pkg;
 
export const dataBase = new Pool({
  connectionString : 'postgres://hseefiqg:fIw-VNcASUP-G3YDvIyaslDULoZQJxbG@isabelle.db.elephantsql.com/hseefiqg'
})