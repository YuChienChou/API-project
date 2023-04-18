const express = require('express');
const { Sequelize } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review } = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();
    const payload = [];

    for(let i = 0; i <spots.length; i++) {
        const spot = spots[i];

        const previewImage = await SpotImage.findByPk(spot.id, {
            attributes: ['url']
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
            previewImage: previewImage.url,
            
        };
        payload.push(spotData);
    }
    
    return res.status(200).json({
        Spots: payload
    });
});




module.exports = router;