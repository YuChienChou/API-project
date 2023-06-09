import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchSpotThunk } from "../../store/spots";
import SearchSpots from "../Spots/SearchSpots";
import { useModal } from "../../context/Modal";

export default function SearchSpotModal() {
    const [minLat, setMinLat] = useState(0);
    const [maxLat, setMaxLat] = useState(0);
    const [minLng, setMinLng] = useState(0);
    const [maxLng, setMaxLng] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    useEffect(() => {
    
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);

        

        // const query = `?minLat=${minLat}&maxLat=${maxLat}&minLng=${minLng}&maxLng=${maxLng}&minPrice=${minPrice}&maxPrice=${maxPrice}&name=${(`%${name}%`)}`
        const queryParams = [];
    
        if (minLat) queryParams.push(`minLat=${minLat}`);
        if (maxLat) queryParams.push(`maxLat=${maxLat}`);
        if (minLng) queryParams.push(`minLng=${minLng}`);
        if (maxLng) queryParams.push(`maxLng=${maxLng}`);
        if (minPrice) queryParams.push(`minPrice=${minPrice}`);
        if (maxPrice) queryParams.push(`maxPrice=${maxPrice}`);
        if (name) queryParams.push(`name=${(`%${name}%`)}`);
    
        const query = queryParams.join('&');

        console.log("qurey in SearchSpotModal: ", query);
        

        const spotResults = await dispatch(searchSpotThunk(query));

        // console.log("spotResults in SearchSpotModal: ", spotResults);

        if(spotResults.errors) {
            setErrors(spotResults.errors);
            console.log("errors in SearchSpotModal: ", errors)
        } else {
            console.log("query in searchSpotModal", query);
            history.push(`/spots/query`);
            // <SearchSpots query={query} />
            closeModal();
        }

        setMinLat(0);
        setMaxLat(0);
        setMinLng(0);
        setMaxLng(0);
        setMinPrice(0);
        setMaxPrice(0);
        setName("");
    }


    return (
    <>
    <form 
        id='search-spot-form'
        onSubmit={handleSubmit}
        >
        <h3>Search Spots</h3>
        <h5>Latitude Range</h5>
        {/* {isSubmit && <p>{errors.minPrice.message}</p> && <p>{errors.maxPrice.message}</p>}  */}
    
        <label>
            <span>
                Minimum Latitude
            </span>
            <input
                type="number"
                placeholder="Please enter the minimum latitude"
                step='any'
                value={minLat}
                onChange={(e) => setMinLat(e.target.value)}
            />
        </label> 
        <label>
            <span>
                Maximum Latitude
            </span>
            <input
                type="number"
                placeholder="Please enter the maximum latitude"
                step='any'
                value={maxLat}
                onChange={(e) => setMaxLat(e.target.value)}
            />
        </label> 
        <h5>Longitude Range</h5>
        <label>
            <span>
                Minimum Longitude
            </span>
            <input 
                type="number"
                placeholder="Please enter the minimum longitude"
                step='any'
                value={minLng}
                onChange={(e) => setMinLng(e.target.value)}
            />
        </label>
        <label>
            <span>
                Maximum Longitude
            </span>
            <input 
                type="number"
                placeholder="Please enter the maximum longitude"
                step='any'
                value={maxLng}
                onChange={(e) => setMaxLng(e.target.value)}
            />
        </label>
        <h5>Price Range</h5>
        <label>
            <span>
                Minimum price
            </span>
            <input 
                type="number"
                placeholder="Please enter the minimum price"
                step='any'
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
        </label>
        <label>
            <span>
                Maximum Price
            </span>
            <input 
                type="number"
                placeholder="Please enter the maximum longitude"
                step='any'
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
        </label>
        <label>
            <span>
                Spot Name
            </span>
            <input 
                type="text"
                placeholder="Please enter the spot name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </label>
        <button
            type='submit'
        >
            Search
        </button>
    </form>
    </>
    );
}