'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'The house was nice and quaint. The furnace kept us nice and warm.',
        stars: 4.5,
      },
      {
        spotId: 2,
        userId: 2,
        review: 'It was delightful being surrounded by nature in such a cozy space. Was a really special weekend, would stay here again.',
        stars: 4.8,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Such a beautiful escape. Beautiful views from the room & the outdoor shower was the best ever!',
        stars: 5,
      },
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
