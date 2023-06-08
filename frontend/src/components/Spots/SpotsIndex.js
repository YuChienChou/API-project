import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadSpotsThunk, actionClearSpot } from '../../store/spots';
import { useEffect } from 'react';
import './Spots.css';

const SpotsIndex = () => {
    const spotsStore =useSelector((state) => state.spots.allState);
    // console.log("spotsStore in spotsIndex: ", spotsStore);
    const spots = Object.values(spotsStore);
    // console.log('SPOTS IN SPOTSINDEX: ', spots);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSpotsThunk());
        
        return () => dispatch(actionClearSpot());
    }, [dispatch]);

    if(spots === undefined || spots.length < 1) return null;

    return (
        <>
        <div className='spots-container'>
            <ul className='spots-ul'>
                {spots.reverse().map((spot) => (
                    // {console.log("spot in spots.map funtion: ", spot)}
                    <li key={spot.id} className="spot-li">
                        <Link key={spot.id} to={`/spots/${spot.id}`}>                               
                            <img 
                                className="spot-image" 
                                src={spot.previewImage} 
                                alt=""
                                title={spot.name}
                                />
                        </Link>
                        
                        <div id='spot-index-spot-container'>
                            <h5>{spot.name}</h5>
                            <div className="spot-details"> 
                                <p id="spot-index-city-state">{spot.city}, {spot.state}</p>
                                {(() => { //use IIFE to have if statement used in JSX!!
                                    if(spot.avgRating === null) {
                                        
                                        return <p className="rating"><i className="fa-solid fa-star"></i> new</p> 
                                    } else {
                                        return <p className="rating"><i className="fa-solid fa-star"></i> {spot.avgRating && spot.avgRating.toFixed(1)}</p> 
                                    }
                                })()}
                           </div>
                            <p id='spot-index-price'>${spot.price} /night</p>
                        </div>
                    </li>
                    )
                )}
            </ul>
        </div>
        </>
    );
};


export default SpotsIndex;
