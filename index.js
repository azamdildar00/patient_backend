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

app.get('/', async (req, res) => {
    const db = await dbPromise;
    const data = await db.all('SELECT * FROM records;')
    console.log(data);
    res.json(data)
})

app.post('/postRecord', async (req, res) => {
    const db = await dbPromise;
    const data = req.body;
    console.log(data);
    await db.run('INSERT INTO records (name, category) VALUES (?,?)',data.name, data.treatment);
    res.json({"satus" : "OK"});
})



const server = async () => {
    const db = await dbPromise;
    await db.migrate();

    app.listen(8080, () => {
        console.log('Server is running')
    })
}

server();