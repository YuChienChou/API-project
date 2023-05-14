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
        url: 'https://a0.muscache.com/im/pictures/b5a0b62e-c1bf-4dcf-9d40-025ddf0c053a.jpg?im_w=1200',
        preview: true 
      },
      {
        spotId: 1, 
        url: 'https://a0.muscache.com/im/pictures/40b8814c-d65a-48cb-8136-22d5b3a28203.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 1, 
        url: 'https://a0.muscache.com/im/pictures/cda38bae-0085-4d3a-9c45-333e024b823f.jpg?im_w=720',
        preview: false 
      },
      {
        spotId: 1, 
        url: 'https://a0.muscache.com/im/pictures/c0f747bf-8eec-4b89-a6b8-743b734640a5.jpg?im_w=720',
        preview: false 
      },
      {
        spotId: 1, 
        url: 'https://a0.muscache.com/im/pictures/e8b57d02-055f-4d55-9eec-21dafc5bac96.jpg?im_w=720',
        preview: false 
      },
      {
        spotId: 2, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-623464711321960714/original/f67c18e9-4dbe-4dbf-8fb7-dc3e480e6b3d.jpeg?im_w=1200',
        preview: true 
      },
      {
        spotId: 2, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-623464711321960714/original/79b44705-e93e-4535-aaef-53558c832d4e.png?im_w=720',
        preview: false 
      },
      {
        spotId: 2, 
        url: 'https://a0.muscache.com/im/pictures/c5bbf6dc-189f-4403-9472-88bcc8d962d0.jpg?im_w=720',
        preview: false 
      },
      {
        spotId: 2, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-623464711321960714/original/65753bc4-087f-4af5-bbe1-7484aa73ebee.jpeg?im_w=720',
        preview: false 
      },
      {
        spotId: 2, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-623464711321960714/original/945afffe-06ca-4eba-9309-f08be27777cd.jpeg?im_w=720',
        preview: false 
      },
      {
        spotId: 3, 
        url: 'https://a0.muscache.com/im/pictures/619ab404-7a6c-4425-a79c-9459b1c00b1b.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 3, 
        url: 'https://a0.muscache.com/im/pictures/efd9b4fd-bd59-43c9-ab1a-c698ed4e70a6.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 3, 
        url: 'https://a0.muscache.com/im/pictures/2708cd2c-347a-43fb-94f5-92a6f44c40be.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 3, 
        url: 'https://a0.muscache.com/im/pictures/c6e5aa5d-42eb-4747-915a-3852b3ff5d0b.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 3, 
        url: 'https://a0.muscache.com/im/pictures/c94d3a1c-29da-477b-8638-7ee6ab23a099.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 4, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-31169667/original/d642093d-6fd6-4496-ac56-b4535d724e44.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 4, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-31169667/original/78f15a12-02c2-4e82-839d-33512ca3af11.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 4, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-31169667/original/41a2b0f5-43ee-4e89-95b1-067ed36569b7.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 4, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-31169667/original/06145f01-7c02-4399-ad16-080be9c2ddb2.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 4, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-31169667/original/20c6f43b-fb62-4cc3-a0ad-980a90767ec1.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 5, 
        url: 'https://a0.muscache.com/im/pictures/591332b4-8d5b-4e1e-858c-273221c3e160.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 5, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-6378814/original/7aa897b8-b3c5-4c08-9294-0a9011a3f889.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 5, 
        url: 'https://a0.muscache.com/im/pictures/0878b298-8b23-436f-84d1-c9b1f0a1222a.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 5, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-6378814/original/d861e05a-f989-4e86-80d0-860c5c1b8151.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 5, 
        url: 'https://a0.muscache.com/im/pictures/1fc7acda-99ac-4692-b246-4708a4488997.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 6, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52612921/original/52c1bb46-42f0-43c6-ac5c-bb88bad7d336.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 6, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52612921/original/01a8786e-7412-4f3c-b264-37ca4a441009.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 6, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52612921/original/3f0d9b40-88bb-47bc-9cfa-7fcb30aa32dd.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 6, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52612921/original/ff4a7792-9648-4328-a4a0-08c019fd6128.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 6, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52612921/original/57dad90e-d21d-4f4c-a27e-944a410c3cd3.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 7, 
        url: 'https://a0.muscache.com/im/pictures/68dffa69-d4a6-4c2e-875a-17b18a37a69e.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 7, 
        url: 'https://a0.muscache.com/im/pictures/1a9e1012-6a9e-4eee-a500-0037a2a43124.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 7, 
        url: 'https://a0.muscache.com/im/pictures/e540758d-304f-42b1-915a-04c3310b9442.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 7, 
        url: 'https://a0.muscache.com/im/pictures/a71acfa1-790c-4265-b6c5-8754015c0745.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 7, 
        url: 'https://a0.muscache.com/im/pictures/0071959c-8cdf-463b-8329-fc8a3da349a4.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 8, 
        url: 'https://a0.muscache.com/im/pictures/69f34e21-c52c-4d27-8184-4aef50540770.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 8, 
        url: 'https://a0.muscache.com/im/pictures/e3e46fab-27a0-43e1-98bb-5bd6bf11ea3d.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 8, 
        url: 'https://a0.muscache.com/im/pictures/5ac64163-58e5-43bb-96ed-95eedf35ef09.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 8, 
        url: 'https://a0.muscache.com/im/pictures/d005adf8-7342-44bf-8db6-28e4b9ccb0f1.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 8, 
        url: 'https://a0.muscache.com/im/pictures/880e8dd7-853f-4828-b42a-7f5d7b59d518.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 9, 
        url: 'https://a0.muscache.com/im/pictures/fb1901ef-201a-432d-b172-1bca4a2763f5.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 9, 
        url: 'https://a0.muscache.com/im/pictures/9eaaa6d2-f236-4afc-b6c0-de8aee75c7f0.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 9, 
        url: 'https://a0.muscache.com/im/pictures/e6cb4c79-4190-4657-ba31-1febddd9b4a1.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 9, 
        url: 'https://a0.muscache.com/im/pictures/ba9859ce-9470-4b1a-8a62-69c04a85ed96.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 9, 
        url: 'https://a0.muscache.com/im/pictures/0600a303-0b7a-4bfc-9471-a59d5c0f842b.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 10, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51018493/original/5e2ab931-eb24-4560-9178-dbfeebaadaf0.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 10, 
        url: 'https://a0.muscache.com/im/pictures/5baa83be-e990-457e-b257-b1a8fead4834.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 10, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51018493/original/7899f9d9-8718-405c-b7e7-d1c87344b386.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 10, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51018493/original/116f8fa5-86cd-4453-b071-8333035e416b.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 10, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51018493/original/219db002-8229-453d-86f1-c994e3967216.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 11, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-30372972/original/e25e7ab3-c7a1-43da-9283-e9147e3fe09a.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 11, 
        url: 'https://a0.muscache.com/im/pictures/1a9e1012-6a9e-4eee-a500-0037a2a43124.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 11, 
        url: 'https://a0.muscache.com/im/pictures/a71acfa1-790c-4265-b6c5-8754015c0745.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 11, 
        url: 'https://a0.muscache.com/im/pictures/68dffa69-d4a6-4c2e-875a-17b18a37a69e.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 11, 
        url: 'https://a0.muscache.com/im/pictures/e540758d-304f-42b1-915a-04c3310b9442.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 12, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-576599054777073307/original/53e611cc-b827-4cec-850e-c1db1274de43.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 12, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-576599054777073307/original/f288503b-fdad-4113-85f1-513697bd2698.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 12, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-576599054777073307/original/4bea3adf-5d39-4ec6-9358-a4381ec4dbe8.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 12, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-576599054777073307/original/93d7e82d-3bf8-4236-87b2-27369f4ccbd4.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 12, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-576599054777073307/original/e8417625-e2d6-4702-a661-c3e58fe2b46a.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 13, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-761097183705966079/original/74d1b1b5-afd3-41ea-8d53-6548d460ac66.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 13, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-761097183705966079/original/b965e62c-8bfd-4be9-983f-b354433c37b4.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 13, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-761097183705966079/original/45b28cf8-045b-4dd7-b697-c1e543a75842.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 13, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-761097183705966079/original/95098127-9408-4661-9cd1-5be831c03b55.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 13, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-761097183705966079/original/658bd37f-e0fd-4d8d-8611-6581688316f4.jpeg?im_w=720',
        preview: true
      },
      
      {
        spotId: 14, 
        url: 'https://a0.muscache.com/im/pictures/ad89a2eb-e1b2-475a-a294-416ed7a77c27.jpg?im_w=1200',
        preview: true
      },
      
      {
        spotId: 14, 
        url: 'https://a0.muscache.com/im/pictures/7a272828-ed05-4265-b44c-db7ce2097c95.jpg?im_w=720',
        preview: true
      },
      
      {
        spotId: 14, 
        url: 'https://a0.muscache.com/im/pictures/aab0909b-d0c4-4251-b425-8e6b5d52303b.jpg?im_w=720',
        preview: true
      },
      
      {
        spotId: 14, 
        url: 'https://a0.muscache.com/im/pictures/81386a73-7639-492b-b933-df8d60d1d780.jpg?im_w=720',
        preview: true
      },
      
      {
        spotId: 14, 
        url: 'https://a0.muscache.com/im/pictures/df1484d4-c3ab-4879-946c-6f4c4649a88e.jpg?im_w=720',
        preview: true
      },
      
      {
        spotId: 15, 
        url: 'https://a0.muscache.com/im/pictures/0ce2559c-2c08-4655-9d70-b59e83b1a167.jpg?im_w=1200',
        preview: true
      },
      
      {
        spotId: 15, 
        url: 'https://a0.muscache.com/im/pictures/60d231b9-c37f-4386-84e8-ff9a37562547.jpg?im_w=720',
        preview: true
      },
      
      {
        spotId: 15, 
        url: 'https://a0.muscache.com/im/pictures/5b30e070-5e27-4dcf-b8ff-0a68462cc91b.jpg?im_w=720',
        preview: true
      },
      
      {
        spotId: 15, 
        url: 'https://a0.muscache.com/im/pictures/da358e66-a89c-4e8e-a4be-f1209db6e35b.jpg?im_w=720',
        preview: true
      },
      
      {
        spotId: 15, 
        url: 'https://a0.muscache.com/im/pictures/6be7906f-a3e9-4efd-83ed-82fb1565397e.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 16, 
        url: 'https://a0.muscache.com/im/pictures/75585280/dd98ca77_original.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 16, 
        url: 'https://a0.muscache.com/im/pictures/3496d65f-9ee9-49c3-98a7-3d5f6f9ce6e1.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 16, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1227826/original/3e22c657-0f7d-48f4-8beb-c910e88dc6be.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 16, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1227826/original/520fd804-f6c4-46bf-bc63-595cb3f8630e.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 16, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1227826/original/44b068f6-0799-453e-854e-2758e45939dd.jpeg?im_w=720',
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
