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
      {
        spotId: 4, 
        url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        preview: true
      },
      {
        spotId: 5, 
        url: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        preview: true
      },
      {
        spotId: 6, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53588636/original/5390aba5-3036-4485-82fd-9c2e862b0592.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 7, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-668877859013653763/original/3907f6c6-5cf2-42e8-a9e0-12c2b88ca82f.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 8, 
        url: 'https://a0.muscache.com/im/pictures/a33dc9e4-bcac-4431-9f17-9825b594ac5e.jpg?im_w=960',
        preview: true
      },
      {
        spotId: 9, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-710578605118636878/original/6aff6256-1f2d-4702-8dfd-5bfc1214f828.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 10, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50809489/original/e513a6e2-8380-4faf-994c-7ce51db8d482.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 11, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-16937782/original/121eecf8-0336-4e2d-b001-31983a8b0def.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 12, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54064179/original/3bfbb323-e459-409d-99f8-b2fadd1c4a97.jpeg?im_w=960',
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
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {});
  }
};
