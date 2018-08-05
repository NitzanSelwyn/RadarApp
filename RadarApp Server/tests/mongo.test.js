const auth = require('./Auth/auth')
const mongoose = require('mongoose')

let connection;
let DB;

beforeAll(async () => {
    connection = await mongoose.connect('mongodb+srv://nitzanSelwyn:123nitzan123@locationproject-vh41z.mongodb.net/test')
})

afterAll(async () => {
    await connection.close();
})
