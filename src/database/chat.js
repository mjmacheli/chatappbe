const {getDatabase} = require('./mongo')

const collectionName = 'chats'

const insertChat = async ( chat ) => {
    const database = await getDatabase()
    const {insertedId} = await database.collection(collectionName).insertOne(chat)
    return insertedId
}

const getChats = async ( id ) => {
    const database = await getDatabase();
    return await database.collection(collectionName).find({ $or: [{senderId: id}, {sendeeId: id}]}).toArray();
}

const getAllChats = async ( ) => {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
    getChats,
    insertChat,
    getAllChats
}