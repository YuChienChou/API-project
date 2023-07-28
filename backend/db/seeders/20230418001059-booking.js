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
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2, 
        startDate: new Date('2023-08-15'),
        endDate: new Date('2023-08-23'),
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date('2023-10-8'),
        endDate: new Date('2023-10-10'),
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('2023-10-16'),
        endDate: new Date('2023-10-22'),
      },
      {
        spotId: 4,
        userId: 8,
        startDate: new Date('2023-09-1'),
        endDate: new Date('2023-09-30'),
      },
      {
        spotId: 5,
        userId: 6,
        startDate: new Date('2023-09-05'),
        endDate: new Date('2023-09-18'),
      },
      {
        spotId: 7,
        userId: 10,
        startDate: new Date('2023-08-31'),
        endDate: new Date('2023-09-06'),
      },
      {
        spotId: 2,
        userId: 9,
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-10-07'),
      },
      {
        spotId: 3,
        userId: 11,
        startDate: new Date('2023-09-14'),
        endDate: new Date('2023-09-21'),
      },
      {
        spotId: 12,
        userId: 7,
        startDate: new Date('2023-08-03'),
        endDate: new Date('2023-08-20'),
      },
      {
        spotId: 15,
        userId: 5,
        startDate: new Date('2023-09-14'),
        endDate: new Date('2023-09-21'),
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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
