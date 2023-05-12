import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { deletSpotThunk } from "../../store/spots";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from '../../context/Modal';


const DeleteSpotModal = () => {
    const [errors, setErrors] = useState();
    const {spotId} = useParams();
    const spot = useSelector((state) => state.spots[spotId])
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
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
        <> <h1>Delete su</h1>
        </>
    )
    
}

export default DeleteSpotModal;