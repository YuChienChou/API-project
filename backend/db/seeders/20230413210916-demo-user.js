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
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'Lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@example.com',
        username: 'user1',
        firstName: 'John',
        lastName: 'Doe',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@example.com',
        username: 'user2',
        firstName: 'Jane',
        lastName: 'Doe',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user3@example.com',
        username: 'user3',
        firstName: 'Sarah',
        lastName: 'Smith',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user4@example.com',
        username: 'user4',
        firstName: 'David',
        lastName: 'Lee',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user5@example.com',
        username: 'user5',
        firstName: 'Emily',
        lastName: 'Taylor',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user6@example.com',
        username: 'user6',
        firstName: 'Matthew',
        lastName: 'Wang',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user7@example.com',
        username: 'user7',
        firstName: 'Michael',
        lastName: 'Chen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user8@example.com',
        username: 'user8',
        firstName: 'Olivia',
        lastName: 'Kim',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user9@example.com',
        username: 'user9',
        firstName: 'Sophia',
        lastName: 'Brown',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user10@example.com',
        username: 'user10',
        firstName: 'Ethan',
        lastName: 'Jones',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user11@example.com',
        username: 'user11',
        firstName: 'Isabella',
        lastName: 'Clark',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user12@example.com',
        username: 'user12',
        firstName: 'Aiden',
        lastName: 'Wilson',
        hashedPassword: bcrypt.hashSync('password')
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
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4', 'FakeUser5', 'FakeUser6', 'FakeUser7', 'FakeUser8', 'FakeUser9', 'FakeUser10', 'FakeUser11'] }
    }, {});
  }
};
