import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailedSpotThunk } from '../../store/spots';
import './Spots.css';

const SpotShow = () => {
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots[spotId]);
    console.log("spot in SpotShow: ", spot);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailedSpotThunk(spotId));
    }, [dispatch]);

    if(!spot) return null;

    const imgLi = () => {
        const imgs = [];
        for (let i = 0; i < 5; i++) {
            // if(!spot.SpotImages) return null;
            
            if(spot.SpotImages[i]) {
               imgs.push(spot.SpotImages[i].url); 
            } else {
                imgs.push("Coming Soon")
            }
        }

        return imgs;
    };

    const imgList = imgLi();

    // console.log("img list: ", imgLi());
    // console.log("img 1: ", imgList[1]);

    return (
        <>
        <div className="spotshow-container">
            <h2>{spot.name}</h2>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <div className="spot-image-container">
                <li id='img1'><img src={imgList[0]} alt={imgList[0]} /></li>
                <li id='img2'><img src={imgList[1]} alt={imgList[1]} /></li>
                <li id='img3'><img src={imgList[2]} alt={imgList[2]} /></li>
                <li id='img4'><img src={imgList[3]} alt={imgList[3]} /></li>
                <li id='img5'><img src={imgList[4]} alt={imgList[4]} /></li>
            </div>
                
            <div className="host-details"> 
                <div>
                    <h3>{`Hosted by ${spot.owner.firstName} ${spot.owner.lastName}`}</h3>
                </div>
                <div id='price-review'>
                    <p id='price'>${spot.price} night</p>
                    <p className='rating' id='review'><i className="fa-solid fa-star"></i>{spot.aveStarRating} - {spot.numReviews} reviews</p>
                    <button id='reserve-button'>reserve</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default SpotShow;