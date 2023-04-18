const express = require('express');
const { Sequelize } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');
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

router.get('/:id', async (req, res, next) => {
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId);

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
} )




module.exports = router;