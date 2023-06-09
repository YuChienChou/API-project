import { useSelector, useDispatch } from "react-redux";
import { loadBookingThunk } from "../../store/booking";
import { useEffect } from "react";
import { fetchDetailedSpotThunk } from "../../store/spots";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateBookingModal from '../Bookings/CreateBookingModal';


export default function BookingIndex () {
    const spotStore = useSelector((state) => state.spots.singleSpot);
    console.log("spotStore in BookingIndex: ", spotStore);
    const spot = Object.values(spotStore);
    console.log("spot in BookingIndex: ", spot)

    const user = useSelector((state) => state.session.user);

    const bookingsStore = useSelector((state) => state.bookings.allBookings);
    console.log("bookings in BookingIndex: ", bookingsStore);
    const bookingArr = Object.values(bookingsStore);
    console.log("bookingArr in BookingIndex: ", bookingArr);
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(fetchDetailedSpotThunk(spot[0].id));
        dispatch(loadBookingThunk(spot[0].id));
    }, [dispatch]);
  
    
    // if(!bookingArr.length) return null;
    if(bookingArr.length === 0) {
        return (
            <>
            <div>This spot is available at any time!</div>
            <div>
                {spot[0].ownerId !== user.id ? 
                    <button>
                        <OpenModalMenuItem
                            modalComponent={<CreateBookingModal spot={spot} />}
                            itemText='Make your reservation' 
                            
                    /></button> : ""
                }
            </div>
            </>
        )
    }

    

    return (
        <>
        <h3>{spot[0].name} Reserved Schedule</h3>
        {bookingArr.map((booking) => (
            <li key={booking.id}>
                {(() => {
                    
                    const month = {
                        "01": "Jan",
                        "02": "Feb",
                        "03": "Mar",
                        "04": "Apr",
                        "05": "May",
                        "06": "Jun",
                        "07": "Jul",
                        "08": "Aug",
                        "09": "Sep",
                        "10": "Oct",
                        "11": "Nov",
                        "12": "Dec"
                    }
                   
                    const startDateString = booking.startDate.split("-")[2].split("T");
                    console.log("This is startDateString", startDateString);
                    const endDateString = booking.endDate.split("-")[2].split("T");
                    console.log("This is endDateString: ", endDateString)
                
                    return <p>This spot is reserved by {user.firstName} between {month[booking.startDate.split("-")[1]]} {startDateString[0]} {booking.startDate.split("-")[0]} / {endDateString[0]} {month[booking.endDate.split("-")[1]]} {booking.endDate.split("-")[0]}
                        </p>

                })()}
            </li>
        ))}

        <div>
            {spot[0].ownerId !== user.id ? 
            <button>
                <OpenModalMenuItem
                    modalComponent={<CreateBookingModal spot={spot} />}
                    itemText='Make your reservation' 
                    
            /></button> : ""
        }
        </div>
        </>
    )
}