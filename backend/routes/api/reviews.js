const express = require('express');
const { Sequelize, json } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const router = express.Router();


//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id,
        },
        include: [
            {model: User, attributes: ['firstname', 'lastName']},
            {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']},
            {model: ReviewImage, attributes: ['id', 'url']}
        ]
    });

    // console.log(reviews);

    for (let i = 0; i < reviews.length; i++) {

        const review = reviews[i];
        const spot = review.Spot;

        // console.log(spot); //check it in the terminal!!!!

        let previewImage = await SpotImage.findOne({where: {spotId: spot.id
        }});

        if(previewImage) {
            previewImage = previewImage.url
        } else {
            previewImage = null
        };

        spot.dataValues.previewImage = previewImage; //check in the terminal fo rthe previewImage!!!

    }
    
    return res.status(200).json({
        Reviews: reviews
    });

});







module.exports = router;