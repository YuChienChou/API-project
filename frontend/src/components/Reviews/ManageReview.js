import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { thunkGetCurrentUserReview } from '../../store/reviews';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from '../DeleteReviewModal/deleteReviewModal';


export default function ManageReviews() {

    const currentUserReviewStore = useSelector((state) => state.reviews);
    console.log("currentUserReviewStore in ManageReview: ", currentUserReviewStore);
    const currentUserReviews = Object.values(currentUserReviewStore);
    console.log("currentUserReviews-1 in ManageReviews: ", currentUserReviews);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetCurrentUserReview());
    }, [dispatch]);

    //if the currentUserReviews array is empty and the obj inside of the array doesn't have 
    // a Spot key, return null to run the useEffect();
    if(!currentUserReviews.length || !currentUserReviews[0].Spot) return null;
    

    return (
        <>
        {currentUserReviews && currentUserReviews.map((review) => (
            <li key={review.id}>
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
                <div>
                    {review.review}
                </div>
                <button>Update</button>
                <button id='delete-review-button'>
                    <OpenModalMenuItem
                        modalComponent={<DeleteReviewModal spot={review.Spot} review={review}/>}
                        itemText='Delete'
                    />
                </button>
                {/* <DeleteReviewModal /> */}
            </li>
        ))}
        </>
    )
}