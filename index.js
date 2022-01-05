const express = require('express');
const shortid = require('shortid');

const app = express();
app.use(express.json());
const port = 5000;

let channels = [];
let lessons = [];

//******************************************************************** */

app.get('/', (req, res) => {

    res.json({ hello: "world" });
});
app.get('/hello', (req, res) => {
    res.json({ hello: "future visitor" });
});

//******************************************************************** */
//******************************************************************** */

app.post('/api/channels', (req, res) => {

    const channelInfo = req.body;
    channelInfo.id = shortid.generate();
    channels.push(channelInfo);
    res.status(201).json(channelInfo);

});

app.get('/api/channels', (req, res) => {

    res.status(200).json(channels);
});

//////////////////////////////////////

app.post('/api/lessons/', (req, res) => {
    const lessonInfo = req.body;
    lessonInfo.id = shortid.generate();
    lessons.push(lessonInfo);
    res.status(201).json(lessonInfo);
});

app.get('/api/lessons', (req, res) => {
    res.status(200).json(lessons);
});

app.delete('/api/channels/:id', (req, res) => {
    const { id } = req.params;
    const deleted = channels.find(channel => channel.id === id);
    if (deleted) {
        channels = channels.filter(channel => channel.id !== id);
        res.status(200).json(deleted);

    } else {
        res.status(404).json({ message: 'Channel not found' });
    }
});

//////////////////////////////////////
//******************************************************************** */

app.listen(port, () => console.log(`\n*** Server running on port ${port}`));
