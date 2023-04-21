const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, SpotImage } = require('../../db/models');

const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');

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

    const bookingToUpdate = await Booking.findByPk(req.params.bookingId);

    if(!bookingToUpdate) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        });
    };

    if(bookingToUpdate.userId !== req.user.id) {
        const err = new Error('Authentication required');
        err.status = 400;
        return next(err);
    };

    const currentDate = new Date();
    // console.log('currentDate', currentDate);
    // console.log(bookingToUpdate.endDate);
    if(bookingToUpdate.endDate <= currentDate) {
        return res.status(400).json({
            message: "Past bookings can't be modified"
        });
    };

    const spot = await Spot.findOne({
        where: {
            id: bookingToUpdate.spotId
        }
    }); 


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


    if(startDate) bookingToUpdate.startDate = startDate;
    if(endDate) bookingToUpdate.endDate = endDate;

    await bookingToUpdate.save();

    return res.status(200).json(bookingToUpdate);
});


//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res, next) =>{
    const bookingToDelete = await Booking.findByPk(req.params.bookingId);

    if(!bookingToDelete) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        });
    };

    if(bookingToDelete.userId !== req.user.id) {
        const err = new Error('Authentication required');
        err.status = 400;
        return next(err);
    };

    const currentDate = new Date();
    if(bookingToDelete.startDate <= currentDate) {
        return res.status(400).json({
            message: "Bookings that have been started can't be deleted"
        });
    };

    await bookingToDelete.destroy();

    return res.status(200).json({
        message: 'Successfully deleted'
    });
});



module.exports = router;

