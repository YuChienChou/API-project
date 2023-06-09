const express = require('express');
const { Sequelize, json } = require('sequelize');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { route } = require('./spots');
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
    // check('lat')
    //   .exists({ checkFalsy: true })
    //   .isDecimal({force_decimal: true})
    //   .isFloat({min: 90, max: 90})
    //   .isNumeric()
    //   .withMessage('Latitude is not valid'),
    // check('lng')
    //   .exists({ checkFalsy: true })
    //   .isDecimal({force_decimal: true})
    //   .isFloat({min: 90, max: 90})
    //   .isNumeric()
    //   .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
    //   .withMessage('Name must be less than 50 characters') //a new spot can be edit without name
      .isLength({max: 50})
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .isLength({ min: 30 })
      .withMessage('Description needs 30 or more characters'),
    check('price')
      .exists({ checkFalsy: true })
    //   .isNumeric() //in live server, a new spot can be created with no issue if the price is not a number
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];

  const validateReview = [
    check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
    check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];



//get all spots
router.get('/', async (req, res, next) => {
    let query = {
        where: {},
    };

    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice, name, startDate, endDate} = req.query;

    // console.log("~~~~~~~~~~~query in Rout: ~~~", req.query);
    
    if(!page) page = 1;
    if(!size) size = 100; 
    if(page > 10) page = 10;
    if(size > 20) size = 100;

    page = parseInt(page);
    size = parseInt(size);

    if(page >= 1 && size >= 1) {
        query.limit = size;
        query.offset = size * (page -1);
    };


    let errors = {};
    if(minLat) {
        if (isNaN(minLat)) errors.minLat = {message: "Minimum latitude is invalid"};
    };

    if(maxLat) {
        if (isNaN(maxLat)) errors.maxLat ={message: "Maximum latitude is invalid"};
    };
    
    if(minLng) {
        if (isNaN(minLng)) errors.minLng ={message: "Minimum longitude is invalid"};
    };
    
    if(maxLng) {
        if (isNaN(maxLng)) errors.maxLng ={message: "Maximum longitude is invalid"};
    };
    
    if(minPrice) {
       if(isNaN(minPrice) || minPrice < 0) errors.minPrice = {message: "Minimum price must be greater than or equal to 0"}; 
    };

    if(maxPrice) {
        if(isNaN(maxPrice) || maxPrice < 0) errors.maxPrice = {message: "Maximum price must be greater than or equal to 0"};
    }; 
    
    if(Object.keys(errors).length > 0) {
        return res.status(400).json({
            errors
        });
    }; 

    if(minLat) minLat = parseInt(minLat);
    if(maxLat) maxLat = parseInt(maxLat);
    if(minLng) minLng = parseInt(minLng);
    if(maxLng) maxLng = parseInt(maxLng);
    
    if(minLat) query.where.lat = {[Op.gte]: (minLat)};
    if(maxLat) query.where.lat = {[Op.lte]: (maxLat)};
    if(minLat && maxLat) query.where.lat = {[Op.between]: [(minLat), (maxLat)]};
    
    if(minLng) query.where.lng = {[Op.gte]: (minLng)};
    if(maxLng) query.where.lng = {[Op.lte]: (maxLng)};
    if(minLng && maxLng) query.where.lng = {[Op.between]: [(minLng), (maxLng)]};

    if(minPrice) query.where.price = {[Op.gte]: (minPrice)} ;
    if(maxPrice) query.where.price = {[Op.lte]: (maxPrice)} ;
    if(minPrice && maxPrice) query.where.price = {[Op.between]: [(minPrice), (maxPrice)]};

    if(name) query.where.name = {[Op.like]: (`%${name}%`)};

    let spotResults;

    console.log("startDate and endDate not in the if statement", {startDate, endDate})
    if (startDate && endDate) {
        console.log("startDate and endDate", {startDate, endDate})
        const spots = await Spot.findAll({
          include: [
            {
              model: Booking,
              attributes: ['id', 'startDate', 'endDate'],
              where: {
                [Op.or]: [
                  {
                    startDate: {
                      [Op.gt]: new Date(endDate)
                    }
                  },
                  {
                    endDate: {
                      [Op.lt]: new Date(startDate)
                    }
                  }
                ]
              },
            }
          ],
          where: {
            '$Bookings.id$': null // Include spots that have no bookings
          }
        });
        spotResults = spots;
      } else {
        const spots = await Spot.findAll(query);
        spotResults = spots;
      }


    // const spots = await Spot.findAll(query);
    // console.log("spots in spots ROUTE: ", spots);
 

    const payload = [];

    for(let i = 0; i <spotResults.length; i++) {
        let spot = spotResults[i];

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
        
        // const avgRating = (totalRating / totalSpots).toFixed(1);
        const avgRatingVal = totalRating / totalSpots;
        const avgRating = parseFloat(avgRatingVal); // 
  
        

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
        Spots: payload,
        page,
        size
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

    let previewImage = await SpotImage.findOne({
        where: {
            spotId: spot.id,
            preview: true},
        attributes: ['url']
    });

    if(previewImage) {
        previewImage = previewImage.url;
    } else {
        previewImage = null;
    }

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
    
    // avgRating = (totalRating / totalSpots).toFixed(1);
    const avgRating = (totalRating / totalSpots);

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

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async(req, res, next) => {
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        return res.status(404).json({message: 'Spot couldn\'t be found'});
    };

    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    };
    
    const newImage = await SpotImage.create({
        spotId: spot.id,
        url, 
        preview
    });

    return res.status(200).json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    });
});

//Edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);
    
    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    };

    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    };

    if(address) spot.address = address;
    if(city) spot.city = city;
    if(state) spot.state = state;
    if(country) spot.country = country;
    if(lat) spot.lat = lat;
    if(lng) spot.lng = lng;
    if(name) spot.name = name;
    if(description) spot.description = description;
    if(price) spot.price = price;

    await spot.save();

    return res.status(200).json(spot);

});

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        return res.status(404).json({message: "Spot couldn't be found"});
    };

    if(spot.ownerId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    };

    await spot.destroy();//json
    
    return res.status(200).json({message: "Successfully deleted"});
});


//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    };

    const reviews = await Review.findAll({
        where: {
            spotId: spot.id
        }, 
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: ReviewImage, attributes: ['id', 'url']}
        ]
    });

    return res.status(200).json({
        Reviews: reviews});

});

//Create a Review for a Spot based on the Spot's id

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    };

    const oldReview = await Review.findOne({
        where: {
            spotId: spot.id,
            userId: req.user.id
        }
    });

    if(oldReview) {
        return res.status(403).json({
            message: "User already has a review for this spot"
        });
    };

    const newReview = await Review.create({
        spotId: spot.id,
        userId: req.user.id,
        review,
        stars
    });

    return res.status(201).json(newReview);

});

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    };

    if(spot.ownerId !== req.user.id) {
        const bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ['spotId', 'startDate', 'endDate', 'id']
        });

        return res.status(200).json({Bookings: bookings});
    } 

    if(spot.ownerId === req.user.id) {
        const bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            include: [{model: User, attributes: ['id', 'firstName', 'lastName']}]
        });

        return res.status(200).json({Bookings: bookings});
    }
});

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const { startDate, endDate } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        return res.status(404).json({message: "Spot couldn't be found"});
    };

    if(spot.ownerId === req.user.id) {
        return res.status(400).json({
            message: 'You are the spot owner!'
        })
    }

    const checkStartDate = await Booking.findOne({
        where: {
            spotId: spot.id,
            startDate: {[Op.lte]: startDate },
            endDate: {[Op.gte]: startDate},
        }
    });

    if(checkStartDate) {
        const err = new Error('Sorry, this spot is already booked for the specified dates');
        err.error = {
            startDate: "Start date conflicts with an existing booking",
        }

        return res.status(403).json({
            message: err.message,
            errors: err.error
        });
    };

    const checkEndDate = await Booking.findOne({
        where: {
            spotId: spot.id,
            startDate: {[Op.lte]: endDate},
            endDate: {[Op.gte]: endDate}
        }
    });

    if(checkEndDate) {
        const err = new Error('Sorry, this spot is already booked for the specified dates');
        err.error = {
            startDate: "End date conflicts with an existing booking",
        }

        return res.status(403).json({
            message: err.message,
            errors: err.error
        });
    }

    const checkBothDate = await Booking.findOne({
        where: {
            spotId: spot.id,
            startDate: {[Op.gte]: startDate},
            endDate: {[Op.lte]: endDate}
        }
    });

    if(checkBothDate) {
        const err = new Error('Sorry, this spot is already booked for the specified dates');
        err.error = {
            startDate: "schedule conflict with an existing booking",
        }

        return res.status(403).json({
            message: err.message,
            errors: err.error
        });
    };

    const newBooking = await Booking.create({
        spotId: spot.id,
        userId: req.user.id,
        startDate,
        endDate,
    });

    console.log("newBooking in the route: ", newBooking);

    return res.status(200).json(newBooking)

});


module.exports = router;