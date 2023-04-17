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
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1, 
        url: 'https://as1.ftcdn.net/v2/jpg/03/96/00/60/1000_F_396006014_aiWnqPW3WnVnjURGDIrL7FazJ916mNAD.jpg',
        preview: true 
      },
      {
        spotId: 2, 
        url: 'https://as2.ftcdn.net/v2/jpg/02/98/30/97/1000_F_298309756_XV5jNmRslnQVDe2bbHqxBQ1qEUyoJ2Nh.jpg',
        preview: true 
      },
      {
        spotId: 3, 
        url: 'https://as2.ftcdn.net/v2/jpg/03/10/75/09/1000_F_310750987_k6kTEjzdCwhADMkCV0FnkVY2OwyN4YZf.jpg',
        preview: true
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
