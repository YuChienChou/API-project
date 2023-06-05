import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { deletSpotThunk } from "../../store/spots";
import { useModal } from '../../context/Modal'; //for using closeModal function
import './DeleteSpotModal.css'



const DeleteSpotModal = ({spot}) => {
    const [errors, setErrors] = useState();

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
        <div className='confirm-delete-spot-div'>
            <button
            onClick={handleSubmit}
            id='confirm-delete-spot-button'
            >Yes (Delete Spot)</button>
            <button
            onClick={closeModal}
            >No (Keep Spot)</button>
        </div>
        </>
    )
    
}

export default DeleteSpotModal;