const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req, res, next) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']}]
    });

    console.log(bookings);

    for (let i = 0; i < bookings.length; i++) {

        const booking = bookings[i];
        const spot = booking.Spot;

        // console.log(spot); //check it in the terminal!!!!

        let previewImage = await SpotImage.findOne({where: {spotId: spot.id
        }});

        if(previewImage) {
            previewImage = previewImage.url
        } else {
            previewImage = null
        };

        spot.dataValues.previewImage = previewImage; //check in the terminal fo rthe previewImage!!!

    };

    return res.status(200).json({Bookings: bookings});
});





module.exports = router;

