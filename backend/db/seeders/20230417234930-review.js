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
        userId: 12,
        review: "The place was great! Really enjoyed our stay and would definitely recommend it.",
        stars: 4.2
    },
    {
        spotId: 2,
        userId: 8,
        review: "Fantastic location with plenty of great food options nearby!",
        stars: 4.9
    },
    {
        spotId: 3,
        userId: 1,
        review: "The house was really cozy and we loved the fireplace!",
        stars: 3.7
    },
    {
        spotId: 4,
        userId: 8,
        review: "This was the perfect spot for a weekend getaway. Highly recommend!",
        stars: 4.8
    },
    {
        spotId: 5,
        userId: 7,
        review: "Great location and the view was amazing! Would definitely come back.",
        stars: 4.5
    },
    {
        spotId: 6,
        userId: 4,
        review: "We had a wonderful time staying at this spot. The hosts were very accommodating and the location was great.",
        stars: 4.3
    },
    {
        spotId: 7,
        userId: 8,
        review: "The apartment was clean and comfortable. We would definitely stay here again!",
        stars: 3.8
    },
    {
        spotId: 8,
        userId: 5,
        review: "The location was perfect and the room was very clean. Would recommend to anyone looking for a comfortable stay!",
        stars: 4.7
    },
    {
        spotId: 9,
        userId: 3,
        review: "This spot was amazing! Beautiful views and very clean and modern.",
        stars: 4.2
    },
    {
        spotId: 10,
        userId: 6,
        review: "The house was very cozy and had everything we needed. Great location too!",
        stars: 4.0
    },
    {
        spotId: 11,
        userId: 2,
        review: "Great experience staying at this spot. The hosts were very friendly and the location was amazing.",
        stars: 4.1
    },
    {
        spotId: 12,
        userId: 7,
        review: "We really enjoyed our stay at this spot. It was very clean and had everything we needed.",
        stars: 4.6
    },
    {
        spotId: 13,
        userId: 12,
        review: "The location was perfect and the room was very comfortable. Would definitely stay here again!",
        stars: 4.8
    },
    {
        spotId: 14,
        userId: 12,
        review: "This place was the perfect spot for a relaxing vacation. The beach was just a short walk away!",
        stars: 4
    },
    {
        spotId: 15,
        userId: 4,
        review: " the perfect spot for a weekend getaway with friends. We loved the hot tub and the views!",
        stars: 4
    },
    {
        spotId: 16,
        userId: 1,
        review: "This spot was amazing! The views were breathtaking and the room was very clean and comfortable.",
        stars: 4.9
    },
    {
        spotId: 1,
        userId: 3,
        review: " had everything we needed for a great family vacation. We loved the hot tub!",
        stars: 4.8
    },
    {
        spotId: 1,
        userId: 6,
        review: "This spot was amazing! The views were breathtaking and the room was very clean and comfortable.",
        stars: 4.2
    },
    {
      spotId: 1,
      userId: 9,
      review: "The house was really cozy and we loved the fireplace!",
      stars: 3.7
    },
    {
      spotId: 2,
      userId: 5,
      review: "The house was really cozy and we loved the fireplace!",
      stars: 3.7
    },
    {
      spotId: 2,
      userId: 8,
      review: "The house was really cozy and we loved the fireplace!",
      stars: 3.7
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
