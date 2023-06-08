import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { getCurrentUserSpotsThunk } from "../../store/spots";
import './ManageSpot.css';


const ManageSpot = () => {
 
    const dispatch = useDispatch();
    const spotsStore = useSelector((state) => state.spots.allState);
    const spots = Object.values(spotsStore);


    useEffect(() => {
        dispatch(getCurrentUserSpotsThunk());
    }, [dispatch]);

    if(spots === undefined) return null;

    if(spots.length < 1) {
        return (
            <>
             <div id='manage-spot-container'>
                    <h2>Manage Spots</h2>
                    <Link to='/spots/new'>
                        <button id='manage-spot-create-spot-button'>Create a New Spot</button>
                    </Link>
             </div>
            </>
        )
    }
    
             return (
                <>
                <div id='manage-spot-container'>
                    <h2>Manage Spots</h2>
                    <Link to='/spots/new'>
                        <button id='manage-spot-create-spot-button'>Create a New Spot</button>
                    </Link>
                    <div id='manage-spot-spot-container'>
                        {spots.map((spot) => (
                            <li key={spot.id} className='manage-spot-spot-li'>
                                <Link key={spot.id} to={`/spots/${spot.id}`}> 
                                <img src={spot.previewImage} alt="" title={spot.name} />
                                </Link>
                                <div id='single-spot-list'>
                                    <p>{spot.name}</p>
                                    <div className="manage-spot-spot-details">
                                        <p id="manage-spot-city-state">{spot.city}, {spot.state}</p>
                                        {(() => { //use IIFE to have if statement used in JSX!!
                                            if(spot.avgRating === null) {
                                                return <p id="manage-spot-rating"><i className="fa-solid fa-star"></i> new</p> 
                                            } else {
                                                return <p id="manage-spot-rating"><i className="fa-solid fa-star"></i> {spot.avgRating && spot.avgRating.toFixed(1)}</p> 
                                            }
                                        })()}
                                    </div>
                                    <p id='manage-spot-spot-price'>${spot.price} /night</p>
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
                                </div>
                            </li>
                            
                        ))}
                    </div>
                </div>
                </>
            );

};

export default ManageSpot;