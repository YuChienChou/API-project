import SpotForm from './SpotForm';

const CreateSpotForm = () => {
    const spot = {
        address: "",
        city: "",
        state: "",
        country: "",
        lat: 0, 
        lng: 0, 
        name: "",
        description: "",
        price: 0,
    };

    return (
        <SpotForm 
            spot={spot}
            formType="Create Spot" 
        />
    );
};

export default CreateSpotForm;