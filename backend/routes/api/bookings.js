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
        // console.log(typeof booking.dataValue.startDate);
        const spot = booking.Spot;

        // console.log(spot); //check it in the terminal!!!!

        let previewImage = await SpotImage.findOne({where: {spotId: spot.id
        }});

        if(previewImage) {
            previewImage = previewImage.url
        } else {
            previewImage = null
        };

        spot.dataValues.previewImage = previewImage; //check in the terminal for the previewImage!!!

    };

    return res.status(200).json({Bookings: bookings});
});


//Edit a Booking
router.put('/:bookingId', requireAuth, async(req, res, next) => {
    const { startDate, endDate } = req.body;

    const booking = await Booking.findByPk(req.params.bookingId);

    if(!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        });
    };

    if(booking.userId !== req.user.id) {
        const err = new Error('Authentication required');
        err.status = 400;
        return next(err);
    };

    if(startDate) booking.startDate = startDate;
    if(endDate) booking.endDate = endDate;

    await booking.save();

    return res.status(200).json(booking);
})




module.exports = router;

