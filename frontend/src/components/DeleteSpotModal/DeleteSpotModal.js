import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { deletSpotThunk } from "../../store/spots";
import { useModal } from '../../context/Modal'; //for using closeModal function
import './DeleteSpotModal.css'



const DeleteSpotModal = ({spot}) => {
    const [errors, setErrors] = useState();
    // const {spotId} = useParams();
    // console.log("spotId in delete spot modal: ", spotId);
    // const spot = useSelector((state) => state.spots[spotId]);
    // console.log("spot in delete spot modal: ", spot);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({})
        return dispatch(deletSpotThunk(spot.id))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) { 
                setErrors(data.errors);
            }
        });
    }

    return (
        <> 
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this spot form the listings?</p>
        <div className='confirm-delete-spot-button'>
            <button
            onClick={handleSubmit}
            >Yes</button>
            <button
            onClick={closeModal}
            >No</button>
        </div>
        </>
    )
    
}

export default DeleteSpotModal;