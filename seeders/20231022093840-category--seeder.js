'use strict';

const slug = require('slug')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let categoryNames = ["Laptop & Computer", "Food & Drinks", "Health"]

    const addCategories = categoryNames.map((category) => {
        return {
          name: category,
          slug: slug(category, '-'),
          createdAt: new Date(),
          updatedAt: new Date()
        }
    });

    return queryInterface.bulkInsert('Categories', addCategories, {});
  },

  async down (queryInterface, Sequelize) {
     queryInterface.bulkDelete('Categories', null, {});
  }
};
