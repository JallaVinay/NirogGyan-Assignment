const express = require('express')
const { open } = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())

const port = process.env.PORT || 8080


const dbPath = path.join(__dirname, 'project.db')
let db = null

const initializeDBAndServer = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  })

  app.listen(8080, () => {
    console.log('Server is running on port 8080')
  })
}

initializeDBAndServer()

app.get('/doctors_list/', async (req, res) => {
  try {
    const { search_q = '', specialization = 'ALL' } = req.query
    let query = ''
    let params = []

    if (specialization === 'ALL') {
      query = `SELECT * FROM doctor_list WHERE name LIKE ?;`
      params = [`%${search_q}%`]
    } else {
      query = `SELECT * FROM doctor_list WHERE name LIKE ? AND specialization = ?;`
      params = [`%${search_q}%`, specialization]
    }

    const doctors_list = await db.all(query, params)
    if (doctors_list.length === 0) {
      res.status(404).send({ error_message: 'No doctors found' })
    } else {
      res.send({ doctors_list })
    }
  } catch (error) {
    res.status(500).send({ error_message: 'Server error' })
  }
})

app.get('/specialization_list/', async (req, res) => {
  try {
    const specialization_list = await db.all(`SELECT * FROM specialization_list;`)
    if (specialization_list.length === 0) {
      res.status(404).send({ error_message: 'No specializations found' })
    } else {
      res.send({ specialization_list })
    }
  } catch (error) {
    res.status(500).send({ error_message: 'Server error' })
  }
})

app.get('/doctorDetails/:id', async (req, res) => {
  try {
    const id = req.params.id
    const query = `SELECT * FROM doctor_details WHERE doctor_id = ?`
    const doctorDetails = await db.get(query, [id])
    if (doctorDetails) {
      res.send(doctorDetails)
    } else {
      res.status(404).send({ error_message: 'Doctor not found' })
    }
  } catch (error) {
    res.status(500).send({ error_message: 'Server error' })
  }
})

app.get('/doctorAvailability/:id', async (req, res) => {
  try {
    const doctorId = req.params.id
    const query = `
      SELECT availability_id, doctor_id, slot_start_time, slot_end_time
      FROM doctor_availability
      WHERE doctor_id = ?
      ORDER BY slot_start_time
    `
    const slots = await db.all(query, [doctorId])
    res.send(slots)
  } catch (error) {
    res.status(500).send({ error_message: 'Failure fetching availability slots' })
  }
})

module.exports = app
