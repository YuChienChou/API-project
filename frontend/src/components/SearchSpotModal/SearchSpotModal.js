import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadSearchSpotsAction, searchSpotThunk} from "../../store/spots";
import SearchSpots from "../Spots/SearchSpots";
import { useModal } from "../../context/Modal";

export default function SearchSpotModal() {
    const [minLat, setMinLat] = useState("");
    const [maxLat, setMaxLat] = useState("");
    const [minLng, setMinLng] = useState("");
    const [maxLng, setMaxLng] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);


        // const query = `?minLat=${minLat}&maxLat=${maxLat}&minLng=${minLng}&maxLng=${maxLng}&minPrice=${minPrice}&maxPrice=${maxPrice}&name=${(`%${name}%`)}`
        const queryArr = [];
    
        if (minLat) queryArr.push(`minLat=${minLat}`);
        if (maxLat) queryArr.push(`maxLat=${maxLat}`);
        if (minLng) queryArr.push(`minLng=${minLng}`);
        if (maxLng) queryArr.push(`maxLng=${maxLng}`);
        if (minPrice) queryArr.push(`minPrice=${minPrice}`);
        if (maxPrice) queryArr.push(`maxPrice=${maxPrice}`);
        if (name) queryArr.push(`name=${(`%${name}%`)}`);
        if (startDate) queryArr.push(`startDate=${startDate}`);
        if (endDate) queryArr.push(`endDate=${endDate}`);
    
        const query = queryArr.join('&');

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

        setMinLat("");
        setMaxLat("");
        setMinLng("");
        setMaxLng("");
        setMinPrice("");
        setMaxPrice("");
        setName("");
        setStartDate("");
        setEndDate("");

        dispatch(searchSpotThunk(query));

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
        <label>
            <span>
                Check-In Date
            </span>
            <input 
                type="date"
                placeholder="Please enter prefer check-in date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
        </label>
        <label>
            <span>
                Check Out Date
            </span>
            <input 
                type="date"
                placeholder="Please enter prefer check-out date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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