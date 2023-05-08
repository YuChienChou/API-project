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
        price: 120,
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
        price: 99,
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
        price: 110,
      },
      {
        ownerId: 4,
        address: 'address 4',
        city: 'San Jose',
        state: 'California',
        country: 'United States of America',
        lat: 38.58512,
        lng: -121.50437,
        name: "spot 4",
        description: "Best place for a great time",
        price: 80,
      },
      {
        ownerId: 5,
        address: 'address 5',
        city: 'Milpitas',
        state: 'California',
        country: 'United States of America',
        lat: 38.58512,
        lng: -121.50437,
        name: "spot 5",
        description: "Best place for a great time",
        price: 130,
      },
      {
        ownerId: 6,
        address: 'address 6',
        city: 'Napa',
        state: 'California',
        country: 'United States of America',
        lat: 38.58512,
        lng: -121.50437,
        name: "spot 6",
        description: "Best place for a great time",
        price: 90,
      },
      {
        ownerId: 7,
        address: 'address 7',
        city: 'Santa Clara',
        state: 'California',
        country: 'United States of America',
        lat: 38.58512,
        lng: -121.50437,
        name: "spot 7",
        description: "Best place for a great time",
        price: 100,
      },
      {
        ownerId: 8,
        address: 'address 8',
        city: 'Fremont',
        state: 'California',
        country: 'United States of America',
        lat: 38.58512,
        lng: -121.50437,
        name: "spot 8",
        description: "Best place for a great time",
        price: 200,
      },
      {
        ownerId: 9,
        address: 'address 9',
        city: 'Oakland',
        state: 'California',
        country: 'United States of America',
        lat: 38.58512,
        lng: -121.50437,
        name: "spot 9",
        description: "Best place for a great time",
        price: 250,
      },
      {
        ownerId: 10,
        address: 'address 10',
        city: 'Sacramento',
        state: 'California',
        country: 'United States of America',
        lat: 38.58512,
        lng: -121.50437,
        name: "spot 10",
        description: "Best place for a great time",
        price: 160,
      },
      {
        ownerId: 11,
        address: 'address 11',
        city: 'Alameda',
        state: 'California',
        country: 'United States of America',
        lat: 38.58512,
        lng: -121.50437,
        name: "spot 11",
        description: "Best place for a great time",
        price: 90,
      },
      {
        ownerId: 12,
        address: 'address 12',
        city: 'Santo Rosa',
        state: 'California',
        country: 'United States of America',
        lat: 38.58512,
        lng: -121.50437,
        name: "spot 12",
        description: "Best place for a great time",
        price: 50,
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
      name: { [Op.in]: ['App Academy', 'Magic Candy House', 'Flight Train', 'spot 4', 'spot 5', 'spot 6', 'spot 7', 'spot 8', 'spot 9', 'spot 10', 'spot 11', 'sopt 12'] }
    }, {});
  }
};
