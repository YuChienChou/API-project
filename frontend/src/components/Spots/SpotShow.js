import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailedSpotThunk } from '../../store/spots';
import SpotReviews from '../Reviews/SpotReviews';
import CreateReviewModal from "../CreateReviewModal/CreateReviewModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './Spots.css';

const SpotShow = () => {
    const { spotId } = useParams();
    const user = useSelector((state) => state.session.user);
    // console.log("user in spotshow: ", user);
    // console.log("user id in spotshow: ", user.id);
 
    const spot = useSelector((state) => state.spots[spotId]);
    // console.log("Spot in SpotShow: ", spot);
    // console.log("spot owner id in spotshow: ", spot.ownerId);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailedSpotThunk(spotId));
    }, [dispatch, spotId]);

    // console.log('spotImages in spotshow: ', spot.SpotImages)

    if(!spot || !spot.SpotImages) return null;

    const imgList = [];
    for (let i = 0; i < spot.SpotImages.length; i++) {
        imgList.push(spot.SpotImages[i].url);
    }
    
    // const reserverButtonAlert = () => {

    // }
    if(!user) {
        return (
            <>
            <div className="spotshow-container">
                <h2>{spot.name}</h2>
                <p>{spot.city}, {spot.state}, {spot.country}</p>
                <div className="spot-image-container">
                    {/* {spot.SpotImages.map((img) => (
                        <li key={img.id}>
                            <img src={img.url} alt='' />
                        </li>
                    ))} */}
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
                <div> 
                    {(()=> {
                        if(spot.numReviews === 0) { 
                            return <h3 className='spot-review'><i className="fa-solid fa-star"></i>New</h3>
                        } else {
                            return <h3 className='spot-review'><i className="fa-solid fa-star"></i>{spot.aveStarRating} - {spot.numReviews} reviews</h3>
                        }
                    })()}
                    {/* {(() => {
                        if(user && user.id !== spot.ownerId) {
                            return <button>
                            <OpenModalMenuItem
                                modalComponent={<CreateReviewModal />}
                                itemText='Post Your Review' 
                                />
                            </button>
                        } else if(!user) {
                            return <p>Please log in to leave a review</p>
                        }
                    })()} */}
                    
                    <SpotReviews />
                </div>
                
            </div>
            </>
        )
    } else if (user && user.id !== spot.ownerId) {
        return (
        <>
        <div className="spotshow-container">
            <h2>{spot.name}</h2>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <div className="spot-image-container">
                {/* {spot.SpotImages.map((img) => (
                    <li key={img.id}>
                        <img src={img.url} alt='' />
                    </li>
                ))} */}
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
            <div> 
                {(()=> {
                    if(spot.numReviews === 0) { 
                        return <h3 className='spot-review'><i className="fa-solid fa-star"></i>New</h3>
                    } else {
                        return <h3 className='spot-review'><i className="fa-solid fa-star"></i>{spot.aveStarRating} - {spot.numReviews} reviews</h3>
                    }
                })()}
                {/* {(() => {
                    if(user && user.id !== spot.ownerId) {
                        return <button id='post-review-button'>
                        <OpenModalMenuItem
                            modalComponent={<CreateReviewModal />}
                            // itemText='Post Your Review' 
                            />
                        Post Your Review</button>
                    }
                })()} */}

                        <button id='post-review-button'>
                        <OpenModalMenuItem
                            modalComponent={<CreateReviewModal />}
                            // itemText='Post Your Review' 
                            />
                        Post Your Review</button>
                
                <SpotReviews />
            </div>
            
        </div>
        </>
    )
    } else {
        return (
            <>
            <div className="spotshow-container">
                <h2>{spot.name}</h2>
                <p>{spot.city}, {spot.state}, {spot.country}</p>
                <div className="spot-image-container">
                    {/* {spot.SpotImages.map((img) => (
                        <li key={img.id}>
                            <img src={img.url} alt='' />
                        </li>
                    ))} */}
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
                <div> 
                    {(()=> {
                        if(spot.numReviews === 0) { 
                            return <h3 className='spot-review'><i className="fa-solid fa-star"></i>New</h3>
                        } else {
                            return <h3 className='spot-review'><i className="fa-solid fa-star"></i>{spot.aveStarRating} - {spot.numReviews} reviews</h3>
                        }
                    })()}
                    {/* {(() => {
                        if(user && user.id !== spot.ownerId) {
                            return <button>
                            <OpenModalMenuItem
                                modalComponent={<CreateReviewModal />}
                                itemText='Post Your Review' 
                                />
                            </button>
                        } else if(!user) {
                            return <p>Please log in to leave a review</p>
                        }
                    })()} */}
                    
                    <SpotReviews />
                </div>
                
            </div>
            </>
        )
    }
    
    
}

export default SpotShow;