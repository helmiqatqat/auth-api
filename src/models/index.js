'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');


const clothesModel = require('./clothes/model.js');
const foodModel = require('./food/model.js');
const userModel = require("../auth/models/users.js");

const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);

const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
const user = userModel(sequelize, DataTypes);

// const userCollection = new Collection(user);
const foodCollection = new Collection(food);
const clothesCollection = new Collection(clothes);


module.exports = {
  db: sequelize,
  users: user,
  food: foodCollection,
  clothes: clothesCollection,
};
