const express = require('express');
const cors = require('cors');
const { connect } = require('./config/database.js');
const { getAllCommunities } = require('./controllers/databaseService.js');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

async function setUp() {
    await connect();
}

setUp();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/homePage', async (req, res) => {
    const data = await getAllCommunities();
    res.json(data);
});

app.get('/debug', (req,res) => {
    res.send("V1");
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
