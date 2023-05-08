import { useDispatch, useSelector } from 'react-redux';
import { loadSpotsThunk } from '../../store/spots';
import { useEffect } from 'react';

const SpotsIndex = () => {
    const spotsStore =useSelector((state) => state.spots);
    const spots = Object.values(spotsStore);

    console.log('SPOTS IN SPOTSINDEX: ', spots);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSpotsThunk());
    }, [dispatch]);

    if(spots.length < 1) return null;

    return (
        <>
            {spots.map((spot) => (
                // {console.log("spot in spots.map funtion: ", spot)}
                <li key={spot.id}>
                    <img src={spot.previewImage} alt=""/> 
                    <p>{spot.city}, {spot.state}</p>
                    <p>{spot.avgRating}</p>
                    <p>${spot.price} night</p>
                </li>
                )
            )}
        </>
    );
};


export default SpotsIndex;
