'use strict';

const { hashPassword } = require('../helpers/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let setPassword = hashPassword('rahasia123')

   const addUsers = [
    {
      name: "admin",
      email: "admin@mail.com",
      password: setPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "member",
      email: "member@mail.com",
      password: setPassword,
      role: "member",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
   ]

   return queryInterface.bulkInsert('Users', addUsers, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
