const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./../../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Ivan',
    email: 'ivan@example.com',
    password: '566548Test',
    tokens: [{
        token: jwt.sign( { _id: userOneId}, process.env.JWT_SECRET)
    }]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Petar',
    email: 'petar@example.com',
    password: 'dsad123',
    tokens: [{
        token: jwt.sign( { _id: userTwoId}, process.env.JWT_SECRET)
    }]
};

const setupDatabase = async () => {
    await User.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase,
    userTwoId,
    userTwo
}