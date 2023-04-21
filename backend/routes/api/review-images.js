const express = require('express');
const { Sequelize, json } = require('sequelize');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { route } = require('./spots');
const router = express.Router();


router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const image = await ReviewImage.findByPk(req.params.imageId); 

    if(!image) {
        return res.status(404).json({
            message: "Review Image couldn't be found"
        });
    };

    const review = await Review.findOne({
        where: {
            id: image.reviewId
        }
    });

    if(review.userId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        });
    };

    await image.destroy();

    return res.status(200).json({
        message: "Successfully deleted"
    });
});

module.exports = router;