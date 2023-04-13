'use strict';

const bcrypt = require("bcryptjs");

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
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'egg@user.io',
        username: 'Egg-the-best',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'xiaoJi@user.io',
        username: 'XiaoJi-the-sweetest',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'bowski@user.io',
        username: 'Bowski-ugly-cute',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Egg-the-best', 'XiaoJi-the-sweetest', 'Bowski-ugly-cute'] }
    }, {});
  }
};
