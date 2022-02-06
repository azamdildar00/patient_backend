const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')
const dotenv = require('dotenv')
dotenv.config()

const dbPromise = open({
    filename: './utils/records.db',
    driver:sqlite3.Database
});


app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.get('/patient', async (req, res) => {
    const db = await dbPromise;
    const name = req.query.name;
    const data = await db.all('SELECT * FROM patient WHERE name = ?;', name)
    res.json(data)
})

app.post('/patient', async (req, res) => {
    const db = await dbPromise;
    const data = req.body.patient;
    await db.run('INSERT INTO patient (name, disease) VALUES (?,?)', data.name, data.disease);
    res.json({"satus" : "OK"});
})

app.get('/treatment', async (req, res) => {
    const db = await dbPromise;
    const type = req.query.type;
    await db.run('DELETE FROM treatment;');
    const data = await db.all('SELECT * FROM treatment WHERE treatment.disease = ?', type)
    res.json(data);
})

app.post('/treatment', async (req, res) => {
    const db = await dbPromise;
    const data = req.body.treatment;
    await db.run('INSERT INTO treatment (patient_name, disease, prescription) VALUES (?,?,?)', data.patient_name, data.disease,data.prescription)
    res.json({"satus" : "OK"})
})

const server = async () => {
    const db = await dbPromise;
    await db.migrate();

    app.listen(process.env.PORT || 8080, () => {
        console.log('Server is running')
    })
}

server();