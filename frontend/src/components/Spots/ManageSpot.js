import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';


const ManageSpot = () => {
    const user = useSelector((state) => state.session.user);
    console.log("user in managespot: ", user);
    const spotsStore = useSelector((state) => state.spots);
    console.log("spotsStore in managespot: ", spotsStore);
    const spots = Object.values(spotsStore);
    console.log("spots in managespot: ", spots);
    const userSpots = spots.filter((spot) => spot.ownerId === user.id);
    console.log("userSpots in manageSpot: ", userSpots);
    // const toDeleteSpot = userSpots.find

    if(spots.length < 1) return null;

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
                <p>${spot.price} night</p>
                <Link to={`/spots/${spot.id}/edit`}>
                    <button>Update</button>
                </Link>
                <OpenModalMenuItem 
                modalComponent={<DeleteSpotModal />}
                itemText='Delete'
                />
            </li>
        ))}
        </>
    );


};

export default ManageSpot;