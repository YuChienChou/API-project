import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateSpotThunk } from '../../store/spots';
import SpotFormEdit from './SpotFormEdit';

const EditSpotForm = () => {
    let { spotId } = useParams();
    spotId = parseInt(spotId);
    const spot = useSelector((state) => state.spots[spotId]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateSpotThunk(spotId));
    }, [dispatch, spotId]);

    if(!spot) return (<></>);

    return (
        Object.keys(spot).length > 1 && (
            <>
                <SpotFormEdit
                    spot={spot}
                    formType="Update Spot"
                />
            </>
        )
    );

};


export default EditSpotForm;