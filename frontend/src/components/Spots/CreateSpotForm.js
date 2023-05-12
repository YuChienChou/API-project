import SpotFormCreate from './SpotFormCreate';

const CreateSpotForm = () => {
    const spot = {
        address: "",
        city: "",
        state: "",
        country: "",
        lat: "", 
        lng: "", 
        name: "",
        description: "",
        price: "",
    };

    return (
        <SpotFormCreate 
            spot={spot}
            formType="Create Spot" 
        />
    );
};

export default CreateSpotForm;