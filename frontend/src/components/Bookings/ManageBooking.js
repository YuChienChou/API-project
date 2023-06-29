import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { getCurrentUserBookingsThunk } from '../../store/booking';
import UpdateBookingModal from '../Bookings/UpdateBookingModal';
import DeleteBookingModal from '../Bookings/DeleteBookingModal';
import './ManageBooking.css'


export default function ManageBookings () {

    const userBookingStore = useSelector((state) => state.bookings.userBookings);
    console.log("userBookings in ManageBooking: ", userBookingStore);
    const userBookingsArr = Object.values(userBookingStore);
    console.log("useBookingsArr in ManageBooking: ", userBookingsArr);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("getCurrentUserBookingsThuns runs in the ManageBooking useEffect");
        dispatch(getCurrentUserBookingsThunk());
    }, [dispatch]);

    if(!userBookingsArr.length) {
        return (
            <p>You don't have any reservation.</p>
        )
    }

    return (
        <>
        <h2 id="manage-booking-title">Manage Bookings</h2>
        <div id='manage-booking-div'>
            {userBookingsArr.map((booking) => (
                <li key={booking.id}>
                    
                    <div>
                        <img src={booking.Spot.previewImage} alt=""/>
                        <p id='booking-spot-name'>{booking.Spot.name}</p>
                    </div>
                    <div id="booking-info-div">
                    {(() => {
                        const month = booking.startDate.split("-")[1];
                        const year = booking.startDate.split("-")[0];
                        const date = booking.startDate.split("-")[2].split("T")[0];
                        return <p>Check-in Date: {month}/{date}/{year}</p>
                    })()}
                    {(() => {
                        const month = booking.endDate.split("-")[1];
                        const year = booking.endDate.split("-")[0];
                        const date = booking.endDate.split("-")[2].split("T")[0];
                        return <p>Check-out Date: {month}/{date}/{year}</p>
                    })()}
                    {(() => {
                        const month = booking.createdAt.split("-")[1];
                        const year = booking.createdAt.split("-")[0];
                        const date = booking.createdAt.split("-")[2].split("T")[0];
                        return <p>Reserved At: {month}/{date}/{year}</p>
                    })()}
                    {(() => {
                        const month = booking.updatedAt.split("-")[1];
                        const year = booking.updatedAt.split("-")[0];
                        const date = booking.updatedAt.split("-")[2].split("T")[0];
                        return <p>Updated At: {month}/{date}/{year}</p>
                    })()}
                    </div>
                    <div id='manage-booking-buttons'>
                        <button>
                            <OpenModalMenuItem
                                modalComponent={<UpdateBookingModal booking={booking}/>}
                                itemText="Update"
                            />
                        </button>
                        <button>
                            <OpenModalMenuItem
                                modalComponent={<DeleteBookingModal booking={booking}/>}
                                itemText="Delete"
                            />
                        </button>
                    </div>
                </li>
            ))}
        </div>
        </>
    )
}