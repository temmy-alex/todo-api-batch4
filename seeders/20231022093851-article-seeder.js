'use strict';

const slug = require('slug')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const addArticles = [
      {
        title: 'Article 1',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        image: "https://placehold.co/200",
        status: 'publish',
        category_id: 1,
        slug: slug('Article 1', '-'),
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Article 2',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        image: "https://placehold.co/200",
        status: 'publish',
        category_id: 1,
        slug: slug('Article 2', '-'),
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Article 3',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        image: "https://placehold.co/200",
        status: 'publish',
        category_id: 1,
        slug: slug('Article 3', '-'),
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    return queryInterface.bulkInsert('Articles', addArticles, {});
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Articles', null, {});
  }
};
