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

app.delete('/api/channels/:id', (req, res) => {       ///////////// delete channel by id
    const { id } = req.params;
    const deleted = channels.find(channel => channel.id === id);
    if (deleted) {
        channels = channels.filter(channel => channel.id !== id);
        res.status(200).json(deleted);

    } else {
        res.status(404).json({ message: 'Channel not found' });
    }
});

//////////////////////////////////////////////////////////////////////////

app.post('/api/lessons/', (req, res) => {
    const lessonInfo = req.body;
    lessonInfo.id = shortid.generate();
    lessons.push(lessonInfo);
    res.status(201).json(lessonInfo);
});

app.get('/api/lessons', (req, res) => {
    res.status(200).json(lessons);
});

app.get('/api/lessons/:id', (req, res) => {      ///////////// get lesson by id
    const { id } = req.params;
    const found = lessons.find(lesson => lesson.id === id);
    if (found) {
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: 'Lesson not found' });
    }
});

app.delete('/api/lessons/:id', (req, res) => {      ///////////// delete lesson by id
    const { id } = req.params;
    const deleted = lessons.find(lesson => lesson.id === id);
    if (deleted) {
        lessons = lessons.filter(lesson => lesson.id !== id);
        res.status(200).json(deleted);
    }
    else {
        res.status(404).json({message: "lesson not found"});
    }
});

app.put('/api/lessons/:id', (req, res) => {      ///////////// update lesson by id. "PUT" will replace the whole
                                                ////////////// object, so we need to send the whole object
    const { id } = req.params;
    const changes = req.body;
    const index = lessons.findIndex(lesson => lesson.id === id);
    if (index !== -1) {
        lessons[index] = changes;
        res.status(200).json(lessons[index]);
    } else {
        res.status(404).json({ message: 'Lesson not found' });
    }
});

app.patch('/api/lessons/:id', (req, res) => {      ///////////// update lesson by id___ "patch" is more efficient than "PUT"
    const { id } = req.params;
    const changes = req.body;
    const found = lessons.find(lesson => lesson.id === id);
    if (found) {
        Object.assign(found, changes);
        res.status(200).json(found);
    
    } else {
        res.status(404).json({ message: 'Lesson not found' });
    }
});




//////////////////////////////////////////////////////////////////////////
//******************************************************************** */

app.listen(port, () => console.log(`\n*** Server running on port ${port}`));
