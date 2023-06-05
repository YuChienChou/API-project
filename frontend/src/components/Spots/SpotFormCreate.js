import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSpotThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './SpotForm.css';


const SpotFormCreate = ({spot}) => { 
    //when set up controlled inputs, definitely need to assign the initail value
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState(10);
    const [lng, setLng] = useState(10);
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
    // const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    // const [imageFormat, setImageFormat] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    //to get the current user so can pass in to the thunkaction creators.
    const owner = useSelector(state => state.session.user); 
    // console.log("owner in SpotFromCreate: ", owner);

    //this is the data validation to check the input values
    useEffect(() => {
        const errors = {};
        // country, address, city, state, description, name, and price will be also validate from the backend.
        if(!country) errors.country = 'Country is required';
        if(!address) errors.address = 'Address is required';
        if(!city) errors.city = 'City is required';
        if(!state) errors.state = 'State is required';
        if(description.length < 30) errors.description = 'Description needs a minimum of 30 characters'
        if(!name) errors.name = 'Name is required';
        if(!price) errors.price = 'Price is required';
        if(!previewImage) errors.previewImage = 'PreviewImage is required';
        if(previewImage && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.png') && !previewImage.endsWith('.jpeg')) errors.previewImageFormat = "Image URL needs to end in png or jpg (or jpeg)";
        if(image1 && (!image1.endsWith('.jpg') && !image1.endsWith('.png') && !image1.endsWith('.jpeg'))) errors.image1Format = "Image URL needs to end in png or jpg (or jpeg)";
        if((image2 && !image2.endsWith('.jpg') && !image2.endsWith('.png') && !image2.endsWith('.jpeg'))) errors.image2Format = "Image URL needs to end in png or jpg (or jpeg)";
        if((image3 && !image3.endsWith('.jpg') && !image3.endsWith('.png') && !image3.endsWith('.jpeg'))) errors.image3Format = "Image URL needs to end in png or jpg (or jpeg)";
        if((image4 && !image4.endsWith('.jpg') && !image4.endsWith('.png') && !image4.endsWith('.jpeg'))) errors.image4Format = "Image URL needs to end in png or jpg (or jpeg)";
        console.log("error useEffect running ", errors)
        setValidationErrors(errors)

    }, [country, address, city, state, name, price, previewImage, image1, image2, image3, image4]);

    // console.log("validationErrors: ", validationErrors);


    //create spot thunk needs spot info, img info and owner info
    //in the createSpotThunk, create a spot first
    //after create a spot, create img with the spot id
    //loop through img array and create img for each
    //create final image array that have images from data base with image ids
    //add final img array and owner data to the spot
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        if(Object.values(validationErrors).length > 0) {

            setPreviewImage("");

            return (alert("Please provide valid information"));
        } 
        //check the keys that need to be inside a single spot 
        //this is the spot value that will be passed into thunks
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
                preview: false
            }
            imgArr.push(image1Obj);
        } 
        if(image2) {
            const image2Obj = {
                url: image2,
                preview: false
            }
            imgArr.push(image2Obj);
        }
        if(image3) {
            const image3Obj = {
                url: image3,
                preview: false
            }
            imgArr.push(image3Obj);
        }
        if(image4) {
            const image4Obj = {
                url: image4,
                preview: false
            }
            imgArr.push(image4Obj);
        }
        
      

        const newSpot = await dispatch(createSpotThunk(spot, imgArr, owner));
        spot = newSpot;

        

        // console.log("newspot: ", newSpot)
        // if(spot.errors) { //this are the errors send from the backend route spot.js
        //     // console.log("spot errors from backend: ", spot.errors)
        //     setValidationErrors(spot.errors);
        //     return;
        // } else {
            
        // }; 

        setAddress("");
        setCity("");
        setState("");
        setCountry("");
        setName("");
        setDescription("");
        setPrice("");
        setPreviewImage("");
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
        setValidationErrors({})
        setIsSubmit(false);
        history.push(`/spots/${spot.id}`);
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
                     {isSubmit && <p className='error'>{validationErrors.country}</p>}
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
                        {isSubmit && <p className='error'>{validationErrors.address}</p>}
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
                            {isSubmit && <p className='error'>{validationErrors.city}</p>}
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
                            {isSubmit && <p className='error'>{validationErrors.state}</p>}
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
                        placeholder='Please write at least 30 characters'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                     
                </label>
                {isSubmit && <p className='error'>{validationErrors.description}</p>}
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
                    {isSubmit && <p className='error'>{validationErrors.name}</p>}
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
                    {isSubmit && <p className='error'>{validationErrors.price}</p>}
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
                    {isSubmit && validationErrors.previewImage && <p className='error'>{validationErrors.previewImage}</p>}
                    {isSubmit && validationErrors.previewImageFormat && <p className='error'>{validationErrors.previewImageFormat}</p>}
                    <input 
                    type='url' 
                    placeholder='Image URL' 
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                    />                    
                    {isSubmit && validationErrors.image1Format && <p className='error'>{validationErrors.image1Format}</p>}
                    <input 
                    type='url' 
                    placeholder='Image URL' 
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                    />
                    {isSubmit && validationErrors.image2Format && <p className='error'>{validationErrors.image2Format}</p>}

                    <input 
                    type='url' 
                    placeholder='Image URL' 
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                    />
                    {isSubmit && validationErrors.image3Format && <p className='error'>{validationErrors.image3Format}</p>}

                    <input 
                    type='url' 
                    placeholder='Image URL' 
                    value={image4}
                    onChange={(e) => setImage4(e.target.value)}
                    />
                    {isSubmit && validationErrors.image4Format && <p className='error'>{validationErrors.image4Format}</p>}

                </label>
            </div>

            <button 
            type='submit'
            id='create-spot-button'
            // disabled={Object.values()}
            >Create Spot</button>
            
        </form>
    
        </>
    )

};


export default SpotFormCreate;