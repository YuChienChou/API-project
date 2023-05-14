import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCurrentUserSpotsThunk } from "../../store/spots";
import './ManageSpot.css';


const ManageSpot = () => {
    // const history = useHistory(); 
    // const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    // const spotStore = useSelector((state) => state.spots);
    // console.log('spotStore in manageSpot: ', spotStore);
    // const userSpots = Object.values(spotStore);
    // console.log('user spots in manage spots: ', userSpots);
   
    // const spots = dispatch(getCurrentUserSpotsThunk(user));
    
    
    console.log("user in managespot: ", user);
    const spotsStore = useSelector((state) => state.spots);
    console.log("spotsStore in managespot: ", spotsStore);
    const spots = Object.values(spotsStore);
    console.log("spots in managespot: ", spots);
    const userSpots = spots.filter((spot) => spot.ownerId === user.id);
    console.log("userSpots in manageSpot: ", userSpots);


    // useEffect(() => {
    //     dispatch(getCurrentUserSpotsThunk(user));
    // }, [dispatch, user]);

    if(spots.length < 1) return null;

    // if(spots.length < 1 ) {
    //         return (
    //             <>
    //         <h2>Manage Spots</h2>
    //         <Link to='/spots/new'>
    //         <button>Create a New Spot</button>
    //         </Link>
    //         </>
    //         )
    //     } else {
             return (
                <>
                <div id='manage-spot-container'>
                    <h2>Manage Spots</h2>
                    <Link to='/spots/new'>
                        <button id='manage-spot-create-spot-button'>Create a New Spot</button>
                    </Link>
                    <div id='manage-spot-spot-container'>
                        {userSpots.map((spot) => (
                            <li key={spot.id} className='manage-spot-spot-li'>
                                <Link key={spot.id} to={`/spots/${spot.id}`}> 
                                <img src={spot.previewImage} alt="" title={spot.name} />
                                </Link>
                                <p>{spot.name}</p>
                                <div className="manage-spot-spot-details">
                                    <p id="manage-spot-city-state">{spot.city}, {spot.state}</p>
                                    {(() => { //use IIFE to have if statement used in JSX!!
                                        if(spot.avgRating === null) {
                                            return <p id="manage-spot-rating"><i className="fa-solid fa-star"></i> new</p> 
                                        } else {
                                            return <p id="manage-spot-rating"><i className="fa-solid fa-star"></i> {spot.avgRating}</p> 
                                        }
                                    })()}
                                </div>
                                <p id='manage-spot-spot-price'>${spot.price} night</p>
                                <div id='manage-spot-update-delete'>
                                <Link to={`/spots/${spot.id}/edit`}>
                                    <button id='update-spot-button'>Update</button>
                                </Link>
                                <button id='delete-spot-button'>
                                    <OpenModalMenuItem
                                        modalComponent={<DeleteSpotModal spot={spot}/>} 
                                        //pass the spot as the porp which is fetched from the ManageSpot funtion.
                                        itemText='Delete'
                                    />
                                </button>
                                </div>
                            </li>
                            
                        ))}
                    </div>
                </div>
                </>
            );
        // }

};

export default ManageSpot;