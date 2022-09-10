import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'be_test',
  password: 'password',
  port: 5432,
})

export default pool