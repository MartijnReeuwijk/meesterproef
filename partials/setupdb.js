const mysql = require('mysql')
require('dotenv').config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

db.connect(err => {
  if (err) throw err
  console.log('[MySql] connection established..')
})

function createDb () {
  return new Promise((resolve, reject) => {
    db.query('CREATE DATABASE IF NOT EXISTS semia', (err, result) => {
      if (err) {
        reject(err)
      } else {
        console.log('[MySql] Database created')
        resolve()
      }
    })
  })
}

function createTable (query, tableName) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        reject(err)
      } else {
        console.log(`[MySql] ${tableName} table created`)
        resolve()
      }
    })
  })
}

const queries = {
  urls: `CREATE TABLE IF NOT EXISTS semia.urls(id int NOT NULL AUTO_INCREMENT,
    origionalUrl VARCHAR(255), shortURL VARCHAR(255), PRIMARY KEY (id))`
}

Promise.all([
  createDb(),
  createTable(queries.urls, 'urls')
])
  .then(() => {
    console.log('[MySql] Database set up succesfully')
    db.end()
  })
  .catch(err => {
    console.error(err)
    db.query('DROP DATABASE semia', (error, result) => {
      if (error) {
        console.log('Database could not be reset')
        throw error
      } else {
        console.log('Database was reset because of the following error:')
        throw err
      }
    })
  })
