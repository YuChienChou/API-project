import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const ManageSpot = () => {
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    
    
    // console.log("user in managespot: ", user);
    const spotsStore = useSelector((state) => state.spots);
    // console.log("spotsStore in managespot: ", spotsStore);
    const spots = Object.values(spotsStore);
    // console.log("spots in managespot: ", spots);
    const userSpots = spots.filter((spot) => spot.ownerId === user.id);
    console.log("userSpots in manageSpot: ", userSpots);
    // const toDeleteSpot = userSpots.find

    // useEffect(() => {
    //     if(!user) history.push('/');
    // }, [user]);

    if(spots.length < 1 ) {
            return (
                <>
            <h2>Manage Spots</h2>
            <Link to='/spots/new'>
            <button>Create a New Spot</button>
            </Link>
            </>
            )
        } else {
             return (
                <>
                <h2>Manage Spots</h2>
                <Link to='/spots/new'>
                    <button>Create a New Spot</button>
                </Link>
                {userSpots.map((spot) => (
                    <li key={spot.id}>
                        <img src={spot.previewImage} alt="" />
                        <p>{spot.city}, {spot.state}</p>
                        <div className="spot-details">
                            <p id="city-state">{spot.city}, {spot.state}</p>
                            {(() => { //use IIFE to have if statement used in JSX!!
                                if(spot.avgRating === null) {
                                    return <p className="rating"><i className="fa-solid fa-star"></i> new</p> 
                                } else {
                                    return <p className="rating"><i className="fa-solid fa-star"></i> {spot.avgRating}</p> 
                                }
                            })()}
                        </div>
                        <p>${spot.price} night</p>
                        <Link to={`/spots/${spot.id}/edit`}>
                            <button>Update</button>
                        </Link>
                        <button>
                            <OpenModalMenuItem 
                                modalComponent={<DeleteSpotModal spot={spot}/>} 
                                //pass the spot as the porp which is fetched from the ManageSpot funtion.
                                itemText='Delete'
                            />
                        </button>
                        
                    </li>
                ))}
                </>
            );
        }

};

export default ManageSpot;