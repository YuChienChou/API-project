import { useEffect, useState } from 'react';
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
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const errors = {};
        if(!country) errors.country = 'Country is required';
        if(!address) errors.address = 'Address is required';
        if(!city) errors.city = 'City is required';
        if(!state) errors.state = 'State is required';
        if(description.length < 30) errors.description = 'Description needs a minimum of 30 characters'
        if(!name) errors.name = 'Name is required';
        if(!price) errors.price = 'Price is required';
        if(!previewImage) errors.previewImage = 'PreviewImage is required';
        
        setValidationErrors(errors)

    }, [country, address, city, state, description, name, price, previewImage]);

    const onSubmit = async (e) => {
        e.preventDefault();

        spot = { ...spot, address, city, state, country, lat, lng, name, description, price}
        
        if(formType === "Update Spot") {
            const editedSpot = await dispatch(updateSpotThunk(spot));
            spot = editedSpot;
        } else if (formType === "Create Spot") {
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
            <h3>Create a New Spot</h3>
            <div id='spot-location'>
                <h4>Where's your place located?</h4>
                <p >Guests will only get your exact address once they booked a reservation.</p>
                <label>
                    <span className='label-error'>
                        Country
                        <p className='error'>{validationErrors.country}</p>
                    </span>
                    <input 
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)} />
                </label>
                <label>
                    <span className='label-error'>
                        Street address
                        <p className='error'>{validationErrors.address}</p>
                    </span>
                    
                    <input 
                        type="text"
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <div id='city-state'>
                    <label>
                        <span className='label-error'>
                           City
                            <p className='error'>{validationErrors.city}</p> 
                        </span>
                        
                        <input 
                            type="text"
                            placeholder='City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <label>
                        <span className='label-error'>
                            State
                            <p className='error'>{validationErrors.state}</p>
                        </span>
                        
                        <input 
                            type="text"
                            placeholder='State'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                </div>
                <div id='lat-lng'>
                    <label>
                        Latitude
                        <input 
                            type='number'
                            step='any'
                            placeholder='Latitude'
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                        />
                    </label>
                    <label>
                        Longitude
                        <input 
                            type='number'
                            step='any'
                            placeholder='Longitude'
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div id='spot-description'>
                <h4>Describe your place to guests</h4>
                <label>
                Mention the best features of your space, any special amentities like fast wif or parking, and what you love about the neighborhood.
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                     
                </label>
                <p className='error'>{validationErrors.description}</p>
            </div>
            <div id='spot-name'>
                <h4>Create a title for your spot</h4>
                <label>
                Catch guests' attention with a spot title that highlights what makes your place special.
                    <input 
                        type="text"
                        placeholder='Name of your spot'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className='error'>{validationErrors.name}</p>
                </label>
            </div>
            <div id='spot-price'>
            <h4>Set a base price for your spot</h4>
                <label>
                Competitive pricing can help your listing stand out and rank higher in search results.
                    <div id='spot-price-input'><p>$</p>
                        <input 
                        type="number"
                        step='any'
                        placeholder='Price per night (USD)'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    </div>
                    <p className='error'>{validationErrors.price}</p>
                </label>
            </div>
            <div id='spot-photo-url'>
                <h4>Liven up your spot with photos</h4>
                <label>
                Submit a link to at least one photo to publish your spot.
                    <input 
                    type="url" 
                    placeholder='Preview Image URL'
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    />
                    <p className='error'>{validationErrors.previewImage}</p>
                    <input type='url' placeholder='Image URL' />
                    <input type='url' placeholder='Image URL' />
                    <input type='url' placeholder='Image URL' />
                    <input type='url' placeholder='Image URL' />
                </label>
            </div>

            <button 
            type='submit'
            disabled={Object.values(validationErrors).length > 0}
            id='create-spot-button'
            >Create Spot</button>
            
        </form>
        </>
    )



};


export default SpotForm;