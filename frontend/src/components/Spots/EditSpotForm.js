import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateSpotThunk } from '../../store/spots';
import SpotFormEdit from './SpotFormEdit';

const EditSpotForm = () => {
    const { spotId } = useParams();
    // console.log('SpotId in editSpotForm: ', spotId);
    // console.log('SpotId type in editSpotForm: ', typeof spotId);
    const spot = useSelector((state) => state.spots[spotId]);
    // console.log("spot id in editSpotForm: ", spot.id);
    // console.log('spot id type in editSpotForm: ', typeof spot.id)
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(updateSpotThunk(spotId));
    // }, [dispatch, spotId]);

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