const express = require('express');
const { Sequelize, json } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const router = express.Router();

const validateReview = [
    check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
    check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];


//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id,
        },
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
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

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async(req, res, next) => {
    const { url } = req.body;


    const review = await Review.findByPk(req.params.reviewId);

    if(!review) {
        return res.status(404).json({message: "Review couldn't be found"});
    }

    if(review.userId !== req.user.id) {
        const err = new Error('Authentication required');
        err.status = 400;
        return next(err);
    };

    const allImages = await ReviewImage.findAll({
        where: {
            reviewId: review.id
        }
    });

    if(allImages.length >= 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        })
    } else {
        const newImage = await ReviewImage.create({
                reviewId: review.id,
                url
            });

        return res.status(200).json({
            id: newImage.id,
            url: newImage.url
        });
    }

});


//Edit a Review

router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body;

    const reviewToBeUpdated = await Review.findByPk(req.params.reviewId);
    
    if(!reviewToBeUpdated) {
        return res.status(404).json({
            message: "Review couldn't be found"
        });
    };

    if(reviewToBeUpdated.userId !== req.user.id ) {
        const err = new Error('Authentication required');
        err.status = 400;
        return next(err);
    };

    if(review) reviewToBeUpdated.review = review;
    if(stars) reviewToBeUpdated.stars = stars;

    await reviewToBeUpdated.save();

    return res.status(200).json(reviewToBeUpdated);

});


//Delete a Review
router.delete('/:reviewId', requireAuth, async(req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);

    if(!review) {
        return res.status(404).json({
            message: "Review couldn't be found"
        });
    };

    if(review.userId !== req.user.id) {
        const err = new Error('Authentication required');
        err.status = 400;
        return next(err);
    };

    await review.destroy();

    return res.status(200).json({
        message: "Successfully deleted"
    });

});



module.exports = router;