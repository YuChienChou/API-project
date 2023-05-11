import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { deletSpotThunk } from '../../store/spots';



const DeleteSpot = () => {
    const { spotId } = useParams();
    console.log("spotId in deleteSpot: ", spotId);
    
    const spot = useSelector((state) => state.spots[spotId]);
    console.log("spot in deleteSpot function: ", spot);

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(deletSpotThunk(spot.id));
    }, [dispatch, spotId]);

    // if(!spot) return null;

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deletSpotThunk(spot.id));
    };

    return (
        <>
        <button onClick={handleDelete}>Delete</button>
        </>
    );

};


export default DeleteSpot;