const express = require('express');
const shortid = require('shortid');

const app = express();
app.use(express.json());
const port = 5000;

const channels = [];
const lessons = [];


app.get('/', (req, res) => {
   
    res.json({hello:"world"});
});

app.post('/api/channels', (req, res) => {
   
    const channelInfo = req.body;
    channelInfo.id = shortid.generate();
    channels.push(channelInfo);
    res.status(201).json(channels);

});

app.get('/hello', (req, res) => {
    res.json({hello:"future visitor"});
});

app.listen(port, () => console.log(`\n*** Server running on port ${port}`));
