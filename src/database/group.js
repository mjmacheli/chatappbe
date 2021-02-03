const {getDatabase} = require('./mongo')

const collectionName = 'groups'

const createGroup = async ( group ) => {
    const database = await getDatabase()
    const {insertedId} = await database.collection(collectionName).insertOne( group )
    return insertedId
}

const getAllGroups = async ( ) => {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

const getMyGroups = async ( id ) => {
    const database = await getDatabase();
    return await database.collection(collectionName).find({})
        .toArray({ "members": { _id: id }});
}

module.exports = {
    createGroup,
    getAllGroups,
    getMyGroups
}