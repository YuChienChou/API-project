import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SpotFormEdit from './SpotFormEdit';

const EditSpotForm = () => {
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots[spotId]);


    if(!spot.id) return (<></>);

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