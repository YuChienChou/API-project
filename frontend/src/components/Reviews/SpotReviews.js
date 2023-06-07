import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionClearReview, loadReviewsThunk, thunkGetCurrentUserReview } from "../../store/reviews";
import CreateReviewModal from "../CreateReviewModal/CreateReviewModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "../DeleteReviewModal/deleteReviewModal";
import EditReviewModal from "../EditReviewModal/EditReviewModal";
import './SpotReviews.css';
import { fetchDetailedSpotThunk, actionClearSpot } from "../../store/spots";


const SpotReviews = ({ spot }) => {

    
    // const { spotId } = useParams();
    // console.log("spot in SpotReviews: ", spot);
    const reviewsStore = useSelector((state) => state.reviews);
    // console.log("reviewsStore in spotreviews: ", reviewsStore);
    const reviews = Object.values(reviewsStore);
    const user = useSelector((state) => state.session.user);
    // console.log("reviews in SpotReviews: ", reviews);
    const dispatch = useDispatch();

    // const userReview = reviews.find((review) => review.userId === user.id);
    // const userReviews = dispatch(thunkGetCurrentUserReview());
    // console.log("userReviews in SpotReview: ", userReviews);


    useEffect(() => {
        dispatch(fetchDetailedSpotThunk(spot.id));
        // console.log("loadReviewsThunk runs in SpotReview");
        dispatch(loadReviewsThunk(spot.id));

        return () => {
            dispatch(actionClearReview());
        }
        
        // dispatch(thunkGetCurrentUserReview());
    }, [dispatch, spot.id]);


    // if(!reviews || !reviews[reviews.length-1].User) return null;

    // if(!user) {
        return (
            <>
               <div> 
                {(()=> {
                    if(spot.numReviews === 0) { 
                        return <h3 className='spot-review'><i className="fa-solid fa-star"></i>New</h3>
                    } else if (spot.numReviews === 1) {
                        return <h3 className='spot-review'><i className="fa-solid fa-star"></i>{spot.aveStarRating && spot.aveStarRating.toFixed(1)} <i className="fa-solid fa-circle" id='spot-review-dot'></i> 1 review</h3>
                    }else {
                        return <h3 className='spot-review'><i className="fa-solid fa-star" ></i>{spot.aveStarRating && spot.aveStarRating.toFixed(1)} <i className="fa-solid fa-circle" id='spot-review-dot'></i> {spot.numReviews && spot.numReviews} reviews</h3>
                    }
                })()}
            </div>
            
            <div>
                {(() => {
                    if(user && user.id !== spot.ownerId  && (!reviews.find((review) => review.userId === user.id))) {
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
                   {reviews && reviews.reverse().map((review) => (
                    <li key={review.id}
                        id='single-spot-review'
                    >
                        <h4>{review.User ? review.User.firstName : null}</h4>
                        {(() => {
                            // console.log("review createdAt date in SpotReview: ", review.createdAt);
                            const month = {
                                "01": "Jan",
                                "02": "Feb",
                                "03": "Mar",
                                "04": "Apr",
                                "05": "May",
                                "06": "Jun",
                                "07": "Jul",
                                "08": "Aug",
                                "09": "Sep",
                                "10": "Oct",
                                "11": "Nov",
                                "12": "Dec"
                            }

                            return <p>{month[review.createdAt.split("-")[1]]} {review.createdAt.split("-")[0]}</p>
                        })()}
                        <p id='review-content'>{review.review}</p>
                        <div id='review-update-delete-div'>
                            {user && review.userId === user.id ? 
                                <button id='update-review-button'>
                                <OpenModalMenuItem
                                        modalComponent={<EditReviewModal spot={spot} review={review}  />}
                                        itemText='Update'
                                />
                            </button> : <></>}
                            {(() => {
                                if(user && review.userId === user.id) {
                                    // return <DeleteReview spot={spot} review={review} />
                                    return <button id='delete-review-button'>
                                    <OpenModalMenuItem
                                        modalComponent={<DeleteReviewModal spot={spot} review={review}/>}
                                        itemText='delete' 
                                        
                                        /></button>
                                }
                            })()}
                        </div>
                        
                      
                    </li>
                ))}
                </ul>
            </div>
            <div>
                {(() => {
                    if(!user) {
                        return <p>Please log in to leave a review</p>
                    } else if (spot.numReviews === 0 && user && user.id !== spot.ownerId) {
                        return <p>Be the first to post a review!</p>
                    } else {
                        return null;
                    }
                })()}
            </div>


            </>
        )
    
};

export default SpotReviews;


