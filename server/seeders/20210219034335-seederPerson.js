'use strict';

const data = [
  {
    name: "Kevin", // | 1 | Kevin | 80 | Happy | 2020-02-20
    score: 80,
    emotion: "Happy",
    created: "2020-02-20",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Josh", // | 2 | Josh | 90 | Sad | 2020-02-20
    score: 90,
    emotion: "Sad",
    created: "2020-02-20",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Kevin",  // | 3 | Kevin | 85 | Happy | 2020-02-20
    score: 85,
    emotion: "Happy",
    created: "2020-02-20",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Kevin", // | 4 | Kevin | 75 | Sad | 2020-02-20
    score: 75,
    emotion: "Sad",
    created: "2020-02-20",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Josh", // | 5 | Josh | 65 | Angry | 2020-02-20
    score: 65,
    emotion: "Angry",
    created: "2020-02-20",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "David", // | 6 | David | 85 | Happy | 2020-02-21
    score: 85,
    emotion: "Happy",
    created: "2020-02-21",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Josh", // | 7 | Josh | 90 | Sad | 2020-02-21
    score: 90,
    emotion: "Sad",
    created: "2020-02-21",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "David", // | 8 | David | 75 | Sad | 2020-02-21
    score: 75,
    emotion: "Sad",
    created: "2020-02-21",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Josh", // | 9 | Josh | 85 | Sad | 2020-02-21
    score: 85,
    emotion: "Sad",
    created: "2020-02-21",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Josh", // | 10 | Josh | 70 | Happy | 2020-02-21
    score: 70,
    emotion: "Happy",
    created: "2020-02-21",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Kevin", // | 11 | Kevin | 80 | Sad | 2020-02-21
    score: 80,
    emotion: "Sad",
    created: "2020-02-21",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Kevin", // | 12 | Kevin | 73 | Sad | 2020-02-22
    score: 73,
    emotion: "Sad",
    created: "2020-02-22",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Kevin", // | 13 | Kevin | 75 | Angry | 2020-02-22
    score: 75,
    emotion: "Angry",
    created: "2020-02-22",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "David", // | 14 | David | 82 | Sad | 2020-02-22
    score: 82,
    emotion: "Sad",
    created: "2020-02-22",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "David", // | 15 | David | 65 | Sad | 2020-02-22
    score: 65,
    emotion: "Sad",
    created: "2020-02-22",
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('People',data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('People', null, {});
  }
};
