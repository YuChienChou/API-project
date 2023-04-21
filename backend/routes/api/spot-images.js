const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, SpotImage } = require('../../db/models');

const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');

const router = express.Router();

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const image = await SpotImage.findByPk(req.params.imageId);

    if(!image) {
        return res.status(404).json({
            message: "Spot Image couldn't be found"
        });
    };

    const spot = await Spot.findOne({
        where: {
            id: image.spotId
        }
    });

    // console.log(spot); 
    if(spot.ownerId !== req.user.id) {
        const err = new Error('Authentication required');
        err.status = 400;
        return next(err);
    };

    await image.destroy();

    return res.status(200).json({
        message: "Successfully deleted"
    });

});


module.exports = router;
