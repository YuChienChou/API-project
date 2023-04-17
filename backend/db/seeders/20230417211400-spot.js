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
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
      },
      {
        ownerId: 2,
        address: '1235 Happy Street',
        city: 'FairField',
        state: 'California',
        country: 'United States of America',
        lat: 38.23894,
        lng: -122.07733,
        name: "Magic Candy House",
        description: "Place where children love the most",
        price: 456,
      },
      {
        ownerId: 3,
        address: '1235 Fast Express Road',
        city: 'Sacramento',
        state: 'California',
        country: 'United States of America',
        lat: 38.58512,
        lng: -121.50437,
        name: "Flight Train",
        description: "Place where take you to your dreams",
        price: 789,
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['App Academy', 'Magic Candy House', 'Flight Train'] }
    }, {});
  }
};
