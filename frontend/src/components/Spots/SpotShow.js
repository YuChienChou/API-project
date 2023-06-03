import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailedSpotThunk } from '../../store/spots';
import SpotReviews from '../Reviews/SpotReviews';
// import CreateReviewModal from "../CreateReviewModal/CreateReviewModal";
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './Spots.css';

const SpotShow = () => {
    const { spotId } = useParams();
    const user = useSelector((state) => state.session.user);
 
    const spot = useSelector((state) => state.spots[spotId]);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailedSpotThunk(spotId));
    }, [dispatch, spotId]);

    // console.log('spotImages in spotshow: ', spot.SpotImages);

    if(!spot || !spot.SpotImages) return null;

    const imgList = [];
    for (let i = 0; i < spot.SpotImages.length; i++) {
        imgList.push(spot.SpotImages[i].url);
    }
    

    return (
        <>
        <div className="spotshow-container">
            <h2>{spot.name}</h2>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <div className="spot-image-container">
                <li id='img1'><img src={imgList[0]} alt="" /></li>
                <li id='img2'><img src={imgList[1]} alt="" /></li>
                <li id='img3'><img src={imgList[2]} alt="" /></li>
                <li id='img4'><img src={imgList[3]} alt="" /></li>
                <li id='img5'><img src={imgList[4]} alt="" /></li>
            </div>
                
            <div className="host-details"> 
                <div>
                    <h3>{`Hosted by ${spot.owner.firstName} ${spot.owner.lastName}`}</h3>
                    <p>{spot.description}</p>
                </div>
                <div id='price-review'>
                    <p id='price'>${spot.price} night</p>
                    <p className='rating' id='review'><i className="fa-solid fa-star"></i>{spot.aveStarRating} - New</p>
                    <button 
                    id='reserve-button'
                    onClick={() => {alert("feature coming soon")}}
                    >reserve</button>
                </div>
            </div>
                <SpotReviews spot={spot}/>
        </div>
        </>
    )


}

export default SpotShow;