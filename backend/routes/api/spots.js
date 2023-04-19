const express = require('express');
const { Sequelize } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Spot, SpotImage, Review, User } = require('../../db/models');
const router = express.Router();

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .isDecimal({force_decimal: true})
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .isDecimal({force_decimal: true})
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({max: 50})
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];

//get all spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();
    const payload = [];

    for(let i = 0; i <spots.length; i++) {
        let spot = spots[i];

        let previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true},
            attributes: ['url'],
        });


        if(previewImage) {
            previewImage = previewImage.url;
        } else {
            previewImage = null;
        }


        const totalRating = await Review.sum('stars', {
            where: {
                spotId: spot.id
            }
        });

        const totalSpots = await Review.count({
            where: {
                spotId: spot.id
            }
        });
        
        const avgRating = totalRating / totalSpots;

        const spotData = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating,
            previewImage: previewImage,
            
        };
        payload.push(spotData);
    }
    
    return res.status(200).json({
        Spots: payload
    });
});

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async(req, res, next) => {
   const spots = await Spot.findAll({
    where: {
        ownerId: req.user.id
    }
   });
   const payload = [];

   for (let i = 0; i < spots.length; i++) {
    const spot = spots[i];

    const totalSpots = await Review.count({
        where: {
            spotId: spot.id
        }
    });

    const totalRating = await Review.sum('stars', {
        where: {spotId: spot.id}
    });

    const avgRating = totalRating / totalSpots;

    const previewImage = await SpotImage.findByPk(spot.id, {
        attributes: ['url']
    });

    const spotData = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating,
        previewImage: previewImage,
    };

    payload.push(spotData);

   }

   return res.status(200).json({
    Spots: payload
   })
});

//Get details of a Spot from an id
router.get('/:id', async (req, res, next) => {
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId);

    if(!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.status = 404;

        return next(err);
    }

    const numReviews = await Review.count({
        where: {
            spotId: spotId
        }
    });

    const totalRating = await Review.sum('stars', {
        where: {
            spotId: spot.id
        }
    });

    const totalSpots = await Review.count({
        where: {
            spotId: spot.id
        }
    });
    
    avgRating = totalRating / totalSpots;

    const spotImages = await SpotImage.findAll({
        where: {spotId: spotId},
        attributes: ['id', 'url', 'preview']
    });

    const owner = await User.findOne({
        where: {
            id: spot.ownerId
        },
        attributes: ['firstName', 'lastName']
    });

    const spotData = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews: numReviews,
        aveStarRating: avgRating,
        SpotImages: spotImages,
        owner: owner
    }

    return res.status(200).json({
        ...spotData
    });
} );

//Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address, 
        city, 
        state, 
        country, 
        lat, 
        lng,
        name, 
        description, 
        price,
    });

    return res.status(201).json(newSpot);
})




module.exports = router;