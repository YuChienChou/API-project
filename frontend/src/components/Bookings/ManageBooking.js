import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { getCurrentUserBookingsThunk } from '../../store/booking';
import { get } from "../../../../backend/routes/api/bookings";



export default function ManageBookings () {

    const userBookingStore = useSelector((state) => state.bookings.userBookings);
    console.log("userBookings in ManageBooking: ", userBookingStore);
    const userBookingsArr = Object.values(userBookingStore);
    console.log("useBookingsArr in ManageBooking: ", userBookingsArr);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserBookingsThunk());
    }, [dispatch]);

    if(!userBookingsArr.length) {
        return (
            <p>You don't have any reservation.</p>
        )
    }

    return (
        // <>
        // <h2>Manage Bookings</h2>
        // {userBookingsArr.map((booking) => (
        //     <li key={booking.id}>
        //         <p>{booking.Spot.name}</p>
        //         <div>
        //             <img
        //         </div>
        //         <p>{booking.startDate}</p>
        //         <p>{booking.endDate}</p>
        //         <p>{booking.createdAt}</p>
        //         <p>{booking.updatedAt}</p>
        //     </li>
        // ))}
        // </>
    )
}