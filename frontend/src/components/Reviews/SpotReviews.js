import { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { loadReviewsThunk } from "../../store/reviews";
import CreateReviewModal from "../CreateReviewModal/CreateReviewModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './SpotReviews.css';


const SpotReviews = ({ spot }) => {
    const { spotId } = useParams();
    console.log("spot in SpotReviews: ", spot)
    const reviewsStore = useSelector((state) => state.reviews);
    console.log("reviewsStore in spotreviews: ", reviewsStore);
    const reviews = Object.values(reviewsStore);
    console.log("reviews in SpotReviews: ", reviews);
    const user = useSelector((state) => state.session.user);
    // console.log("reviews in reviewindex: ", reviews);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadReviewsThunk(spotId));
    }, [dispatch, spotId]);

    if(!reviews) return null;

    // if(!user) {
        return (
            <>
               <div> 
                {(()=> {
                    if(spot.numReviews === 0) { 
                        return <h3 className='spot-review'><i className="fa-solid fa-star"></i>New</h3>
                    } else if (spot.numReviews === 1) {
                        return <h3 className='spot-review'><i className="fa-solid fa-star"></i>{spot.aveStarRating} - {spot.numReviews} review</h3>
                    }else {
                        return <h3 className='spot-review'><i className="fa-solid fa-star"></i>{spot.aveStarRating} - {spot.numReviews} reviews</h3>
                    }
                })()}
            </div>
            <div>
                {(() => {
                    if(!user) {
                        return <p>Please log in to leave a review</p>
                    } else if (spot.numReviews === 0 && user && user.id !== spot.ownerId) {
                        return <p>Be the first to post a review!</p>
                    } 
                })()}
            </div>
            <div>
                {(() => {
                    if(user && user.id !== spot.ownerId) {
                        return <button id='post-review-button'>
                        <OpenModalMenuItem
                            modalComponent={<CreateReviewModal spot={spot} user={user}/>}
                            itemText='Post Your Review' 
                            
                            /></button>
                    }
                })()}
            </div>
            <div>
                
                <ul>
                   {reviews.map((review) => (
                    <li key={review.id}
                        id='single-spot-review'
                    >
                        <h4>{review.User.firstName}</h4>
                        <p>{review.createdAt.split("-")[1]} {review.createdAt.split("-")[0]}</p>
                        <p>{review.review}</p>
                        {(() => {
                        if(user && review.userId === user.id) {
                            return <button>Delete Review</button>
                        }
                        })()}
                    </li>
                ))}
                </ul>
            </div>
            </>
        )
    
};

export default SpotReviews;


