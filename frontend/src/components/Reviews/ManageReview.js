import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { thunkGetCurrentUserReview, actionClearReview } from '../../store/reviews';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from '../DeleteReviewModal/deleteReviewModal';
import EditReviewModal from '../EditReviewModal/EditReviewModal';
import './ManageReview.css';


export default function ManageReviews() {

    const currentUserReviewStore = useSelector((state) => state.reviews);
    // console.log("currentUserReviewStore in ManageReview: ", currentUserReviewStore);
    const currentUserReviews = Object.values(currentUserReviewStore);
    // console.log("currentUserReviews in ManageReviews: ", currentUserReviews);
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(actionClearReview());
        // console.log("actionClearReview run in ManageReview");
        dispatch(thunkGetCurrentUserReview());
        console.log("thunkGetCurrentUserReview run in ManageReview");
        // return () => dispatch(actionClearReview());
    }, [dispatch]);

    //if the currentUserReviews array is empty and the obj inside of the array doesn't have 
    // a Spot key, return null to run the useEffect();
    // if(!currentUserReviews.length || !currentUserReviews[0].Spot) return null;
    if(!currentUserReviews.length) {
        console.log("guard is running");
        return null;}


    // for (let i = 0; i < currentUserReviews.length;  i++) {
    //     if(!currentUserReviews.length || !currentUserReviews[i].Spot) return null;
    // }

    return (
        <>
        <div id='current-user-review-div'>
            <h2>Manage Reviews</h2>
            {currentUserReviews && currentUserReviews.map((review) => (
                <li key={review.id} id='current-user-reviews-list'>
                    <h3>{review.Spot.name}</h3>
                    {(() => {
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
                    <p id='review-content'>
                        {review.review}
                    </p>
                    <div id='manage-review-buttons'>
                        <button id='update-review-button'>
                            <OpenModalMenuItem
                                    modalComponent={<EditReviewModal review={review}/>}
                                    itemText='Update'
                            />
                        </button>
                        <button id='delete-review-button'>
                            <OpenModalMenuItem
                                modalComponent={<DeleteReviewModal spot={review.Spot} review={review}/>}
                                itemText='Delete'
                            />
                        </button>
                    </div>
                </li>

            ))}

       </div>
        </>
    )
}