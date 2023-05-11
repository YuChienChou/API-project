import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createSpotThunk, updateSpotThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './SpotForm.css';
// import { createSpotImagesThunk } from '../../store/spotImages';

const SpotForm = ({spot, formType}) => { 
    //when set up controlled inputs, definitely need to assign the initail value
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    //to create a new image from the input value, need to set it to be 
    //a controlled input, and set the inital value to be an empty string.
    const [previewImage, setPreviewImage] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    // const [imageFormat, setImageFormat] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    //to get the current user so can pass in to the thunkaction creators.
    const owner = useSelector(state => state.session.user); 

    //this is the data validation to check the input values
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

    //create spot thunk needs spot info, img info and owner info
    //in the createSpotThunk, create a spot first
    //after create a spot, create img with the spot id
    //loop through img array and create img for each
    //create final image array that have images from data base with image ids
    //add final img array and owner data to the spot
    const onSubmit = async (e) => {
        e.preventDefault();
    
        //check the keys that need to be inside a single spot 
        spot = { ...spot, address, city, state, country, lat, lng, name, description, price, previewImage}

        //here are the images from the input that will be passed
        //into the thunk. So create an empty array to take in the inputs
        //this imgArr will be passed into createSpotThunk as an arg.
        const imgArr = [];

        //since in the useState(), the initial values of images are empty string, need to convert it to an obj since it takes 
        //spotId, url, and preveiw value to create a new image.
        //For the spotId, it will be created in the for loop in the 
        //createSpotThunk
        
        if(previewImage) {
            const previewImageObj = {
                url: previewImage,
                preview: true
            }
            imgArr.push(previewImageObj);
        }
        if(image1) {
            const image1Obj = {
                url: image1,
                preview: true
            }
            imgArr.push(image1Obj);
        }
        if(image2) {
            const image2Obj = {
                url: image2,
                preview: true
            }
            imgArr.push(image2Obj);
        }
        if(image3) {
            const image3Obj = {
                url: image3,
                preview: true
            }
            imgArr.push(image3Obj);
        }
        if(image4) {
            const image4Obj = {
                url: image4,
                preview: true
            }
            imgArr.push(image4Obj);
        }
    
        if(formType === "Update Spot") {
            const editedSpot = await dispatch(updateSpotThunk(spot));
            spot = editedSpot;
        } else if (formType === "Create Spot") {
            const newSpot = await dispatch(createSpotThunk(spot, imgArr, owner));
            spot = newSpot;
        }

        if(spot.errors) {
            setErrors(spot.errors);
        } else {
            history.push(`/spots/${spot.id}`);
        };
    };

    if(formType === 'Create Spot') {
        return (
            <>
            <Link to='/spots/new'>
           
            <form 
            onSubmit={onSubmit}
            id='spot-form'
            >
                <div>
                {(() => {
                    if(formType === 'Create Spot') {
                        return <h3>Create a New Spot</h3>
                    } else {
                        return <h3>Update Your Spot</h3>
                    }
                })()}
                </div>
                
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
                        <input 
                        type='url' 
                        placeholder='Image URL' 
                        value={image1}
                        onChange={(e) => setImage1(e.target.value)}
                        />
                        <input 
                        type='url' 
                        placeholder='Image URL' 
                        value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                        />
                        <input 
                        type='url' 
                        placeholder='Image URL' 
                        value={image3}
                        onChange={(e) => setImage3(e.target.value)}
                        />
                        <input 
                        type='url' 
                        placeholder='Image URL' 
                        value={image4}
                        onChange={(e) => setImage4(e.target.value)}
                        />
                        {/* <input type='url' placeholder='Image URL' />
                        <input type='url' placeholder='Image URL' />
                        <input type='url' placeholder='Image URL' /> */}
                    </label>
                </div>
    
                <button 
                type='submit'
                disabled={Object.values(validationErrors).length > 0}
                id='create-spot-button'
                >Create Spot</button>
                
            </form>
            </Link>
            </>
        )
    } else {
        return (
            <>
            <Link to='/spots/edit'>
            <form 
            onSubmit={onSubmit}
            id='spot-form'
            >
                <div>
                {(() => {
                    if(formType === 'Create Spot') {
                        return <h3>Create a New Spot</h3>
                    } else {
                        return <h3>Update Your Spot</h3>
                    }
                })()}
                </div>
                
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
                        <input 
                        type='url' 
                        placeholder='Image URL' 
                        value={image1}
                        onChange={(e) => setImage1(e.target.value)}
                        />
                        <input 
                        type='url' 
                        placeholder='Image URL' 
                        value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                        />
                        <input 
                        type='url' 
                        placeholder='Image URL' 
                        value={image3}
                        onChange={(e) => setImage3(e.target.value)}
                        />
                        <input 
                        type='url' 
                        placeholder='Image URL' 
                        value={image4}
                        onChange={(e) => setImage4(e.target.value)}
                        />
                        {/* <input type='url' placeholder='Image URL' />
                        <input type='url' placeholder='Image URL' />
                        <input type='url' placeholder='Image URL' /> */}
                    </label>
                </div>
    
                <button 
                type='submit'
                disabled={Object.values(validationErrors).length > 0}
                id='create-spot-button'
                >Create Spot</button>
                
            </form>
            </Link>
            </>
        )

    }

};


export default SpotForm;