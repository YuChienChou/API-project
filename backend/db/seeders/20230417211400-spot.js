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
        name: "Mountain View Lodge",
        description: "Experience luxury at its finest in our cozy and elegant accommodation located in the heart of the city.",
        price: 120,
      },
      {
        ownerId: 2,
        address: "456 Main St",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 40.7127753,
        lng: -74.0059728,
        name: "Ocean Breeze Retreat",
        description: "Step into our hidden oasis and escape the hustle and bustle of the city. Enjoy breathtaking views and serene surroundings.",
        price: 200,
      },
      {
        ownerId: 3,
        address: "789 Hollywood Blvd",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.1012184,
        lng: -118.325739,
        name: "River's Edge Cabin",
        description: "Our spacious spot is the perfect destination for those looking for comfort and convenience. With top-notch amenities and easy access to local attractions, you won't be disappointed.",
        price: 80,
      },
      {
        ownerId: 4,
        address: "10 Downing St",
        city: "London",
        state: "England",
        country: "United Kingdom",
        lat: 51.503364,
        lng: -0.127625,
        name: "Forest Haven Cottage",
        description: "Indulge in the ultimate relaxation experience in our luxurious spa-inspired spot. Unwind, rejuvenate and pamper yourself.",
        price: 300,
      },
      {
        ownerId: 5,
        address: "1 Bowski Streed",
        city: "Cupertino",
        state: "California",
        country: "United States of America",
        lat: 37.3316996,
        lng: -122.0307313,
        name: "Lakeside Manor",
        description: "Nestled in the hills, our tranquil spot offers a peaceful retreat away from the chaos of the city. Enjoy panoramic views and idyllic surroundings.",
        price: 150,
      },
      {
        ownerId: 6,
        address: "221B Baker St",
        city: "London",
        state: "England",
        country: "United Kingdom",
        lat: 51.5237676,
        lng: -0.1589769,
        name: "Hilltop Hideaway",
        description: "Stay in our stylish and contemporary spot and discover the perfect blend of comfort and sophistication. A true home away from home.",
        price: 90,
      },
      {
        ownerId: 7,
        address: "9 Alameda Drive",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 40.7568621,
        lng: -73.9855403,
        name: "Coastal Cove Chalet",
        description: "Our charming and quaint spot is the perfect choice for those seeking a unique and authentic experience. Immerse yourself in local culture and history.",
        price: 180,
      },
      {
        ownerId: 8,
        address: "585 Ohio St",
        city: "Cleveland",
        state: "Ohio",
        country: "United States of America",
        lat: 37.7927675,
        lng: -122.4041378,
        name: "Skyline Vista House",
        description: "Looking for a place to disconnect and recharge? Look no further than our secluded and serene spot surrounded by nature.",
        price: 130,
      },
      {
        ownerId: 9,
        address: "62 Pennsylvania St",
        city: "Pittsburgh",
        state: "Pennsylvania",
        country: "United States of America",
        lat: 37.7927675,
        lng: -122.4041378,
        name: "Island Oasis Villa",
        description: "Experience the vibrant and lively atmosphere of the city from the comfort of our trendy and chic spot. The perfect base for exploring all the local hotspots.",
        price: 130,
      },
      {
        ownerId: 10,
        address: "2355 Washington St",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat: 37.7927675,
        lng: -122.4041378,
        name: "Country Garden Cottage",
        description: "Our historic and elegant spot offers a glimpse into the past while providing all the modern amenities you need for a comfortable stay.",
        price: 130,
      },
      {
        ownerId: 11,
        address: "556 Arizona St",
        city: "Phoenix",
        state: "Arizona",
        country: "United States of America",
        lat: 37.7927675,
        lng: -122.4041378,
        name: "Seaside Retreat House",
        description: "Discover a world of luxury and sophistication in our opulent and refined spot. Indulge in the finer things in life and make unforgettable memories.",
        price: 130,
      },
      {
        ownerId: 12,
        address: "251 Virginia St",
        city: "	Virginia Beach",
        state: "Virginia",
        country: "United States of America",
        lat: 37.7927675,
        lng: -122.4041378,
        name: "Starry Night Lodge",
        description: "Escape to our peaceful and serene spot, nestled in the heart of nature. Perfect for those seeking solitude and relaxation.",
        price: 130,
      },
      {
        ownerId: 1,
        address: "38 Utah St",
        city: "	Salt Lake City",
        state: "Utah",
        country: "United States of America",
        lat: 37.7927675,
        lng: -122.4041378,
        name: "Tranquil Waters Chalet",
        description: "Stay in our cozy and intimate spot and experience true hospitality and warmth. Our friendly staff will ensure your stay is unforgettable.",
        price: 130,
      },
      {
        ownerId: 1,
        address: "685 Florida St",
        city: "Jacksonville",
        state: "Florida",
        country: "United States of America",
        lat: 37.7927675,
        lng: -122.4041378,
        name: "Rustic Ridge Cabin",
        description: "Our modern and stylish spot offers the perfect blend of comfort and convenience. The ideal base for both business and leisure travelers.",
        price: 130,
      },
      {
        ownerId: 2,
        address: "95 Connecticut St",
        city: "Bridgeport",
        state: "Connecticut",
        country: "United States of America",
        lat: 37.7927675,
        lng: -122.4041378,
        name: "Garden Oasis Villa",
        description: "Experience the magic of our enchanted spot, where fairy tales come to life. A unique and unforgettable destination.",
        price: 130,
      },
      {
        ownerId: 2,
        address: "87 Oregon St",
        city: "Portland ",
        state: "Oregon",
        country: "United States of America",
        lat: 37.7927675,
        lng: -122.4041378,
        name: "Mountain Peak Lodge",
        description: "Stay in our rustic and charming spot and discover the beauty of the great outdoors. Enjoy nature at its finest and reconnect with the world around you.",
        price: 130,
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
