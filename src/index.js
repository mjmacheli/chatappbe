const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const {startDatabase} = require('./database/mongo')
const {insertUser, getUsers, userLogin } = require('./database/user')
const {getChats, insertChat,getAllChats } = require('./database/chat')
const { createGroup, getAllGroups,getMyGroups } = require('./database/group')

const app = express()

app.use(helmet())

app.use(bodyParser.json())

app.use(cors())

app.use(morgan('combined'))

app.get('/', async (_ , res) => {
    res.send(await getUsers());
})

// app.post('/', async (req, res) => {
//     const newUser = req.body;
//     await insertUser(newUser);
//     res.send({ message: 'New user inserted.' });
// })

app.post('/login', async (req, res) => {
    const newUser = req.body;
    console.log('user ', newUser)
    const user = await userLogin(newUser);
    res.send({user: user});
})

app.post('/register', async (req, res) => {
    const newUser = req.body;
    await insertUser(newUser);
    res.send({ message: 'New user created.' });
})

app.post('/chats/add', async (req, res) => {
    const newChat = req.body;
    await insertChat(newChat);
    res.send(newChat);
})

app.post('/chats/convo', async (req, res) => {
    const { body } = req
    res.send(await getChats(body.id));
})

app.get('/convos', async ( _, res) => {
    res.send(await getAllChats());
})

app.post('/groups', async (req, res) => {
    const { body } = req
    res.send(await createGroup(body));
})

app.get('/groups', async ( _, res) => {
    res.send(await getAllGroups());
})

app.get('/groups/:id', async ( req ,res ) => {
    res.send(await getMyGroups(req.params.id));
})

startDatabase().then(async () => {
    await insertUser({username: 'mj', password:'1234'});
    await insertUser({username: 'mj1', password:'1234'});
    await insertUser({username: 'mj2', password:'1234'});

    app.listen(3001, async () => {
        console.log('listening on port 3001');
    });
});
