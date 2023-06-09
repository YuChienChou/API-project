import { useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailedSpotThunk } from '../../store/spots';
import { loadBookingThunk } from '../../store/booking';
import SpotReviews from '../Reviews/SpotReviews';
import BookingIndex from "../Bookings/BookingIndex";
import './Spots.css';
import { actionClearReview } from "../../store/reviews";


const SpotShow = () => {
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.singleSpot[spotId]);    
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchDetailedSpotThunk(spotId));
        dispatch(loadBookingThunk(spotId));
        
        // console.log("clear review action is running in SpotShow");

        return () =>{
            // console.log("actionClearReview in the useEffect in SpotShow is running");
            dispatch(actionClearReview());
            // dispatch(actionClearSpot());
        }
        
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
                <li id='previewImage'><img src={imgList[0]} alt="" /></li>
                <li id='img1'><img src={imgList[1]} alt="" /><p className="no-image-text">{imgList[1] ? "" : "Image coming soon!"}</p></li>
                <li id='img2'><img src={imgList[2]} alt="" /><p className="no-image-text">{imgList[2] ? "" : "Image coming soon!"}</p></li>
                <li id='img3'><img src={imgList[3]} alt="" /><p className="no-image-text">{imgList[3] ? "" : "Image coming soon!"}</p></li>
                <li id='img4'><img src={imgList[4]} alt="" /><p className="no-image-text">{imgList[4] ? "" : "Image coming soon!"}</p></li>
            </div>
                
            <div className="host-details"> 
                <div>
                    <h3>{`Hosted by ${spot.owner.firstName} ${spot.owner.lastName}`}</h3>
                    <p>{spot.description}</p>
                </div>
                <div id='price-review'>
                    <p id='price'>${spot.price} /night</p>
                    <div className='rating' id='review'>
                        <i className="fa-solid fa-star">
                            </i>{spot.aveStarRating && spot.aveStarRating.toFixed(1)} 
                            <i className="fa-solid fa-circle" id='aveStartRating-dot'></i> 
                                {(() => {
                                    if(spot.numReviews === 0) return <p>new</p>
                                    else if(spot.numReviews === 1) return <p>1 review</p>
                                    else {return <p>{spot.numReviews} reviews</p>}
                                })()}
                    </div>
                    <button 
                    id='reserve-button'
                    onClick={() => {
                       history.push(`/spots/${spot.id}/bookings`)}}
                   
                    >reserve</button>

        
                </div>
                
            </div>
                <SpotReviews spot={spot}/>
        </div>
        </>
    )


}

export default SpotShow;