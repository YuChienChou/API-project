import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpotThunk, updateSpotThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './SpotForm.css';

const SpotForm = ({spot, formType}) => {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();

        spot = { ...spot, address, city, state, country, lat, lng, name, description, price}
        
        if(formType === "Update Your Spot") {
            const editedSpot = await dispatch(updateSpotThunk(spot));
            spot = editedSpot;
        } else if (formType === "Create a New Spot") {
            const newSpot = await dispatch(createSpotThunk(spot));
            spot = newSpot;
        }

        if(spot.errors) {
            setErrors(spot.errors);
        } else {
            history.push(`/spots/${spot.id}`);
        };
    };

    return (
        <>
        <form 
        onSubmit={onSubmit}
        id='spot-form'
        >
            <h1>{formType}</h1>
            <h2>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <label>
                Country
                <input 
                    type='text'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)} />
            </label>
            <label>
                Street address
                <input 
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>
            <label>
                city
                <input 
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </label>
            <label>
                State
                <input 
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </label>
            <label>
                Latitude
                <input 
                    type='number'
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                />
            </label>
            <label>
                Longitude
                <input 
                    type='number'
                    value={lng}
                    onChange={(e) => setLat(e.target.value)}
                />
            </label>
            <h3>Describe your place to guests</h3>
            <label>
            Mention the best features of your space, any special amentities like fast wif or parking, and what you love about the neighborhood.
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <h3>Create a title for your spot</h3>
            <label>
            Catch guests' attention with a spot title that highlights what makes your place special.
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <h3>Set a base price for your spot</h3>
            <label>
            Competitive pricing can help your listing stand out and rank higher in search results.
                <input 
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </label>
            <h3>Liven up your spot with photos</h3>
            <label>
            Submit a link to at least one photo to publish your spot.
                <input type="url" placeholder='Preview Image URL'/>
                <input type='url' placeholder='Image URL' />
                <input type='url' placeholder='Image URL' />
                <input type='url' placeholder='Image URL' />
                <input type='url' placeholder='Image URL' />
            </label>

            <button type='submit'>Create Spot</button>
            
        </form>
        </>
    )



};


export default SpotForm;