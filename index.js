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
    const data = await db.all('SELECT * FROM patient;')
    console.log(data);
    res.json(data)
})

app.post('/patient', async (req, res) => {
    const db = await dbPromise;
    const data = req.body;
    console.log(data);
    await db.run('INSERT INTO patient (name, category) VALUES (?,?)', data.name, data.category);
    res.json({"satus" : "OK"});
})

app.get('/treatment', async (req, res) => {
    const db = await dbPromise;
    const type = req.query.type;
    console.log(type)
    const data = await db.all('SELECT * FROM patient WHERE patient.category = ?', type)
    res.json(data);
})

app.post('/treatment', async (req, res) => {
    const db = await dbPromise;
    const data = req.body;
    await db.run('INSERT INTO treatment (name) VALUES (?)', data.name)
    console.log(req.query);
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