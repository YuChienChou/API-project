import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createSpotThunk } from '../../store/spots';
import SpotForm from './SpotForm';

const EditSpotForm = () => {
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots[spotId]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(createSpotThunk(spotId));
    }, [dispatch, spotId]);

    if(!spot) return (<></>);

    return (
        Object.keys(spot).length > 1 && (
            <>
                <SpotForm 
                    spot={spot}
                    formType="Update Spot"
                />
            </>
        )
    );

};


export default EditSpotForm;